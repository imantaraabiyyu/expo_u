import React from 'react';
import { Button, Text } from 'native-base';

export default function EventTierButton({ tier }) {
  if (tier === 1) {
    return (
      <Button small rounded style={{ backgroundColor: '#8B4513' }}>
        <Text>BRONZE</Text>
      </Button>
    );
  } else if (tier === 2) {
    return (
      <Button small rounded style={{ backgroundColor: '#C0C0C0' }}>
        <Text>SILVER</Text>
      </Button>
    );
  } else if (tier === 3) {
    return (
      <Button
        small
        rounded
        style={{ backgroundColor: '#FFD700', alignSelf: 'center' }}
      >
        <Text>GOLD</Text>
      </Button>
    );
  } else if (tier === 4) {
    return (
      <Button
        small
        rounded
        style={{ backgroundColor: '#E5E4E2', alignSelf: 'center' }}
      >
        <Text style={{ color: '#000' }}>PLATINUM</Text>
      </Button>
    );
  } else {
    return (
      <Button
        small
        rounded
        style={{ backgroundColor: '#E5E4E2', alignSelf: 'center' }}
      >
        <Text>UNKNOWN</Text>
      </Button>
    );
  }
}
