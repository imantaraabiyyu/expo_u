import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { CustomHeader } from '../../../component/CustomHeader';
import PropTypes from 'prop-types';
import { TextInput, Card, Button, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  findCreditByUserId,
  findCreditHistoryByUserId
} from '../../../actions/credits';
import { save } from '../../../actions/transactions';
import styles from './styles';
class TopUpCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topup: 'Rp. ',
      mandiri: '',
      bca: '',
      paymentMethod: 1,
      amount: '',
      grand: 0,
      user: 0,
      type: 2
    };
  }

  componentDidMount() {
    this.props.findCreditByUserId(this.props.userData?.id);
    this.props.findCreditHistoryByUserId(this.props.userData?.id);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps.data !== data) {
      this.setState({ ...data });
    }
  }

  onSubmit = () => {
    const { type, paymentMethod, user, pricing, quantity, grand } = this.state;
    this.props.save({ type, paymentMethod, user, pricing, quantity, grand });
    this.props.navigation.navigate('TopUpDetail', { ...this.state });
  };

  changePaymentMethod = method => {
    this.setState({ ...this.state, paymentMethod: method });
  };

  render() {
    const { navigation } = this.props;
    const { paymentMethod, amount } = this.state;
    return (
      <View style={styles.backgroundTopUp}>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="Top sasUp"
        />
        <ScrollView>
          <Card.Cover
            source={require('../../../../assets/images/screen/preview.png')}
          />
          <Text style={{ alignSelf: 'center', marginTop: 20 }}>Balance</Text>
          <Title style={{ alignSelf: 'center' }}>
            {'Rp.' +
              Number(amount)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </Title>
          <TextInput
            maxLength={16}
            placeholder="1000.000"
            keyboardType="number-pad"
            label="Top Up"
            value={this.state.grand}
            onChangeText={topup =>
              this.setState({ ...this.state, grand: topup })
            }
            selectionColor={'#red'}
            style={styles.textInputList}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 10,
              marginTop: 10
            }}
          >
            <View style={{ marginHorizontal: 5, width: '30%' }}>
              <Button
                mode="contained"
                onPress={() => this.changePaymentMethod(1)}
                style={styles.buttonBank}
              >
                MANDIRI
              </Button>
            </View>
            <View style={{ marginHorizontal: 5, width: '30%' }}>
              <Button
                mode="contained"
                onPress={() => this.changePaymentMethod(2)}
                style={styles.buttonBank}
              >
                BCA
              </Button>
            </View>
          </View>
          {paymentMethod === 1 ? (
            <Card style={styles.cardBank}>
              <Text style={styles.textCardBank}>Bank Mandiri</Text>
              <Image
                style={{
                  width: '40%',
                  height: '25%',
                  alignSelf: 'center',
                  resizeMode: 'contain'
                }}
                source={require('../../../../assets/images/screen/mandiri.png')}
              />
              <TextInput
                maxLength={16}
                keyboardType="number-pad"
                label="Acount Number"
                value={this.state.mandiri}
                onChangeText={mandiri => this.setState({ mandiri })}
                selectionColor={'#red'}
                style={styles.textInputList}
              />
            </Card>
          ) : paymentMethod === 2 ? (
            <Card style={styles.cardBank} />
          ) : (
            <Card style={styles.cardBank}>
              <Text style={styles.textCardBank}>Bank BCA</Text>
              <Image
                style={{
                  width: '40%',
                  height: '25%',
                  alignSelf: 'center',
                  resizeMode: 'contain'
                }}
                source={require('../../../../assets/images/screen/bca.png')}
              />
              <TextInput
                maxLength={16}
                keyboardType="number-pad"
                label="Acount Number"
                value={this.state.bca}
                onChangeText={bca => this.setState({ bca })}
                selectionColor={'#red'}
                style={styles.textInputList}
              />
            </Card>
          )}
          <Button
            onPress={this.onSubmit}
            style={styles.buttonTopUp}
            mode="contained"
          >
            TOP UP NOW
          </Button>
        </ScrollView>
      </View>
    );
  }
}

TopUpCredit.propTypes = {
  data: PropTypes.any,
  findCreditByUserId: PropTypes.func,
  findCreditHistoryByUserId: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  save: PropTypes.func,
  userData: PropTypes.any
};

const mapStateToProps = state => ({
  userData: state.auth.data,
  data: state.userCredit.data,
  loading: state.userCredit.loading,
  error: state.userCredit.error
});

const mapDispatchToProps = {
  findCreditByUserId,
  findCreditHistoryByUserId,
  save
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopUpCredit);
