import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { Item, Label, Input } from 'native-base';
import { save, findById } from '../../../actions/eventorganizers';
import { connect } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      address: '',
      city: '',
      description: '',
      npwpNumber: '',
      siupNumber: '',
      phone: '',
      text: '',
      photo: '',
      show: false
    };
  }
  componentDidMount() {
    const { profileId } = this.props.userData;
    if (profileId) {
      this.props.findById(profileId);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { data, error, savedData, savedError, userData } = this.props;

    if (prevProps.data !== data) {
      this.setState({ ...data });
      this.setState({ profileId: userData.profileId, photo: userData.photo });
    } else if (error && prevProps.error !== error) {
      console.log(error);
    } else if (prevProps.savedData !== savedData) {
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
    const {
      name,
      address,
      city,
      description,
      npwpNumber,
      siupNumber,
      phone,
      photo
    } = this.state;

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
          <TextInput
            style={{ backgroundColor: '#FFF' }}
            label="NPWP Number"
            value={npwpNumber}
            onChangeText={value => this.onChange('npwpNumber', value)}
            render={props => (
              <TextInputMask
                {...props}
                mask="[00].[000].[000].[0]-[000].[000]"
              />
            )}
          />
          <TextInput
            style={{ backgroundColor: '#FFF' }}
            label="SIUP Number"
            value={siupNumber}
            onChangeText={value => this.onChange('siupNumber', value)}
            render={props => (
              <TextInputMask {...props} mask="[000]/[0000]/[000].[0]/[0000]" />
            )}
          />

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
    profileId: PropTypes.any
  })
};

const mapStateToProps = state => ({
  savedData: state.savedEO.data,
  savedError: state.savedEO.error,
  loadingSaved: state.savedEO.loading,

  userData: state.auth.data,

  data: state.EOById.data,
  loading: state.EOById.loading,
  error: state.EOById.error
});

const mapDispatchProps = {
  save,
  findById
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(EditProfile);
