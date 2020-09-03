import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { save, findById } from '../../../actions/merchants';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { Item, Label, Input } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      show: false,
      name: '',
      phone: '',
      city: '',
      address: '',
      description: ''
    };
  }
  componentDidMount() {
    const { profileId } = this.props.userData;
    if (profileId) {
      this.props.findById(profileId);
    }
  }
  componentDidUpdate(prevProps) {
    const {
      data,
      error,
      savedData,
      savedError,
      userData,
      navigation
    } = this.props;

    if (prevProps.data !== data) {
      this.setState({ ...data });
      this.setState({ profileId: userData.profileId, photo: userData.photo });
    } else if (error && prevProps.error !== error) {
      console.log(error);
    } else if (prevProps.savedData !== savedData) {
      navigation.goBack();
      console.log(savedData);
    } else if (savedError && prevProps.savedError !== savedError) {
      console.log(savedError);
    }
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    this.props.save(this.state);
    console.log(save);
  };

  onSelectImage = async () => {
    ImagePicker.showImagePicker(
      { noData: true, mediaType: 'photo' },
      response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({
            photo: response.uri
          });
        }
      }
    );
  };
  render() {
    const { navigation, loading, savedError } = this.props;
    const { name, address, city, description, phone, photo } = this.state;

    const errorData = savedError?.data || {};

    return (
      <View style={{ backgroundColor: '#FFF' }}>
        <LinearGradient
          colors={['#9400D3', '#bd1ccc', '#192f6a']}
          style={styles.bgEdit}
        >
          <View style={{ flexDirection: 'row', marginLeft: 110 }}>
            {(!this.state.avatarSource && (
              <Image source={{ uri: photo }} style={styles.logoEdit} />
            )) || (
              <Image
                source={{ uri: this.state.avatarSource }}
                style={styles.logoEdit}
                value={photo}
                onChangeText={response => this.onChange('photo', response)}
              />
            )}
            <Button onPress={this.onSelectImage} style={styles.buttonLogo}>
              <FontAwesome5Icon
                name="camera"
                style={{ fontSize: 28, color: '#FFF' }}
              />
            </Button>
          </View>
        </LinearGradient>
        <View style={styles.viewEdit}>
          <Item
            floatingLabel
            error={errorData?.name != null}
            style={styles.item}
          >
            <Label style={styles.label}>Name</Label>
            <Input
              style={styles.input}
              value={name}
              onChangeText={value => this.onChange('name', value)}
            />
          </Item>

          <Item
            floatingLabel
            error={errorData?.phone != null}
            style={styles.item}
          >
            <Label style={styles.label}>Phone</Label>
            <Input
              style={styles.input}
              value={phone}
              onChangeText={value => this.onChange('phone', value)}
            />
          </Item>
          {errorData?.phone && (
            <Text style={styles.error}>{errorData?.phone[0]}</Text>
          )}
          <Item
            floatingLabel
            error={errorData?.address != null}
            style={styles.item}
          >
            <Label style={styles.label}>Address</Label>
            <Input
              style={styles.input}
              value={address}
              onChangeText={value => this.onChange('address', value)}
            />
          </Item>
          {errorData?.address && (
            <Text style={styles.error}>{errorData?.address[0]}</Text>
          )}
          <Item
            floatingLabel
            error={errorData?.city != null}
            style={styles.item}
          >
            <Label style={styles.label}>City</Label>
            <Input
              style={styles.input}
              value={city}
              onChangeText={value => this.onChange('city', value)}
            />
          </Item>
          {errorData?.city && (
            <Text style={styles.error}>{errorData?.city[0]}</Text>
          )}
          <Item
            floatingLabel
            error={errorData?.description != null}
            style={styles.item}
          >
            <Label style={styles.label}>Description</Label>
            <Input
              style={styles.input}
              value={description}
              multiline={true}
              numberOfLines={2}
              onChangeText={value => this.onChange('description', value)}
            />
          </Item>
          {errorData?.description && (
            <Text style={styles.error}>{errorData?.description[0]}</Text>
          )}

          <Button
            style={{
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 10,
              backgroundColor: '#30d98d',
              color: '#FFF'
            }}
            mode="contained"
            onPress={this.onSubmit}
          >
            Save
          </Button>
        </View>
      </View>
    );
  }
}

EditProfile.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.any,
  save: PropTypes.func,
  savedData: PropTypes.any,
  savedError: PropTypes.any,
  userData: PropTypes.shape({
    photo: PropTypes.any,
    profileId: PropTypes.any
  })
};

const mapStateToProps = state => ({
  savedData: state.savedMerchant.data,
  savedError: state.savedMerchant.error,
  loadingSaved: state.savedMerchant.loading,

  userData: state.auth.data,

  data: state.merchantById.data,
  loading: state.merchantById.loading,
  error: state.merchantById.error
});

const mapDispatchProps = {
  findById,
  save
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(EditProfile);
