import React, { Component } from 'react';
import { View, Image } from 'react-native';
import EventTicketAttend from './EventTicketAttend';
import EventTicketAttended from './EventTicketAttended';
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomHeader } from '../../../component/CustomHeader';
import { ScrollView } from 'react-native';
import styles from './style';

class TicketList extends Component {
  render() {
    const Tab = createMaterialTopTabNavigator();
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <CustomHeader navigation={navigation} title="Ticket Status" />
        <ScrollView style={{ backgroundColor: '#fff' }}>
          <Appbar style={styles.bar}>
            <Tab.Navigator style={styles.Navigator}>
              <Tab.Screen name="Attend" component={EventTicketAttend} />
              <Tab.Screen name="Attended" component={EventTicketAttended} />
            </Tab.Navigator>
          </Appbar>
        </ScrollView>
      </View>
    );
  }
}

export default TicketList;
