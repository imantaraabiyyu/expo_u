import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import MapView, { Marker } from 'react-native-maps';
import { Button, Card, List, Paragraph, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { findById } from '../../../actions/events';
import { CustomHeader } from '../../../component/CustomHeader';
import styles from './styles';
class EventDetail extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.state = {
      id: route.params?.id,
      name: '',
      user: '',
      location: '',
      description: '',
      startDate: '',
      endDate: '',
      time: '',
      capacity: '',
      pricings: [],
      categories: [],
      organizer: [],
      imageUrl: '',
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      expanded: true
    };
  }

  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.findById(this.state.id);
    }
  }

  onRegionChange = region => {
    this.setState({ region });
  };

  _handlePress = () =>
    this.setState({ ...this.state, expanded: !this.state.expanded });

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setState({ ...data });

      this.setState({
        region: {
          ...this.state.region,
          longitude: parseFloat(data.location.longitude),
          latitude: parseFloat(data.location.latitude)
        }
      });

      const [url] = this.getEventThumbnail(data.images);
      this.setState({ imageUrl: url });
    }
  }

  getEventThumbnail(images) {
    const url = images
      .filter(image => image.fileName.includes('thumbnail'))
      .reduce((list, image) => [...list, image.url], []);

    return url;
  }

  render() {
    const { navigation, loading } = this.props;
    const {
      id,
      name,
      user,
      categories,
      description,
      endDate,
      startDate,
      time,
      imageUrl,
      location,
      region,
      organizer,
      pricings: pricing
    } = this.state;

    return (
      <View style={styles.background}>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="Event Detail"
        />
        <ScrollView>
          <Card.Cover
            source={
              imageUrl
                ? { uri: imageUrl }
                : require('../../../../assets/images/screen/banner2.jpg')
            }
            style={styles.cardCover}
          />
          <View style={styles.card}>
            <View>
              <View style={styles.cardContent}>
                {loading ? (
                  <BarIndicator
                    color="#9400D3"
                    style={{
                      marginVertical: '50%',
                      marginHorizontal: '50%',
                      zIndex: 1,
                      position: 'absolute'
                    }}
                  />
                ) : null}
                <View>
                  <Title style={styles.margin}>{name}</Title>
                  <View style={styles.row}>
                    <Button
                      icon="map-marker"
                      style={styles.buttonMap}
                      color={'#9400D3'}
                    >
                      {location?.name || 'Location'}
                    </Button>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20
                    }}
                  >
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <Button
                          icon="calendar-range"
                          color="#9400D3"
                          style={styles.dateText}
                        >
                          {moment(startDate).format('MM/DD')}
                        </Button>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Button
                          icon="clock"
                          color="#9400D3"
                          style={styles.dateText}
                        >
                          {moment().format('LTS')}
                        </Button>
                      </View>
                    </View>
                    <View style={styles.margin}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 15
                        }}
                      >
                        Categories
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        {categories.map((category, index) => (
                          <Button
                            key={index}
                            mode="contained"
                            color="#9400D3"
                            style={{ borderRadius: 10, marginTop: 5 }}
                          >
                            {category.name}
                          </Button>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 30 }}>
                    <Text
                      style={{
                        marginHorizontal: 15,
                        fontWeight: 'bold',
                        fontSize: 15
                      }}
                    >
                      Description
                    </Text>
                    <Paragraph style={styles.margin}>
                      {description.length < 1000
                        ? description
                        : description.substr(0, 1000) + '...'}
                    </Paragraph>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <Card>
                <MapView
                  style={{
                    height: 200,
                    width: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginVertical: 5
                  }}
                  region={region}
                >
                  <Marker
                    coordinate={region}
                    pinColor={'purple'}
                    title={location.name}
                    description={name}
                  />
                </MapView>
              </Card>
            </View>
            <List.Section title="Pricing">
              {pricing.map((ticket, index) => (
                <List.Accordion
                  key={index}
                  title={ticket.name}
                  left={props => <List.Icon {...props} icon="ticket-percent" />}
                >
                  <List.Item title={ticket.codename} />
                  <List.Item title={ticket.description} />
                </List.Accordion>
              ))}
            </List.Section>
            <View
              style={{
                marginVertical: 20,
                backgroundColor: '#9400D3',
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 10
              }}
            >
              <Title style={{ fontSize: 15, color: '#fff' }}>ORGANIZER</Title>
              <Text style={{ fontSize: 15, color: '#fff' }}>
                {organizer.name}
              </Text>
              <Text style={{ fontSize: 15, color: '#fff' }}>
                {organizer.address}
              </Text>
            </View>
            <Button
              style={styles.buttonPay}
              color="#fff"
              onPress={() =>
                navigation.navigate('EventPayment', id ? { id: id } : null)
              }
            >
              Buy
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

EventDetail.propTypes = {
  data: PropTypes.any,
  findById: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  route: PropTypes.shape({
    params: PropTypes.any
  })
};

const mapStateToProps = state => ({
  data: state.eventById.data,
  loading: state.eventById.loading,
  error: state.eventById.error
});

const mapDispatchToProps = {
  findById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
