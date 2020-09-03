import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default function EventTier({ tier }) {
  if (tier === 0) {
    return (
      <View
        style={{
          width: 70,
          height: 20,
          backgroundColor: '#8B4513',
          borderRadius: 20
        }}
      >
        <Text style={{ alignSelf: 'center', color: '#FFF' }}>Bronze</Text>
      </View>
    );
  } else if (tier == 1) {
    return (
      <View
        style={{
          width: 70,
          height: 20,
          backgroundColor: '#C0C0C0',
          borderRadius: 20
        }}
      >
        <Text style={{ alignSelf: 'center', color: '#000000' }}>Silver</Text>
      </View>
    );
  } else if (tier === 2) {
    return (
      <View
        style={{
          width: 70,
          height: 20,
          backgroundColor: '#FFD700',
          borderRadius: 20
        }}
      >
        <Text style={{ alignSelf: 'center', color: '#FFF' }}>Gold</Text>
      </View>
    );
  } else if (tier === 3) {
    return (
      <View
        style={{
          width: 70,
          height: 20,
          backgroundColor: '#696969',
          borderRadius: 20
        }}
      >
        <Text style={{ alignSelf: 'center', color: '#000000' }}>Platinum</Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: 70,
          height: 20,
          backgroundColor: '#696969',
          borderRadius: 20
        }}
      >
        <Text style={{ alignSelf: 'center', color: '#000000' }}>Platinum</Text>
      </View>
    );
  }
}
