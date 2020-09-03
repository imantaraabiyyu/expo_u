import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-community/google-signin';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BarIndicator } from 'react-native-indicators';
import { HelperText, TextInput } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { WebClientID } from '../../utils/constants';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: ''
      }
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId: WebClientID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      accountName: ''
    });
  }

  login = (type, token) => {
    const { email, password } = this.state.data;
    const userdata =
      type === 0 ? { email, password, type } : { token: token, type };
    console.log('apa ');
    this.props.login(userdata);
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      this.login(2, info.idToken);
      console.log({ infoUser: info });
    } catch (error) {
      console.log(error);
    }
  };

  facebookLogin = async () => {
    try {
      await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        result => {
          if (result.isCancelled) {
            console.log('Login cancelled');
          } else {
            console.log('facebook');

            AccessToken.getCurrentAccessToken().then(data => {
              // const token = data.accessToken;
              this.login(1, data.accessToken);
            });
          }
        },
        function(error) {
          console.log('Login fail with error: ' + error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  onChangeText = (name, value) => {
    this.setState({ data: { ...this.state.data, [name]: value } });
  };
  render() {
    const { navigation, error, authLoading } = this.props;

    return (
      <ScrollView style={{ backgroundColor: '#FFF' }}>
        <StatusBar hidden />
        <View
          style={{
            backgroundColor: '#9000D3',
            width: '100%',
            height: 40,
            borderBottomLeftRadius: 90
          }}
        />
        <Image
          source={require('../../../assets/images/screen/group.png')}
          style={{
            alignSelf: 'center',
            marginBottom: 15,
            marginTop: 15,
            borderRadius: 120,
            marginVertical: 40,
            width: 150,
            height: 150,
            resizeMode: 'stretch'
          }}
        />

        <View
          style={{
            width: 350,
            padding: 10,
            alignSelf: 'center',
            marginTop: -10
          }}
        >
          {authLoading ? (
            <BarIndicator
              color="#E233DB"
              style={{
                marginVertical: '50%',
                marginHorizontal: '50%',
                zIndex: 1,
                position: 'absolute'
              }}
            />
          ) : null}
          <Text
            style={{
              color: '#9000D3',
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold'
            }}
          >
            Sign In
          </Text>
          <View>
            <TextInput
              label="Email"
              value={this.state.text}
              underlineColor="transparent"
              mode="outlined"
              onChangeText={value => this.onChangeText('email', value)}
              style={{
                backgroundColor: '#FFF',
                marginBottom: 10,
                width: 320
              }}
            />
            <TextInput
              label="Password"
              value={this.state.text}
              underlineColor="transparent"
              mode="outlined"
              secureTextEntry={true}
              onChangeText={value => this.onChangeText('password', value)}
              style={{
                backgroundColor: '#FFF',
                marginBottom: 10,
                width: 320,
                fontSize: 16
              }}
            />
            <HelperText type="error" visible={error}>
              {error?.message}
            </HelperText>
          </View>
          <TouchableOpacity onPress={() => this.login(0)}>
            <Button
              style={{
                marginTop: 5,
                width: 320,
                height: 50,
                borderRadius: 15,
                alignSelf: 'center',
                backgroundColor: '#9000D3'
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  marginLeft: 130
                }}
              >
                Login
              </Text>
            </Button>
          </TouchableOpacity>
          <Text
            style={{
              marginVertical: 10,
              alignSelf: 'center',
              fontWeight: 'bold'
            }}
          >
            OR
          </Text>

          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              margin: 10
            }}
          >
            {/* <LoginButton
              publishPermissions={['publish_actions', 'email']}
              readPermissions={['public_profile', 'email']}
              onLoginFinished={(error, result) => {
                console.log(result);
                if (error) {
                  console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    this.login(1, data.accessToken);
                  });
                }
              }}
              onLogoutFinished={() => {
                LoginManager.logOut();
              }}
            /> */}

            <View>
              <Button
                onPress={() => this.facebookLogin()}
                style={{
                  backgroundColor: '#0000ff',
                  alignContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: 200,
                  height: 35
                }}
              >
                <FontAwesome5Icon
                  name="facebook"
                  style={{
                    color: '#FFF',
                    fontSize: 16,
                    marginLeft: 15
                  }}
                />
                <Text style={{ color: '#FFF', fontSize: 16, marginRight: 60 }}>
                  Facebook
                </Text>
              </Button>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'space-evenly'
            }}
          >
            <GoogleSigninButton
              style={{ width: 208, height: 40 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress}
            />
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <Text>Don’t have account?</Text>
          <Text
            style={{ color: '#9000D3', marginLeft: 8, fontweight: 'bold' }}
            onPress={() => navigation.navigate('Register')}
          >
            Sign Up
          </Text>
        </View>
        <View
          style={{
            marginTop: 45,
            backgroundColor: '#9000D3',
            width: '100%',
            height: 40,
            borderTopRightRadius: 100
          }}
        />
      </ScrollView>
    );
  }
}

Login.propTypes = {
  authLoading: PropTypes.any,
  error: PropTypes.any,
  login: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

const mapStateToProps = state => ({
  data: state.auth?.data,
  authLoading: state.auth?.authLoading,
  error: state.auth?.error
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
