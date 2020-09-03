import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CustomHeader } from '../../../component/CustomHeader';

class HistoryEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="expo U"
          hideLeftButton={true}
        />
        <Text>Historyy</Text>
      </View>
    );
  }
}

export default HistoryEvent;
