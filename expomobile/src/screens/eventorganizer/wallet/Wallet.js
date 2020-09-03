import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CustomHeader } from '../../../component/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { findCreditByUserId } from '../../../actions/credits';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: '' };
  }
  reload = () => {
    this.props.findCreditByUserId;
  };
  componentDidMount() {
    const { id } = this.props.userData;
    if (id) {
      this.props.findCreditByUserId(id);
    }
  }
  componentDidUpdate(prevProps) {
    const { data, error, userData } = this.props;

    if (prevProps.data !== data) {
      this.setState({ ...data });
    } else if (error && prevProps.error !== error) {
      console.log('error');
    }
  }

  onRefresh = () => {
    this.setState(() => this.reload(this.state));
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation, loading } = this.props;
    const { amount } = this.state;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <CustomHeader navigation={navigation} title=" Wallet" />
        <LinearGradient
          colors={['#9400D3', '#bd1ccc', '#192f6a']}
          style={{
            height: 70,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50
          }}
        >
          <Card
            style={{
              height: 80,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 4,
              marginTop: 15,
              shadowOffset: {
                width: 0,
                height: 5
              },
              marginHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#9400D3'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 20,
                justifyContent: 'space-between'
              }}
            >
              <View style={{ marginLeft: 5, marginVertical: 10 }}>
                <Text style={{ fontSize: 10 }}>Balance</Text>
                <Text style={{ fontSize: 20 }}>
                  {'Rp.' +
                    Number(amount)
                      .toFixed(0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </Text>
              </View>
              <View>
                <FontAwesome5Icon
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
        <Title style={{ marginLeft: 30, marginTop: 40 }}>Activity</Title>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
          }
        >
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

Wallet.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  findCreditByUserId: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  userData: PropTypes.any
};

function RowWallet() {
  return (
    <Card
      style={{
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#9400D3',
        marginHorizontal: 20
      }}
    >
      <View
        style={{
          width: '85%',
          borderRadius: 20,
          alignSelf: 'center',
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Text>Wallet Transfer</Text>
          <Text>Money send - received</Text>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ color: 'red' }}>+ Rp. 200.000</Text>
          <Text>23 APR</Text>
        </View>
      </View>
    </Card>
  );
}

const mapStateToProps = state => ({
  userData: state.auth.data,
  data: state.userCredit.data,
  loading: state.userCredit.loading,
  error: state.userCredit.error
});

const mapDispatchProps = {
  findCreditByUserId
};
export default connect(
  mapStateToProps,
  mapDispatchProps
)(Wallet);
