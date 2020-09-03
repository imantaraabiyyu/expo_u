import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { findByUserId } from '../../../actions/transactions';
import { CustomHeader } from '../../../component/CustomHeader';
import styles from './style';
class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      search: '',
      params: {
        search: '',
        sort: 'desc',
        page: 0,
        size: 20
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.userData;
    if (id) {
      this.props.findByUserId(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setState({
        data: [...this.state.data, ...data?.list],
        total: data.total,
        search: this.state.params.search,
        params: {
          ...this.state.params,
          page: data.page
        }
      });
    }
  }

  onRefresh = () => {
    const { params } = this.state;
    this.setState(
      {
        data: [],
        total: 0,
        params: { ...params, page: 0 }
      },
      () => this.reload(this.state.params)
    );
  };

  onEndReached = () => {
    const { data, total, params } = this.state;

    if (data.length < total) {
      this.reload({
        ...params,
        page: params.page + 1
      });
    }
  };

  onShowForm = item => {
    this.props.navigation.navigate(
      'HistoryTransaction',
      item ? { id: item.id } : null
    );
  };

  reload({ sort = 'desc', page = 0 } = {}) {
    this.props.findByUserId({ sort, page });
  }

  render() {
    const { navigation, loading } = this.props;
    const { data, search } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="Transactions"
          hideLeftButton={true}
        />
        <View />
        <SwipeListView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
          }
          data={data}
          renderItem={({ item, index }) => (
            <RowItem item={item} onPress={this.onShowForm} />
          )}
          keyExtractor={item => item.id.toString()}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

Transaction.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.any,
    total: PropTypes.any
  }),
  findAll: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

function RowItem({ onPress, item }) {
  console.log(item);
  return (
    <Card style={{ width: 400, alignSelf: 'center', marginTop: 20 }} avatar>
      <View style={styles.header}>
        <Card.Content>
          <Paragraph style={{ color: '#E233DB' }} />
          <View style={styles.row}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5
                name="clipboard"
                size={30}
                color={'#9400D3'}
                style={styles.icon}
              />
              <Text style={{ marginVertical: 5, marginHorizontal: 10 }}>
                {item.pricing.codename}
              </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <View>
                <Text>Quantity : {item.quantity}</Text>
              </View>
              <Text style={styles.price}>
                {'Rp. ' +
                  Number(item.grand)
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
            </View>
          </View>
        </Card.Content>
      </View>

      {/* {Status(item.pricing.event.status)} */}
    </Card>
  );
}

RowItem.propTypes = {
  item: PropTypes.shape({
    pricing: PropTypes.shape({
      codename: PropTypes.any,
      event: PropTypes.shape({
        location: PropTypes.any,
        name: PropTypes.any,
        startDate: PropTypes.any,
        status: PropTypes.any,
        time: PropTypes.any
      }),
      price: PropTypes.any
    }),
    quantity: PropTypes.any
  }),
  onPress: PropTypes.func
};

function Status(status) {
  if (status === 1) {
    return (
      <Button style={styles.buttonActive} color={'#80DC69'}>
        ACTIVE
      </Button>
    );
  } else if (status === 2) {
    return (
      <Button style={styles.buttonNonActive} color={'red'}>
        NON - ACTIVE
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.data,
  data: state.findUserTransactions.data,
  loading: state.findUserTransactions.loading,
  error: state.findUserTransactions.error
});

const mapDispatchToProps = {
  findByUserId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction);
