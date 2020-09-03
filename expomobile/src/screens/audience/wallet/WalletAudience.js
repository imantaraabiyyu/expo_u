import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  findCreditByUserId,
  findCreditHistoryByUserId
} from '../../../actions/credits';
import { CustomHeader } from '../../../component/CustomHeader';
import styles from './styles';
class WalletAudience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
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
  render() {
    const { navigation } = this.props;
    const { amount } = this.state;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="Wallet"
        />

        <LinearGradient
          colors={['#9400D3', '#bd1ccc', '#192f6a']}
          style={styles.backgroundGradient}
        >
          <Card style={styles.card}>
            <View style={styles.row}>
              <View style={styles.viewInCard}>
                <Text style={styles.textPrice}>Balance</Text>
                <Text style={styles.textCenter}>
                  {'Rp.' +
                    Number(amount)
                      .toFixed(0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </Text>
              </View>
              <View>
                <FontAwesome5
                  name={'plus-circle'}
                  size={35}
                  color={'#9400D3'}
                  onPress={() => navigation.navigate('TopUpCredit')}
                />
                <Text style={{ fontSize: 10 }}>Top Up</Text>
              </View>
            </View>
          </Card>
        </LinearGradient>
        <Title style={styles.activityTitle}>Activity</Title>
        <ScrollView>
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
          <RowWallet />
        </ScrollView>
      </View>
    );
  }
}

function RowWallet() {
  return (
    <Card style={styles.rowCard}>
      <View style={styles.history}>
        <View style={styles.icon}>
          <Text>Wallet Transfer</Text>
          <Text>Money send - received</Text>
        </View>
        <View style={styles.icon}>
          <Text style={styles.activity}>+ Rp. 200.000</Text>
          <Text>23 APR</Text>
        </View>
      </View>
    </Card>
  );
}

WalletAudience.propTypes = {
  data: PropTypes.any,
  findCreditByUserId: PropTypes.func,
  findCreditHistoryByUserId: PropTypes.func,
  navigation: PropTypes.any,
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
  findCreditHistoryByUserId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAudience);
