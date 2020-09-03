import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';

class Splash extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000)
    );
  };

  render() {
    return (
      <View style={styles.viewStyles}>
        <StatusBar backgroundColor="#9400D3" />
        <Image
          source={require('../../../assets/images/screen/splashlogo.png')}
          style={{
            width: 190,
            height: 170,
            resizeMode: 'stretch',
            marginTop: -40
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontFamily: 'courier-regular',
            letterSpacing: 6,
            marginTop: -15
          }}
        >
          Find Your Self
        </Text>
      </View>
    );
  }
}

Splash.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9000D3'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
};

export default Splash;
