import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button, Divider, Text, TextInput, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { findCreditByUserId } from '../../../actions/credits';
import { CustomHeader } from '../../../component/CustomHeader';
import { EventTierButton } from '../../../component/EventTierButton';
import styles from './style';
import { save } from '../../../actions/events';
import { save as saveTransaction } from '../../../actions/transactions';
import { BarIndicator } from 'react-native-indicators';

class EventPayment extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;

    this.state = {
      data: route.params.data,
      balance: 0,
      paymentMethod: 0,
      accountNumber: 0,
      grand: route.params.data.eventPrice,
      quantity: 1,
      type: 1,
      user: {
        id: this.props.userData.id
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.userData;

    if (id) {
      this.props.findCreditByUserId(this.props.userData?.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { credit, data } = this.props;
    if (prevProps.credit !== credit) {
      this.setState({ ...this.state, balance: credit?.amount });
    }
    if (prevProps.data !== data) {
      this.props.navigation.navigate('SaveData');
    }
  }

  onSubmit = () => {
    const {
      startDate,
      endDate,
      capacity,
      eventTier,
      registrationStartDate,
      registrationEndDate,
      startTime,
      endTime,
      name,
      description,
      pricings,
      categories,
      location
    } = this.state.data;
    const organizer = { id: this.props.userData?.profileId };
    const formatStartTime = moment(startTime).format('HH:mm:ss');
    const formatEndTime = moment(endTime).format('HH:mm:ss');

    const { type, paymentMethod, user, pricing, quantity, grand } = this.state;
    this.props.saveTransaction(
      {
        type,
        paymentMethod,
        user,
        pricing,
        quantity,
        grand
      },
      this.props.save({
        startDate,
        organizer,
        endDate,
        eventTier,
        capacity,
        registrationStartDate,
        registrationEndDate,
        formatStartTime,
        formatEndTime,
        name,
        description,
        pricings,
        categories,
        location
      })
    );
  };

  changePaymentMethod = method => {
    this.setState({ ...this.state, paymentMethod: method });
  };

  render() {
    const { navigation, loading } = this.props;
    const { data, paymentMethod, accountNumber, balance } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <CustomHeader navigation={navigation} title="Payment" />

        {loading ? (
          <BarIndicator
            color="#E233DB"
            style={{
              marginVertical: '50%',
              marginHorizontal: '50%',
              zIndex: 1,
              position: 'absolute'
            }}
          />
        ) : (
          <ScrollView>
            <View style={{ height: 1400 }}>
              <Title style={{ alignSelf: 'center', marginTop: 20 }}>{}</Title>
              <View>
                <EventTierButton tier={data.tier} />
                <Text style={styles.textPrice}>
                  {'Rp.' +
                    Number(data.eventPrice)
                      .toFixed(0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </Text>
              </View>
              <View style={styles.paymentMethodCard}>
                <Text style={styles.paymentMethodTitle}>Summary</Text>

                <View style={styles.eventDesc}>
                  <Text>Name: </Text>
                  <Text>{data.name}</Text>
                </View>
                <View style={styles.eventDesc}>
                  <Text>Description: </Text>
                  <Text>{data.description}</Text>
                </View>
                <View style={styles.eventDesc}>
                  <Text>Capacity: </Text>
                  <Text>{data.capacity}</Text>
                </View>
                <View style={styles.eventDesc}>
                  <Text>Event Date: </Text>
                  <Text>
                    {data.startDate
                      ? moment(data.startDate).format('YYYY-MM-DD')
                      : null}

                    {moment(data.endDate).format('YYYY-MM-DD') !=
                    moment(data.startDate).format('YYYY-MM-DD')
                      ? ' - ' + moment(data.endDate).format('YYYY-MM-DD')
                      : null}
                  </Text>
                </View>
                <View style={styles.eventDesc}>
                  <Text>Event Time: </Text>
                  <Text>
                    {data.startTime
                      ? moment(data.startTime).format('LT')
                      : null}{' '}
                    - {data.endTime ? moment(data.endTime).format('LT') : null}
                  </Text>
                </View>
                <View style={styles.eventDesc}>
                  <Text>Registration Date: </Text>
                  <Text>
                    {data.registrationStartDate
                      ? moment(data.registrationStartDate).format('YYYY-MM-DD')
                      : null}

                    {moment(data.registrationEndDate).format('YYYY-MM-DD') !=
                    moment(data.registrationStartDate).format('YYYY-MM-DD')
                      ? ' - ' +
                        moment(data.registrationEndDate).format('YYYY-MM-DD')
                      : null}
                  </Text>
                </View>
                <View style={styles.eventDesc}>
                  <Text>Location: </Text>
                  <Text>{data.location.name}</Text>
                </View>
                <View style={styles.eventDesc}>
                  <Text>Categories: </Text>
                </View>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row-reverse',
                    margin: 15
                  }}
                >
                  {data?.categories?.map((category, index) => (
                    <Button
                      key={index}
                      mode="contained"
                      color="#E233DB"
                      style={styles.category}
                    >
                      {category.name}
                    </Button>
                  ))}
                </View>
                <View style={styles.eventDesc}>
                  <Text>Ticket Pricing: </Text>
                </View>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row-reverse',
                    margin: 15
                  }}
                >
                  {data.pricings.map((ticket, index) => (
                    <Button
                      key={index}
                      icon="ticket"
                      style={{
                        width: '30%',
                        margin: 5,
                        flexDirection: 'column'
                      }}
                      mode="contained"
                    >
                      {ticket.codename}
                    </Button>
                  ))}
                </View>

                <Divider />
                <Text style={styles.paymentMethodTitle}>Payment Method</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginHorizontal: 10,
                    marginTop: 10
                  }}
                >
                  <View style={styles.buttonPayment}>
                    <Button
                      mode="contained"
                      color="green"
                      onPress={() => this.changePaymentMethod(0)}
                    >
                      <Text style={styles.buttonPaymentText}>WALLET</Text>
                    </Button>
                  </View>
                  <View style={styles.buttonPayment}>
                    <Button
                      mode="contained"
                      color="green"
                      onPress={() => this.changePaymentMethod(1)}
                    >
                      <Text style={styles.buttonPaymentText}>MANDIRI</Text>
                    </Button>
                  </View>
                  <View style={styles.buttonPayment}>
                    <Button
                      mode="contained"
                      color="green"
                      onPress={() => this.changePaymentMethod(2)}
                    >
                      <Text style={styles.buttonPaymentText}>BCA</Text>
                    </Button>
                  </View>
                </View>
                {paymentMethod === 0 ? (
                  <View>
                    <Text style={styles.paymentMethodTitle}>Wallet</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 20,
                        justifyContent: 'space-between'
                      }}
                    >
                      <Text>Total: </Text>
                      <Text>
                        {'Rp.' +
                          Number(data.eventPrice)
                            .toFixed(0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                    </View>

                    <Divider />

                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 20,
                        justifyContent: 'space-between'
                      }}
                    >
                      <Text>Balance: </Text>
                      <Text>
                        {'Rp.' +
                          Number(balance)
                            .toFixed(0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 20,
                        justifyContent: 'space-between'
                      }}
                    >
                      <Text>Credit: </Text>
                      <Text>
                        {'Rp.' +
                          Number(balance - data.eventPrice)
                            .toFixed(0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                    </View>
                    {balance - data.eventPrice < 0 ? (
                      <Button
                        style={styles.buttonTopUp}
                        color="red"
                        mode="contained"
                      >
                        Insulficient Balance
                      </Button>
                    ) : (
                      <Button
                        onPress={this.onSubmit}
                        style={styles.buttonTopUp}
                        color="green"
                        mode="contained"
                      >
                        Pay
                      </Button>
                    )}
                  </View>
                ) : paymentMethod === 1 ? (
                  <View style={{ margin: 5 }}>
                    <Text style={styles.paymentMethodTitle}>
                      Account Number
                    </Text>
                    <Image
                      style={{
                        width: '25%',
                        height: '15%',
                        resizeMode: 'contain',
                        alignSelf: 'center'
                      }}
                      source={require('../../../../assets/images/screen/mandiri.png')}
                    />
                    <TextInput
                      maxLength={16}
                      placeholder="1111.2222.3333.4444"
                      keyboardType="number-pad"
                      label="Account Number"
                      value={accountNumber}
                      onChangeText={text => this.setState({ text })}
                      selectionColor={'#red'}
                      style={styles.accountNumberInput}
                    />
                    <Button
                      onPress={this.onPressTimeOut}
                      style={styles.buttonTopUp}
                      color="green"
                      mode="contained"
                    >
                      Pay
                    </Button>
                  </View>
                ) : (
                  <View style={{ margin: 5 }}>
                    <Text style={styles.paymentMethodTitle}>
                      Account Number
                    </Text>
                    <Image
                      style={{
                        width: '25%',
                        height: '15%',
                        resizeMode: 'contain',
                        alignSelf: 'center'
                      }}
                      source={require('../../../../assets/images/screen/bca.png')}
                    />
                    <TextInput
                      maxLength={16}
                      placeholder="1111.2222.3333.4444"
                      keyboardType="number-pad"
                      label="Account Number"
                      value={accountNumber}
                      onChangeText={text => this.setState({ text })}
                      selectionColor={'#red'}
                      style={styles.accountNumberInput}
                    />
                    <Button
                      onPress={this.onSubmit}
                      style={styles.buttonTopUp}
                      color="green"
                      mode="contained"
                    >
                      Pay
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

EventPayment.propTypes = {
  credit: PropTypes.any,
  data: PropTypes.any,
  findCreditByUserId: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.any
    })
  }),
  save: PropTypes.func,
  saveTransaction: PropTypes.func,
  transaction: PropTypes.any,
  userData: PropTypes.any
};

const mapStateToProps = state => ({
  transaction: state.saveTransaction.data,
  userData: state.auth.data,
  credit: state.userCredit.data,
  data: state.savedEvent.data,
  loading:
    state.savedEvent.loading ||
    state.userCredit.loading ||
    state.saveTransaction.loading,
  error: state.savedEvent.error
});

const mapDispatchToProps = {
  findCreditByUserId,
  save,
  saveTransaction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPayment);
