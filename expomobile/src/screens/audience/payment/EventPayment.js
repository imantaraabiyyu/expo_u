import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BarIndicator } from 'react-native-indicators';
import { Button, Card, Divider, IconButton, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { findCreditByUserId } from '../../../actions/credits';
import { findById } from '../../../actions/events';
import { save } from '../../../actions/transactions';
import { CustomHeader } from '../../../component/CustomHeader';
import styles from './styles';

class EventPayment extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.state = {
      id: route.params?.id,
      loading: false,
      count: 0,
      type: 0,
      paymentMethod: 0,
      selected: null,
      pricings: [],
      name: '',
      ticketTier: '',
      ticketName: '',
      ticketDescription: '',
      price: 0,
      ticketQty: 1,
      credit: 0,
      currentMoney: 0
    };
  }

  componentDidMount() {
    const { id } = this.state;

    if (id) {
      this.props.findById(id);
      this.props.findCreditByUserId(this.props.userData?.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, credit, saveTransaction } = this.props;
    const { ticketQty, price } = this.state;

    if (
      prevState.ticketQty != this.state.ticketQty ||
      prevState.price != this.state.price
    ) {
      this.changeCurrentMoney(ticketQty, price, credit?.amount);
    }

    if (prevProps.data !== data) {
      this.setState({ ...data, credit: credit?.amount });
    }

    if (prevProps.saveTransaction !== saveTransaction) {
      this.props.navigation.navigate('Transaction');
    }
  }

  changeTicket = ticket => {
    this.setState({
      ...this.state,
      ticketQty: 1,
      currentMoney: 0,
      ticketName: ticket.name,
      ticketTier: ticket.codename,
      selected: ticket.id,
      price: ticket.price,
      ticketDescription: ticket.description
    });
  };

  incrementTicket = () => {
    const { ticketQty } = this.state;
    this.setState({ ...this.state, ticketQty: ticketQty + 1 });
  };

  decrementTicket = () => {
    const { ticketQty } = this.state;
    if (ticketQty > 1) {
      this.setState({ ...this.state, ticketQty: ticketQty - 1 });
    }
  };

  changeCurrentMoney = (ticketQty, price, credit) => {
    const currentMoney = credit - ticketQty * price;

    if (currentMoney <= credit && currentMoney >= 0) {
      this.setState({ ...this.state, currentMoney: currentMoney });
    }
  };

  onSubmit = () => {
    const { ticketQty, price, selected, type } = this.state;
    const user = { id: this.props.userData?.id };
    const pricing = { id: selected };
    const quantity = ticketQty;
    const grand = ticketQty * price;

    this.props.save({
      type,
      user,
      pricing,
      quantity,
      grand
    });
  };
  render() {
    const { navigation, loading } = this.props;
    const {
      name,
      ticketQty,
      pricings,
      price,
      ticketDescription,
      selected,
      credit,
      currentMoney,
      ticketName
    } = this.state;

    return (
      <View>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="Payment"
        />
        <Card style={styles.card}>
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
            <View style={styles.center}>
              <Title style={styles.textCenter}>{name}</Title>
              <View style={styles.headerChoice}>
                {pricings.map((ticket, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.touch}
                    onPress={() => this.changeTicket(ticket)}
                  >
                    <Card
                      style={
                        selected == ticket.id
                          ? styles.ticketSelected
                          : styles.ticket
                      }
                    >
                      <Button
                        icon="ticket"
                        style={
                          selected == ticket.id
                            ? styles.ticketSelected
                            : styles.ticket
                        }
                      >
                        {ticket.codename}
                      </Button>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.textPrice}>
                {price === 0
                  ? ''
                  : 'Rp.' +
                    Number(price)
                      .toFixed(0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
              {ticketName === '' ? (
                <Text style={styles.textDesc}>Please Select A Ticket</Text>
              ) : (
                <View>
                  <Text style={styles.textDesc}>Name: {ticketName}</Text>
                  <Text style={styles.textDesc}>
                    Description: {ticketDescription}
                  </Text>
                </View>
              )}
            </View>
          )}
        </Card>
        {selected == null || (
          <Card style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 20
              }}
            >
              <IconButton
                icon="minus"
                size={20}
                color="blue"
                onPress={this.decrementTicket}
                disabled={selected == null}
              />

              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {ticketQty}
              </Text>
              <IconButton
                icon="plus"
                size={20}
                color="blue"
                onPress={this.incrementTicket}
                disabled={selected == null || currentMoney < price}
              />
            </View>

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
                  Number(ticketQty * price)
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
                  Number(credit)
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
                  Number(currentMoney)
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
            </View>

            <Button
              color="green"
              mode="contained"
              style={{ margin: 12 }}
              onPress={this.onSubmit}
            >
              Pay
            </Button>
          </Card>
        )}
      </View>
    );
  }
}

EventPayment.propTypes = {
  credit: PropTypes.shape({
    amount: PropTypes.any
  }),
  data: PropTypes.any,
  findById: PropTypes.func,
  findCreditByUserId: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.any,
  route: PropTypes.shape({
    params: PropTypes.any
  }),
  save: PropTypes.func,
  userData: PropTypes.any
};

const mapStateToProps = state => ({
  saveTransaction: state.saveTransaction.data,
  userData: state.auth.data,
  credit: state.userCredit.data,
  data: state.eventById.data,
  loading:
    state.eventById.loading ||
    state.saveTransaction.loading ||
    state.userCredit.loading,
  error: state.eventById.error
});

const mapDispatchToProps = {
  findById,
  findCreditByUserId,
  save
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPayment);
