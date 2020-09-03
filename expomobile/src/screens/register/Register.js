import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Card,
  Title,
  TextInput,
  Avatar,
  Button,
  HelperText
} from 'react-native-paper';
import { View, Image, Text, StatusBar, ScrollView } from 'react-native';
import styles from './styles';
import { register } from '../../actions/register';
import RadioGroup from 'react-native-radio-button-group';
import { connect } from 'react-redux';
import { BarIndicator } from 'react-native-indicators';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      type: 2
    };
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    console.log(this.state);

    this.props.register({
      ...this.state
    });
  };
  render() {
    const { navigation, error, authLoading } = this.props;
    console.log(error);

    const errorData = error?.data;
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
            marginTop: 35,
            borderRadius: 120,
            marginVertical: 40,
            width: 140,
            height: 140,
            resizeMode: 'stretch'
          }}
        />
        <Text
          style={{
            color: '#9000D3',
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5
          }}
        >
          Sign Up
        </Text>
        <Card style={styles.card}>
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
          <Card.Content>
            <View style={{ alignSelf: 'center', marginTop: 10 }}>
              <RadioGroup
                horizontal
                options={[
                  {
                    id: 2,
                    labelView: (
                      <Text
                        style={{
                          color: '#9000D3',
                          fontWeight: 'bold',
                          marginTop: 5
                        }}
                      >
                        Audience
                      </Text>
                    )
                  },
                  {
                    id: 3,
                    labelView: (
                      <Text
                        style={{
                          color: '#9000D3',
                          fontWeight: 'bold',
                          marginTop: 5
                        }}
                      >
                        EO
                      </Text>
                    )
                  },
                  {
                    id: 4,
                    labelView: (
                      <Text
                        style={{
                          color: '#9000D3',
                          fontWeight: 'bold',
                          marginTop: 5
                        }}
                      >
                        Merchant
                      </Text>
                    )
                  }
                ]}
                onChange={value => this.onChange('type', value.id)}
                activeButtonId={2}
                circleStyle={{
                  fillColor: '#9000D3',
                  fontWeight: 'bold',
                  marginTop: 5,
                  borderColor: '#E233DB'
                }}
              />
            </View>
            <View>
              <TextInput
                label="Username"
                value={this.state.username}
                underlineColor="transparent"
                mode="outlined"
                onChangeText={value => this.onChange('username', value)}
                style={{ backgroundColor: '#fff', marginTop: 10 }}
              />

              <TextInput
                label="Email"
                value={this.state.email}
                underlineColor="transparent"
                mode="outlined"
                keyboardType="email-address"
                onChangeText={value => this.onChange('email', value)}
                style={{ backgroundColor: '#fff', marginTop: 10 }}
              />
              {error && (
                <HelperText type="error" visible={error}>
                  {errorData?.email}
                </HelperText>
              )}
              <TextInput
                label="Password"
                value={this.state.password}
                underlineColor="transparent"
                mode="outlined"
                secureTextEntry={true}
                onChangeText={value => this.onChange('password', value)}
                style={{ backgroundColor: '#fff', marginTop: 10 }}
              />
              {error && (
                <HelperText type="error" visible={error}>
                  {errorData?.password}
                </HelperText>
              )}
            </View>
            <View style={{ marginTop: 5 }}>
              <Button
                onPress={this.onSubmit}
                style={{ backgroundColor: '#9000D3', marginTop: 10 }}
              >
                <Text style={{ color: '#fff' }}>Register</Text>
              </Button>
            </View>
          </Card.Content>
        </Card>
        <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
          <Text>Already have account?</Text>
          <Text
            style={{ color: '#9000D3', marginLeft: 8, fontWeight: 'bold' }}
            onPress={() => navigation.navigate('Login')}
          >
            Sign In
          </Text>
        </View>
        <View
          style={{
            marginTop: 54,
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

Register.propTypes = {
  authLoading: PropTypes.any,
  error: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  register: PropTypes.func
};

const mapStateToProps = state => ({
  data: state.auth.data,
  authLoading: state.auth.authLoading,
  error: state.auth.error
});

const mapDispatchToProps = {
  register
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
