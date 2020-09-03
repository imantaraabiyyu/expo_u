import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, RefreshControl, ScrollView, View } from 'react-native';
import { Button, Card, FAB, List, Title } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { findCategories } from '../../../actions/category';
import { findAll } from '../../../actions/events';
import { CustomHeader } from '../../../component/CustomHeader';
import styles from './styles';

function getEventThumbnail(event) {
  const url = event.images
    .filter(image => image.fileName.includes('thumbnail'))
    .reduce((list, image) => [...list, image.url], []);

  return url;
}

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [],
      categories: [],
      total: 0,
      search: '',
      params: {
        categories: [],
        sort: 'asc',
        page: 0,
        size: 20
      },
      isModalVisible: false
    };
  }

  ShowHideSearch = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  componentDidMount() {
    this.reload(this.state.params);
  }

  componentDidUpdate(prevProps) {
    const { data, categories } = this.props;
    if (prevProps.data !== data) {
      this.setState({
        categories: [...categories?.list],
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

  reload({ sort = 'asc', page = 0, categories = [] } = {}) {
    this.props.findAll({ sort, page, categories });
    this.props.findCategories();
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

  onSearchCategory = category => {
    const { params } = this.state;
    const categories = [...params.categories];
    const idx = categories.findIndex(id => id === category.id);
    idx !== -1 ? categories.splice(idx, 1) : categories.push(category.id);
    this.setState({
      ...this.state,
      params: {
        ...params,
        categories
      }
    });
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
      'EventDetail',
      item ? { id: item.id } : null
    );
  };

  _onStateChange = ({ open }) => this.setState({ open });

  toggleModal = () => {
    this.setState({
      ...this.state,
      isModalVisible: !this.state.isModalVisible
    });
  };

  onSearch = () => {
    const { params } = this.state;
    this.setState(
      {
        data: [],
        total: 0,
        params: { ...params, page: 0 },
        isModalVisible: !this.state.isModalVisible
      },
      () => this.reload(this.state.params)
    );
  };

  render() {
    const { navigation, loading } = this.props;
    const { data, categories, params } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="Event"
        />
        <SwipeListView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
          }
          data={data}
          renderItem={({ item }) => (
            <RowItem item={item} onPress={this.onShowForm} />
          )}
          keyExtractor={item => item.id.toString()}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
        />
        <FAB
          style={styles.fab}
          icon="filter"
          onStateChange={this._onStateChange}
          onPress={this.toggleModal}
        />
        <Modal
          transparent={true}
          animationType={'slide'}
          visible={this.state.isModalVisible}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Title>FILTER</Title>
                <FontAwesome5
                  name={'times'}
                  size={20}
                  style={{ paddingLeft: 220 }}
                  onPress={this.toggleModal}
                />
              </View>
              <List.Section>
                <List.Accordion
                  style={{ width: 250, marginRight: 70 }}
                  title="Search By Category"
                >
                  <ScrollView>
                    {categories.map((category, index) => (
                      <List.Item
                        key={index}
                        style={params.categories.map(c => {
                          if (c == category.id) {
                            return styles.isSelected;
                          }
                          return styles.category;
                        })}
                        title={category.name}
                        onPress={() => this.onSearchCategory(category)}
                      />
                    ))}
                  </ScrollView>
                </List.Accordion>
              </List.Section>
              <Button
                color="#b036ec85"
                mode="contained"
                icon="magnify"
                onPress={this.onSearch}
              >
                search
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

Event.propTypes = {
  categories: PropTypes.any,
  data: PropTypes.shape({
    page: PropTypes.any,
    total: PropTypes.any
  }),
  findAll: PropTypes.func,
  findCategories: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    this: PropTypes.shape({
      toggleModal: PropTypes.any
    })
  })
};

function RowItem({ onPress, item }) {
  const [image] = getEventThumbnail(item);
  return (
    <Card style={styles.card} onPress={() => onPress(item)}>
      <Card.Cover
        source={
          image
            ? { uri: image }
            : require('../../../../assets/images/screen/banner2.jpg')
        }
        style={styles.cardCover}
      />
      <View>
        <Card.Content style={styles.cardContent}>
          <View>
            <Title>{item.name}</Title>
            <View style={{ flexDirection: 'row' }}>
              <Button
                icon="calendar-range"
                color="#E233DB"
                style={styles.dateText}
              >
                {moment(item.startDate).format('MM/DD')}
              </Button>
            </View>
            <Button icon="map-marker" style={styles.buttonMap}>
              {item.location?.name || 'Location'}
            </Button>
          </View>
        </Card.Content>
      </View>
    </Card>
  );
}

RowItem.propTypes = {
  item: PropTypes.shape({
    endDate: PropTypes.any,
    location: PropTypes.any,
    name: PropTypes.any,
    startDate: PropTypes.any
  }),
  onPress: PropTypes.func
};

const mapStateToProps = state => ({
  categories: state.findCategories.data,
  data: state.events.data,
  loading: state.events.loading,
  error: state.events.error
});

const mapDispatchToProps = {
  findAll,
  findCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
