import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, RefreshControl, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { findByStatusOnSchedule } from '../../../actions/events';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './style';

function RowEvent({ onPress, event }) {
  return (
    <Card onPress={() => onPress(event)} style={styles.cardEvent}>
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/screen/banner.jpg')}
        />
        <View style={{ marginTop: 10, marginLeft: 5, padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, flexWrap: 'wrap' }}>
            {event.name}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 12, marginRight: 10 }}>
              {moment(event.startDate).format('DD/MM/YY')}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {' '}
              {moment(event.endDate).format('DD/MM/YY')}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 12, marginRight: 10 }}>
              {event.capacity} people
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

RowEvent.propTypes = {
  event: PropTypes.shape({
    description: PropTypes.any,
    name: PropTypes.any
  }),
  onPress: PropTypes.func
};

class EventOnSchedule extends Component {
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
    const { id } = this.props.userData;
    if (id) {
      this.props.findByStatusOnSchedule({ id });
    }
  }

  componentDidUpdate(prevProps) {
    const { data, error } = this.props;
    console.log('data schedule', data);

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
    this.props.findByStatusOnSchedule({
      sort,
      page,
      id: this.props.userData.id
    });
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

  onShowForm = event => {
    this.props.navigation.navigate('EventsList');
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
    const { loading } = this.props;
    const { data, total } = this.state;
    console.log('totalsched', total);

    return (
      <ScrollView>
        {data.length ? (
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({ item }) => (
              <RowEvent onPress={this.onShowForm} event={item} />
            )}
            rightOpenValue={-75}
            keyExtractor={event => event.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <Text
            style={{
              color: '#9000D3',
              fontWeight: 'bold',
              fontSize: 18,
              alignSelf: 'center',
              marginTop: 180
            }}
          >
            Let's Started Your Event
          </Text>
        )}
      </ScrollView>
    );
  }
}

EventOnSchedule.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.any,
    page: PropTypes.any,
    total: PropTypes.any
  }),
  error: PropTypes.any,
  findByStatusOnSchedule: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  userData: PropTypes.any
};

const mapStateToProps = state => ({
  data: state.eventsStatusOnSchedule.data,
  loading: state.eventsStatusOnSchedule.loading,
  error: state.eventsStatusOnSchedule.error,
  userData: state.auth.data
});

const mapDispatchProps = {
  findByStatusOnSchedule
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(EventOnSchedule);
