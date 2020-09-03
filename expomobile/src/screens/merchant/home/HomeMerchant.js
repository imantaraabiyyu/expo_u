import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, Surface, Title } from 'react-native-paper';
import { findById } from '../../../actions/merchants';
import { findAll } from '../../../actions/events';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Text, Image, ScrollView, View } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { CustomHeader } from '../../../component/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import {
  TouchableOpacity,
  TouchableHighlight
} from 'react-native-gesture-handler';

class HomeMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      photo: '',
      data: [],
      total: 0,
      search: '',
      params: {
        search: '',
        sort: 'desc',
        page: 0,
        size: 10
      },
      imageBanner: []
    };
  }

  componentDidMount() {
    const { userData } = this.props;
    this.setState({ ...this.state, id: userData.id, photo: userData.photo });
    this.reload(this.state.params);
  }

  componentDidUpdate(prevProps) {
    const { data, dataMerchant, errorMerchant, error } = this.props;
    if (prevProps.data !== data) {
      this.setState({
        ...this.state,
        data: [...this.state.data, ...data?.list],
        total: data.total,
        search: this.state.params.search,
        params: {
          ...this.state.params,
          page: data.page
        }
      });
    } else if (
      prevProps.dataMerchant !== dataMerchant &&
      prevProps.data != data
    ) {
      this.setState({ ...this.state, ...dataMerchant });
    } else if (errorMerchant && prevProps.errorMerchant !== errorMerchant) {
      console.log('error merchant');
    } else if (error && prevProps.error !== error) {
      console.log('error events');
    }
  }

  reload({ search, sort = 'asc', page = 0 } = {}) {
    this.props.findAll({ search: { name: search }, sort, page });
    this.props.findById(this.props.userData.profileId);
  }

  getEventThumbnail(event) {
    const url = event.images
      .filter(image => image.fileName.includes('thumbnail'))
      .reduce((list, image) => [...list, image.url], []);

    return url;
  }
  render() {
    const { navigation, dataMerchant } = this.props;
    const { photo, data } = this.state;
    console.log(data, 'data');

    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.backgroundColor}>
          <CustomHeader
            style={{ position: 'absolute' }}
            navigation={navigation}
            title="expo U"
            hideLeftButton={true}
          />
          <LinearGradient
            colors={['#9400D3', '#bd1ccc', '#192f6a']}
            style={styles.viewSlider}
          >
            <Image
              style={{
                width: 120,
                height: 120,
                borderRadius: 65,
                marginTop: 5,
                borderWidth: 5,
                borderColor: '#FFF',
                alignSelf: 'center'
              }}
              source={
                photo
                  ? { uri: photo }
                  : require('../../../../assets/images/screen/logoEO.jpg')
              }
            />
            <Text
              style={{
                color: '#FFF',
                alignSelf: 'center',
                marginTop: 5,
                fontSize: 22,
                fontWeight: 'bold'
              }}
            >
              {dataMerchant?.name}
            </Text>
            <Text
              style={{
                color: '#bbb',
                alignSelf: 'center',
                fontSize: 15
              }}
            >
              {dataMerchant?.description}
            </Text>
          </LinearGradient>
          <Card style={styles.card}>
            <View style={styles.body}>
              <Text style={styles.title}>Hey there, going to join event?</Text>
              <View style={styles.menu}>
                <Surface style={styles.surface}>
                  <SimpleLineIcons
                    name={'event'}
                    size={35}
                    color={'#80DC69'}
                    onPress={() => navigation.navigate('Event')}
                  />
                  <Text style={styles.fontSize}>Events</Text>
                </Surface>
                <Surface style={styles.surface}>
                  <FontAwesome5
                    name={'money-check-alt'}
                    size={35}
                    color={'#73BFEA'}
                    onPress={() => navigation.navigate('Submission')}
                  />
                  <Text style={styles.fontSize}>Submission</Text>
                </Surface>
                <Surface style={styles.surface}>
                  <FontAwesome5
                    name={'map-marked-alt'}
                    size={35}
                    color={'#9A87E9'}
                    onPress={() => navigation.navigate('Event')}
                  />
                  <Text style={styles.fontSize}>Near</Text>
                </Surface>
              </View>
              <View style={styles.menu} />
            </View>
          </Card>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 15
            }}
          >
            New Events
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.row}>
              {data.map((event, index) => {
                const [image] = this.getEventThumbnail(event);
                return (
                  <View key={index} style={styles.imageEvent}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Event')}
                    >
                      <Image
                        source={
                          image
                            ? { uri: image }
                            : require('../../../../assets/images/screen/banner2.jpg')
                        }
                        style={styles.image}
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.center}>{event.name}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

HomeMerchant.propTypes = {
  findById: PropTypes.any,
  profileId: PropTypes.any,
  findAll: PropTypes.func,
  data: PropTypes.any,
  dataMerchant: PropTypes.any,
  error: PropTypes.any,
  errorMerchant: PropTypes.any,
  findByStatusOnProgress: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  route: PropTypes.any,
  userData: PropTypes.shape({
    id: PropTypes.any,
    photo: PropTypes.any
  })
};
const mapStateToProps = state => ({
  userData: state.auth.data,

  dataMerchant: state.merchantById.data,
  loadingMerchant: state.merchantById.loading,
  errorMerchant: state.merchantById.error,

  data: state.events.data,
  loading: state.events.loading,
  error: state.events.error
});

const mapDispatchProps = {
  findById,
  findAll
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(HomeMerchant);
