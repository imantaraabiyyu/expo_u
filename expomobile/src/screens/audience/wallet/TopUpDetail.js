import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput, Card, Button, Title } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import styles from './styles';
import { CustomHeader } from '../../../component/CustomHeader';
class TopUpDetail extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.state = {
      id: route.params.paymentMethod,
      topup: route.params.topup,
      bank: route.params.mandiri
    };
  }
  render() {
    const { navigation } = this.props;
    const { id, mandiri, topup } = this.state;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="Top Up"
        />
        <Card style={styles.cardCountdown}>
          <Text
            style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}
          >
            Next step...
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              marginVertical: 20,
              fontSize: 20,
              marginHorizontal: 40
            }}
          >
            Please, immediately complete payment top up before.
          </Text>
          <CountDown
            size={20}
            until={600000}
            onFinish={() => alert('Finished')}
            digitStyle={{
              backgroundColor: '#FFF',
              borderWidth: 2,
              borderColor: 'red'
            }}
            digitTxtStyle={{ color: 'red' }}
            timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
            separatorStyle={{ color: 'red' }}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{ m: null, s: null }}
            showSeparator
            style={{ marginVertical: 40 }}
          />
          <View
            style={{
              backgroundColor: '#ffe9a4',
              height: 100,
              marginHorizontal: 10,
              borderRadius: 10,
              marginVertical: 20
            }}
          >
            <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 20 }}>
              Total: {topup}
            </Text>
            <Text
              style={{ alignSelf: 'center', marginTop: 10, fontWeight: 'bold' }}
            >
              Transfer to
            </Text>
            <Text style={{ alignSelf: 'center' }}>
              Acount Number: xxx.xxx.xxx
            </Text>
          </View>
        </Card>
      </View>
    );
  }
}

TopUpDetail.propTypes = {
  route: PropTypes.any
};

export default TopUpDetail;
