import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CustomHeader } from '../../../component/CustomHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { View, Image, Text, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { findById } from '../../../actions/eventorganizers';
import TextInputMask from 'react-native-text-input-mask';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import LinearGradient from 'react-native-linear-gradient';
import EditProfile from './EditProfile';
import styles from './styles';
import { BarIndicator } from 'react-native-indicators';

class Profile extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;
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
  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };
  componentDidMount() {
    const { profileId } = this.props.userData;
    if (profileId) {
      this.props.findById(profileId);
    }
  }
  componentDidUpdate(prevProps) {
    const { data, error, userData } = this.props;

    if (prevProps.data !== data) {
      this.setState({ ...data });
      this.setState({ email: userData.email, photo: userData.photo });
    } else if (error && prevProps.error !== error) {
      console.log('error');
    }
  }
  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { navigation, loading } = this.props;
    const {
      name,
      email,
      address,
      city,
      description,
      npwpNumber,
      siupNumber,
      phone,
      photo
    } = this.state;
    console.log('file', photo);

    return (
      <ScrollView>
        <CustomHeader navigation={navigation} title="Profile" />
        <View style={{ backgroundColor: '#9400D3' }}>
          <FontAwesome
            style={{
              color: '#FFF',
              fontSize: 22,
              alignSelf: 'flex-end',
              marginRight: 15
            }}
            name="edit"
            onPress={this.ShowHideComponent}
          />
        </View>

        {this.state.show ? (
          <EditProfile />
        ) : (
          <View style={{ backgroundColor: '#FFF' }}>
            <LinearGradient
              colors={['#9400D3', '#bd1ccc', '#192f6a']}
              style={styles.bgEdit}
            >
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 65,
                  marginTop: 20,
                  borderWidth: 5,
                  borderColor: '#FFF',
                  alignSelf: 'center'
                }}
                source={
                  photo != 'no_photo'
                    ? { uri: photo }
                    : require('../../../../assets/images/screen/logoEO.jpg')
                }
              />

              <Text
                style={{
                  color: '#FFF',
                  alignSelf: 'center',
                  marginTop: 10,
                  fontSize: 18
                }}
              >
                {name}
              </Text>
            </LinearGradient>
            <View style={styles.view}>
              <TextInput
                keyboardType="phone-pad"
                style={styles.text}
                label="Email"
                value={email}
                disabled
              />
              <TextInput
                keyboardType="phone-pad"
                style={styles.text}
                label="Phone"
                value={phone}
                disabled
              />
              <TextInput
                style={styles.text}
                label="Address"
                value={address}
                disabled
              />
              <TextInput
                style={styles.text}
                label="City"
                value={city}
                disabled
              />
              <TextInput
                style={styles.text}
                label="Description"
                value={description}
                multiline={true}
                numberOfLines={3}
                disabled
              />
              <TextInput
                style={styles.text}
                label="NPWP Number"
                value={npwpNumber}
                onChangeText={value => this.onChange('npwpNumber', value)}
                render={props => (
                  <TextInputMask
                    {...props}
                    mask="[00].[000].[000].[0]-[000].[000]"
                  />
                )}
                disabled
              />
              <TextInput
                style={styles.text}
                label="SIUP Number"
                value={siupNumber}
                onChangeText={value => this.onChange('siupNumber', value)}
                render={props => (
                  <TextInputMask
                    {...props}
                    mask="[000]/[0000]/[000].[0]/[0000]"
                  />
                )}
                disabled
              />
            </View>
          </View>
        )}
        <LinearGradient
          colors={['#9400D3', '#bd1ccc', '#192f6a']}
          style={{ width: 500, height: 60, borderTopLeftRadius: 40 }}
        >
          <Button
            onPress={this.onLogout}
            style={{
              marginLeft: 190,
              width: 200,
              height: 40,
              backgroundColor: '#9000D3',
              borderWidth: 2,
              borderColor: '#FFF',
              marginTop: 10
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Logout</Text>
          </Button>
        </LinearGradient>
      </ScrollView>
    );
  }
}

Profile.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.any,
  route: PropTypes.any,
  userData: PropTypes.shape({
    email: PropTypes.any,
    photo: PropTypes.any
  })
};

const mapStateToProps = state => ({
  userData: state.auth.data,
  data: state.EOById.data,
  loading: state.EOById.loading,
  error: state.EOById.error,
  dataLogout: state.auth.data,
  loadingLogout: state.auth.loading,
  errorLogout: state.auth.error
});

const mapDispatchProps = {
  findById,
  logout
};
export default connect(
  mapStateToProps,
  mapDispatchProps
)(Profile);
