import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { bottomRoutesEO } from '../../configs/routes';
import { StyleSheet, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const getTabIcon = (iconName, focused) => {
  const iconStyles = [styles.icon];
  if (focused) {
    iconStyles.push(styles.activeIcon);
  }

  return <FontAwesome name={iconName} style={iconStyles} />;
};

function MyTabBarLabel(props) {
  return (
    <Text
      style={[
        styles.tabBarLabel,
        props.focused ? styles.tabBarLabelActive : {}
      ]}
    >
      {props.title}
    </Text>
  );
}

MyTabBarLabel.propTypes = {
  focused: PropTypes.any,
  title: PropTypes.any
};

const tabBarLabel = (focused, title) => {
  return <MyTabBarLabel title={title} focused={focused} />;
};

export default function Main(props) {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      shifting={true}
      inactiveColor={styles.buttonText.color}
      activeColor={styles.activeButtonText.color}
      barStyle={[styles.container, props.style]}
      backBehavior="initialRoute"
    >
      {bottomRoutesEO.map((route, index) => (
        <Tab.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={{
            tabBarLabel: ({ focused }) => tabBarLabel(focused, route.name),
            tabBarIcon: ({ focused }) => getTabIcon(route.icon, focused)
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

Main.propTypes = {
  style: PropTypes.any
};

const styles = StyleSheet.create({
  tabBarLabel: {
    paddingBottom: 6,
    fontSize: 10,
    textAlign: 'center'
  },
  tabBarLabelActive: {
    color: '#9000D3'
  },
  icon: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 18
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: '#E233DB',
    paddingTop: 4,
    fontSize: 12,
    fontFamily: 'roboto-regular'
  },
  activeIcon: {
    color: '#9000D3',
    fontSize: 25
  },
  activeButtonText: {
    color: '#9000D3'
  }
});
