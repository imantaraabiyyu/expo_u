import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { connect, Provider } from 'react-redux';
import {
  audienceRoutes,
  eoRoutes,
  merchantRoutes
} from '../src/configs/routes';
import { restoreToken } from './actions/auth';
import store from './configs/store';
import { Login, OnBoarding } from './screens/login';
import { Register } from './screens/register';
import { Splash } from './screens/splash';
const Stack = createStackNavigator();

console.disableYellowBox = true;

function SelectStack({ role }) {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {role === 'Merchant'
          ? merchantRoutes.map((route, index) => (
              <Stack.Screen
                key={index}
                name={route.name}
                component={route.component}
                options={{ headerMode: 'none' }}
              />
            ))
          : role === 'EventOrganizer'
          ? eoRoutes.map((route, index) => (
              <Stack.Screen
                key={index}
                name={route.name}
                component={route.component}
                options={{ headerMode: 'none' }}
              />
            ))
          : audienceRoutes.map((route, index) => (
              <Stack.Screen
                key={index}
                name={route.name}
                component={route.component}
                options={{ headerMode: 'none' }}
              />
            ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

SelectStack.propTypes = {
  role: PropTypes.string
};

const sign = [
  {
    name: 'Login',
    component: Login
  },
  {
    name: 'Register',
    component: Register
  }
];

class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      loading: true,
      token: '',
      role: '',
      showRealApp: false
    };
  }

  handler(showRealApp) {
    this.setState({
      ...this.state,
      showRealApp: showRealApp
    });
  }

  componentDidMount() {
    AsyncStorage.getItem('first_time').then(value => {
      this.setState({ showRealApp: !!value });
    });
    this.props.restoreToken();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setState({
        ...data,
        role: data.data?.role,
        token: data.data?.token
      });
    }
  }

  render() {
    const { loading, token, role, showRealApp } = this.state;

    return (
      <Root>
        <View style={{ height: '100%', width: '100%' }}>
          {loading ? (
            <Splash />
          ) : showRealApp ? (
            token === null ? (
              <NavigationContainer>
                <Stack.Navigator headerMode="none">
                  {sign.map((route, index) => (
                    <Stack.Screen
                      key={index}
                      name={route.name}
                      component={route.component}
                      options={{ headerMode: 'none' }}
                    />
                  ))}
                </Stack.Navigator>
              </NavigationContainer>
            ) : (
              <SelectStack role={role} />
            )
          ) : (
            <View style={{ height: '100%', width: '100%' }}>
              <OnBoarding showRealApp={this.handler} />
            </View>
          )}
        </View>
      </Root>
    );
  }
}

AppNavigator.propTypes = {
  data: PropTypes.any,
  restoreToken: PropTypes.func
};

const mapStateToProps = state => ({
  data: state.auth
});

const mapDispatchToProps = dispatch => ({
  restoreToken: data => dispatch(restoreToken(data))
});

const ConnectedAppNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedAppNavigator />
    </Provider>
  );
}
