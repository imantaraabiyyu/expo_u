import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';

export default class SaveDataSuccess extends Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000)
    );
  };

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('MainEO');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <StatusBar backgroundColor="#FFF" />
        <Image
          source={require('../../../assets/images/screen/SaveData.jpg')}
          style={{
            width: 240,
            height: 220,
            resizeMode: 'stretch',
            marginTop: -40
          }}
        />
        <Text
          style={{
            color: '#30d98d',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'courier-regular',
            letterSpacing: 2,
            marginTop: 5
          }}
        >
          Save Data Event Success
        </Text>
        <Text style={{ marginTop: 10 }}>Waiting for Verification </Text>
      </View>
    );
  }
}

SaveDataSuccess.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
};
