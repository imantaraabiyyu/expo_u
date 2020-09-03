import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findById } from '../../../actions/audiences';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { CustomHeader } from '../../../component/CustomHeader';
import { TextInput, Button } from 'react-native-paper';
import EditProfile from './EditProfile';
import { logout } from '../../../actions/auth';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const data = [{}];
class Profile extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;

    this.state = {
      name: '',
      gender: '',
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
    console.log('audience', data);

    if (prevProps.data !== data) {
      this.setState({ ...data });
      this.setState({
        username: userData.username,
        email: userData.email,
        photo: userData.photo
      });
    } else if (error && prevProps.error !== error) {
      console.log('error');
    }
  }
  onLogout = () => {
    this.props.logout();
  };
  render() {
    const { navigation } = this.props;
    const { username, email, gender, phone, photo } = this.state;

    return (
      <ScrollView style={{ backgroundColor: '#FFF' }}>
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
          <View style={{ backgroundColor: '#FFF', marginBottom: 170 }}>
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
                {username}
              </Text>
            </LinearGradient>
            <View style={styles.view}>
              <TextInput
                style={styles.text}
                label="Email"
                value={email}
                disabled
              />
              <TextInput
                style={styles.text}
                label="Phone"
                value={phone}
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
              marginLeft: 110,
              width: 200,
              height: 40,
              backgroundColor: '#9000D3',
              borderWidth: 1,
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

  data: state.audienceById.data,
  loading: state.audienceById.loading,
  error: state.audienceById.error,

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
