import PropTypes from 'prop-types';
import moment from 'moment';
import React, { Component } from 'react';
import { View, RefreshControl, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { findByStatusDone } from '../../../actions/events';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';

function RowEvent({ onPress, event }) {
  return (
    <Card style={styles.cardEvent} disabled>
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/screen/banner.jpg')}
        />
        <View style={{ marginTop: 20, marginLeft: 5, padding: 10, width: 200 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, flexWrap: 'wrap' }}>
            {event.name}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 12, marginRight: 10 }}>
              {moment(event.startDate).format('DD/MM/YY')}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {moment(event.endDateDate).format('DD/MM/YY')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 12, marginRight: 10 }}>{event.time}</Text>
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
class EventDone extends Component {
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
      this.props.findByStatusDone({ id });
    }
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
    this.props.findByStatusDone({ sort, page, id: this.props.userData.id });
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
    this.props.navigation.navigate(
      'EventsList',
      event ? { id: event.id } : null
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
    const { loading } = this.props;
    const { data } = this.state;
    return (
      <ScrollView>
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
      </ScrollView>
    );
  }
}

EventDone.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.any,
    page: PropTypes.any,
    total: PropTypes.any
  }),
  error: PropTypes.any,
  findByStatusDone: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  userData: PropTypes.any
};

const mapStateToProps = state => ({
  data: state.eventsStatusDone.data,
  loading: state.eventsStatusDone.loading,
  error: state.eventsStatusDone.error,

  userData: state.auth.data
});

const mapDispatchProps = {
  findByStatusDone
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(EventDone);
