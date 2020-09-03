import PropTypes from 'prop-types';
import moment from 'moment';
import React, { Component } from 'react';
import { View, RefreshControl, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { findByStatusOnProgress } from '../../../actions/events';
import { connect } from 'react-redux';
import styles from './style';
import { SwipeListView } from 'react-native-swipe-list-view';

function RowEvent({ onPress, event }) {
  return (
    <Card onPress={() => onPress(event)} style={styles.cardEvent}>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 15
        }}
      >
        <Image
          style={{
            marginTop: 20,
            width: '38%',
            height: '72%',
            resizeMode: 'stretch',
            borderRadius: 20
          }}
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
              {moment(event.endDate).format('DD/MM/YY')}
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
class EventOnProgress extends Component {
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
      this.props.findByStatusOnProgress({ id });
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
    this.props.findByStatusOnProgress({
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

EventOnProgress.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.any,
    page: PropTypes.any,
    total: PropTypes.any
  }),
  error: PropTypes.any,
  findByStatus: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  userData: PropTypes.any
};

const mapStateToProps = state => ({
  data: state.eventsStatusOnProgress.data,
  loading: state.eventsStatusOnProgress.loading,
  error: state.eventsStatusOnProgress.error,

  userData: state.auth.data
});

const mapDispatchProps = {
  findByStatusOnProgress
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(EventOnProgress);
