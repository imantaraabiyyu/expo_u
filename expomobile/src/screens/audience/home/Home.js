import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Surface, Title } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { CustomHeader } from '../../../component/CustomHeader';
import { findAll } from '../../../actions/events';
import styles from './styles';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

class Home extends Component {
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
        size: 10
      },
      imageBanner: []
    };
  }

  componentDidMount() {
    this.reload(this.state.params);
  }

  componentDidUpdate(prevProps) {
    const { data, error } = this.props;

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
      this.getImageBanner(data);
    } else if (error && prevProps.error !== error) {
      console.error(error);
    }
  }

  reload({ search, sort = 'asc', page = 0 } = {}) {
    this.props.findAll({ search: { name: search }, sort, page });
  }

  getImageBanner(data) {
    let imageBannerData = data.list
      .filter(event => event.eventTier === 1)
      .reduce(
        (arr, event) => [
          ...arr,
          ...event.images
            .filter(image => image.fileName.includes('thumbnail'))
            .reduce((list, image) => [...list, image.url], [])
        ],
        []
      );
    this.setState({ imageBanner: imageBannerData });
  }

  getEventThumbnail(event) {
    const url = event.images
      .filter(image => image.fileName.includes('thumbnail'))
      .reduce((list, image) => [...list, image.url], []);

    return url;
  }

  render() {
    const { navigation } = this.props;
    const { data, imageBanner, event } = this.state;

    return (
      <ScrollView style={{ backgroundColor: '#FFF' }}>
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
            <SliderBox
              images={imageBanner}
              dotColor="#FFEE58"
              imageLoadingColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              onCurrentImagePressed={() => navigation.navigate(`Event`)}
              style={styles.slider}
              circleLoop
            />
          </LinearGradient>
          <Title
            style={{
              alignSelf: 'center',
              fontSize: 15,
              marginTop: -50,
              color: '#fff'
            }}
          >
            Concert Fundraising for Covid 19
          </Title>
          <Card style={styles.card}>
            <View style={styles.body}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}
              >
                Hey there, going anywhere?
              </Text>
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
                    onPress={() => navigation.navigate('Event')}
                  />
                  <Text style={styles.fontSize}>Promo</Text>
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
                <Surface style={styles.surface}>
                  <FontAwesome5
                    name={'wallet'}
                    size={35}
                    color={'#575FA8'}
                    onPress={() => navigation.navigate('WalletUser')}
                  />
                  <Text style={styles.fontSize}>Wallet</Text>
                </Surface>
              </View>
              <View style={styles.menu} />
            </View>
          </Card>
          <Text
            style={{
              fontSize: 16,
              alignSelf: 'center',
              fontWeight: 'bold',
              marginVertical: 20
            }}
          >
            New Events
          </Text>
          <ScrollView horizontal>
            <View style={styles.row}>
              {data.map((event, index) => {
                const [image] = this.getEventThumbnail(event);
                return (
                  <View key={index} style={styles.imageEvent}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('EventDetail')}
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
                      <Text
                        style={{
                          fontSize: 16,
                          alignSelf: 'center',
                          fontWeight: 'bold'
                        }}
                      >
                        {event.name}
                      </Text>
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
Home.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  findAll: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

const mapStateToProps = state => ({
  data: state.events.data,
  loading: state.events.loading,
  error: state.events.error
});

const mapDispatchToProps = {
  findAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
