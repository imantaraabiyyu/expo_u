import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, RefreshControl, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Card, Avatar, Button } from 'react-native-paper';
import { CustomHeader } from '../../../component/CustomHeader';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { findAll } from '../../../actions/merchants';
import styles from './style';

function RowMerchant({ merchant }) {
  return (
    <View>
      <Card
        style={{
          width: 380,
          height: 200, //230,
          marginTop: 20,
          borderRadius: 20,
          marginRight: 5,
          marginLeft: 10,
          marginBottom: 5,
          borderBottomWidth: 8,
          borderBottomColor: '#9000D3',
          shadowColor: '#30C1DD',
          shadowRadius: 50,
          shadowOpacity: 0.8,
          elevation: 6,
          shadowOffset: {
            width: 1,
            height: 4
          }
        }}
      >
        <View style={{ flexDirection: 'row', marginLeft: 250, marginTop: 20 }}>
          <FontAwesome name="map-marker-alt" />
          <Text style={{ fontWeight: 'bold', fontSize: 12, marginLeft: 10 }}>
            {merchant.city}
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 15,
            paddingRight: 60,
            height: 100,
            width: 380
          }}
        >
          <Avatar.Image
            source={require('../../../../assets/images/screen/banner.jpg')}
            style={{
              alignSelf: 'center',
              resizeMode: 'stretch',

              marginTop: 10,
              marginLeft: 40
            }}
            size={80}
          />

          <View style={{ marginTop: 20, marginLeft: 5, paddingLeft: 50 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {merchant.name}
            </Text>
            <Text style={{ fontSize: 14, marginRight: 10 }}>
              {merchant.description}
            </Text>
            <Text style={{ fontSize: 14 }}>{merchant.address}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 14, marginRight: 10 }}>
                {merchant.phone}
              </Text>
            </View>
            {/*  <View>
              <Button
                mode="contained"
                style={{
                  backgroundColor: '#30d98d',
                  width: 100,
                  borderRadius: 40,
                  marginTop: 20
                }}
              >
                <Text>Add</Text>
              </Button>
            </View> */}
          </View>
        </View>
      </Card>
    </View>
  );
}

RowMerchant.propTypes = {
  merchant: PropTypes.shape({
    city: PropTypes.any,
    name: PropTypes.any,
    phone: PropTypes.any
  }),
  onPress: PropTypes.func
};

class MerchantList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total: 0,
      params: {
        sort: 'asc',
        page: 0
      }
    };
  }

  componentDidMount() {
    this.reload(this.state.params);
  }

  componentDidUpdate(prevProps) {
    const { data, error } = this.props;
    console.log(data);

    if (prevProps.data !== data) {
      this.setState({
        data: [...this.state.data, ...data.list],
        total: data.total,
        params: {
          ...this.state.params,
          page: data.page
        }
      });
    } else if (error && prevProps.error !== error) {
      console.log(error);
    }
  }

  reload({ sort = 'asc', page = 0 } = {}) {
    this.props.findAll({ sort, page });
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

  onShowForm = merchant => {
    this.props.navigation.navigate(
      'MerchantDetailEO',
      merchant ? { id: merchant.id } : null
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

  render() {
    const { navigation, loading } = this.props;
    const { data } = this.state;
    return (
      <ScrollView style={styles.background}>
        <CustomHeader navigation={navigation} title="Merchant" />
        <View>
          <FontAwesome name="store" style={styles.icon} />
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({ item }) => (
              <RowMerchant onPress={this.onShowForm} merchant={item} />
            )}
            rightOpenValue={-75}
            keyExtractor={event => event.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ScrollView>
    );
  }
}

MerchantList.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.any,
    page: PropTypes.any,
    total: PropTypes.any
  }),
  error: PropTypes.any,
  findAll: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

const mapStateToProps = state => ({
  data: state.merchants.data,
  loading: state.merchants.loading,
  error: state.merchants.error
});

const mapDispatchProps = {
  findAll
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(MerchantList);
