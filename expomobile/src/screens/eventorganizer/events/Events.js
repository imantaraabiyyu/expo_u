import React, { Component } from 'react';
import { View, Image } from 'react-native';
import EventOnSchedule from './EventOnSchedule';
import EventOnProgress from './EventOnProgress';
import EventDone from './EventDone';
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomHeader } from '../../../component/CustomHeader';
import styles from './style';

class Events extends Component {
  render() {
    const Tab = createMaterialTopTabNavigator();
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    return (
      <View>
        <CustomHeader navigation={navigation} title="Events Status" />
        <View style={{ backgroundColor: '#fff' }}>
          <Image
            source={require('../../../../assets/images/screen/events.png')}
            style={styles.events}
          />
          <Appbar>
            <Tab.Navigator style={styles.Navigator}>
              <Tab.Screen name="On Schedule" component={EventOnSchedule} />
              <Tab.Screen name="On Progress" component={EventOnProgress} />
              <Tab.Screen name="Done" component={EventDone} />
            </Tab.Navigator>
          </Appbar>
        </View>
      </View>
    );
  }
}

export default Events;
