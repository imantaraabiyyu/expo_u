import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { bottomRoutesAudience } from '../../configs/routes';
import { StyleSheet, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const getTabIcon = (iconName, focused) => {
  const iconStyles = [styles.icon];
  if (focused) {
    iconStyles.push(styles.activeIcon);
  }

  return <FontAwesome5 name={iconName} style={iconStyles} />;
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

export default function MainAudience(props) {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      shifting={true}
      inactiveColor={styles.buttonText.color}
      activeColor={styles.activeButtonText.color}
      barStyle={[styles.container, props.style]}
      backBehavior="initialRoute"
    >
      {bottomRoutesAudience.map((route, index) => (
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

MainAudience.propTypes = {
  style: PropTypes.any
};

const styles = StyleSheet.create({
  tabBarLabel: {
    paddingBottom: 6,
    fontSize: 10,
    textAlign: 'center'
  },
  tabBarLabelActive: {
    color: '#E233DB'
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
    color: '#E233DB',
    fontSize: 25
  },
  activeButtonText: {
    color: '#ffd369'
  }
});
