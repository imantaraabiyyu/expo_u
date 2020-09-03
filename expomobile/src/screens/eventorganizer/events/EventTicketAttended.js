import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class EventTicketAttended extends Component {
  render() {
    return (
      <Card
        style={{
          width: 380,
          height: 80,
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 20,
          borderWidth: 4,
          borderColor: '#9000D3'
        }}
      >
        <View style={{ flexDirection: 'row', marginTop: 28 }}>
          <FontAwesome5Icon
            name="ticket-alt"
            style={{
              marginLeft: 40,
              marginRight: 40,
              marginTop: -14,
              color: '#9000D3',
              fontSize: 40
            }}
          />
          <Text style={{ marginRight: 60, color: '#9000D3' }}>name</Text>
          <Text style={{ fontSize: 12, marginRight: 60, color: '#9000D3' }}>
            stock
          </Text>
          <Text style={{ fontSize: 12, marginRight: 60, color: '#9000D3' }}>
            people
          </Text>
        </View>
      </Card>
    );
  }
}
