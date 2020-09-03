import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View } from 'react-native';
import styles from './style';

class Generator extends Component {
  render() {
    return (
      <View style={{ alignSelf: 'center', marginTop: 50 }}>
        <QRCode
          style={styles.code}
          value="Just some string value"
          logoSize={30}
          logoBackgroundColor="transparent"
        />
      </View>
    );
  }
}

export default Generator;
