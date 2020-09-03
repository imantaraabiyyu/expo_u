import PropTypes from 'prop-types';
import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import CustomHeader from '../../../component/CustomHeader/CustomHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { findById } from '../../../actions/events';
import EventTier from './EvenTier';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

class EventsList extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;
    this.state = {
      id: route.params?.id,
      name: '',
      startDate: '',
      endDate: '',
      startTime: '',
      location: '',
      capacity: '',
      pricings: [],
      eventStatus: '',
      audienceTier: '',
      eventTier: '',
      description: ''
    };
  }
  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.findById(this.state.id);
    }
  }
  componentDidUpdate(prevProps) {
    const { data, error } = this.props;

    if (prevProps.data !== data) {
      this.setState({ ...data });
    } else if (error && prevProps.error !== error) {
      console.log(error);
    }
  }
  onShowTicket = ticket => {
    this.props.navigation.navigate(
      'TicketList',
      ticket ? { id: ticket.id } : null
    );
  };

  render() {
    const { navigation } = this.props;
    const {
      name,
      startDate,
      endDate,
      location,
      startTime,
      capacity,
      eventTier,
      pricings,
      description
    } = this.state;
    console.log('Time', startTime, description);

    return (
      <View>
        <CustomHeader navigation={navigation} title="Events Detail" />
        <ScrollView style={{ backgroundColor: '#fff' }}>
          <View
            style={{
              marginTop: 30,
              marginBottom: 160,
              width: 380,
              alignSelf: 'center',
              borderRadius: 20
            }}
          >
            <Card style={{ marginBottom: 60 }}>
              <Card.Cover
                style={{ resizeMode: 'strecth' }}
                source={require('../../../../assets/images/screen/banner2.jpg')}
              />
              <View
                style={{
                  marginTop: 20,
                  marginRight: -60,
                  alignSelf: 'flex-end'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: 200
                  }}
                >
                  <EventTier tier={eventTier} />

                  <FontAwesome
                    name="user-friends"
                    style={{ marginLeft: 5, fontSize: 15 }}
                  />
                  <Text style={{ marginLeft: 5 }}>{capacity}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.title}>{name}</Text>
              </View>
              <View style={styles.description}>
                <FontAwesome name="map-marker-alt" style={styles.descIcon} />
                <Text style={styles.descText}>
                  {location?.name || 'Location'}
                </Text>
              </View>
              <View style={styles.description}>
                <FontAwesome name="calendar-alt" style={styles.descIcon} />
                <Text style={styles.descText}>
                  {moment(startDate).format('MM/DD/YY')}
                </Text>
                <Text style={styles.descText}>-</Text>
                <Text style={styles.descText}>
                  {moment(endDate).format('MM/DD/YY')}
                </Text>
              </View>
              <View style={styles.description}>
                <FontAwesome name="clock" style={styles.descIcon} />
                <Text style={styles.descText}>
                  {moment(startTime).format('LTS')}
                </Text>
              </View>
              {/* <View style={styles.description}>
                <FontAwesome name="tags" style={styles.descIcon} />
                <List.Section
                  title="Pricings"
                  style={{ marginTop: -15, color: '#000000' }}
                />
              </View> */}
              <View style={styles.description}>
                <FontAwesome name="list" style={styles.descIcon} />
                <Text style={{ flexWrap: 'wrap', marginLeft: 10 }}>
                  {description}
                </Text>
              </View>
              <View style={styles.description}>
                <FontAwesome name="tags" style={styles.descIcon} />
                <Text style={styles.descText}>Ticket</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {pricings.map((ticket, index) => (
                  <TouchableOpacity key={index} onPress={this.onShowTicket}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginHorizontal: 15,
                        marginBottom: 20,
                        backgroundColor: '#9000D3',
                        width: 100,
                        height: 50,
                        borderRadius: 20
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          marginTop: 10
                        }}
                      >
                        <FontAwesome
                          name="ticket-alt"
                          style={{
                            alignSelf: 'center',
                            color: '#FFF',
                            fontSize: 20
                          }}
                        />
                        <Text
                          style={{
                            alignSelf: 'center',
                            marginTop: 5,
                            color: '#FFF',
                            marginLeft: 10
                          }}
                        >
                          {ticket.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* {pricings.map((ticket, index) => (
                <List.Accordion
                  style={{ marginTop: -10, width: 280, height: 45 }}
                  key={index}
                  title={ticket.name}
                  left={props => (
                    <List.Icon
                      style={{ color: '#000000' }}
                      {...props}
                      icon="ticket-percent"
                    />
                  )}
                >
                  <List.Item title={ticket.name} />
                  <List.Item title={ticket.description} />
                  <List.Item title={ticket.id} onPress={this.onShowTicket} />
                </List.Accordion>
              ))} */}
              {/* <View>
                {pricings.map(ticket => (
                  <Button>
                    <FontAwesome
                      name="ticket-alt"
                      style={{
                        color: '#FFF',
                        fontSize: 16,
                        marginLeft: 15
                      }}
                    />
                    <Text
                      style={{ color: '#FFF', fontSize: 16, marginRight: 60 }}
                    >
                      {ticket.name}
                    </Text>
                  </Button>
                ))}
              </View> */}
            </Card>
            {/* <View style={{}}>
              <Button
                style={{
                  borderRadius: 40,
                  marginTop: -40,
                  marginRight: 20,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  backgroundColor: '#9000d3',
                  alignSelf: 'flex-end',
                  flexDirection: 'row'
                }}
              >
                <FontAwesome5Icon
                  name="vector-square"
                  style={{ fontSize: 22, color: '#FFF' }}
                />
              </Button>
            </View> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

EventsList.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.any,
  route: PropTypes.shape({
    params: PropTypes.any
  })
};
const mapStateToProps = state => ({
  data: state.eventById.data,
  loading: state.eventById.loading,
  error: state.eventById.error
});

const mapDispatchProps = {
  findById
};
export default connect(
  mapStateToProps,
  mapDispatchProps
)(EventsList);
