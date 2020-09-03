import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class EventTicketAttend extends Component {
  render() {
    return (
      <Card
        style={{
          width: 380,
          height: 80,
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 20,
          backgroundColor: '#9000D3'
        }}
      >
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <FontAwesome5Icon
            name="ticket-alt"
            style={{
              marginLeft: 40,
              marginRight: 40,
              marginTop: -12,
              color: '#FFF',
              fontSize: 40
            }}
          />
          <Text style={{ marginRight: 60, color: '#FFF' }}>name</Text>
          <Text style={{ fontSize: 12, marginRight: 60, color: '#FFF' }}>
            stock
          </Text>
          <Text style={{ fontSize: 12, marginRight: 60, color: '#FFF' }}>
            people
          </Text>
        </View>
      </Card>
    );
  }
}
