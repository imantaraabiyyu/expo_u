import { Icon, Item, Label, Picker } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View, Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';
import GetLocation from 'react-native-get-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import {
  Button,
  Card,
  TextInput,
  Title,
  List,
  Surface,
  HelperText
} from 'react-native-paper';
import { connect } from 'react-redux';
import { save } from '../../../actions/events';
import CustomHeader from '../../../component/CustomHeader/CustomHeader';
import FilePicker from './inputPicker/FilePicker';
import { findCategories } from '../../../actions/category';
import ImageInput from './inputPicker/ImageInput';
import styles from './style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextInputMask from 'react-native-text-input-mask';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { showError } from '../../../utils/toast';
class AddEvent extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.state = {
      name: '',
      description: '',
      startTime: Date.now(),
      endTime: Date.now(),
      tier: route.params?.tier,
      maxCapacity: route.params?.maxCapacity,
      capacity: 0,
      eventPrice: route.params?.eventPrice,
      startDate: new Date(),
      endDate: new Date(),
      registrationStartDate: new Date(),
      registrationEndDate: new Date(),
      addTicket: {
        name: '',
        codename: '',
        stock: 0,
        price: ''
      },
      categoriesList: [],
      categories: [],
      pricings: [],
      location: {
        name: '',
        longitude: '',
        latitude: ''
      },
      eventTier: '',
      region: {
        latitude: -6.0886599,
        longitude: 106.972825,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      isModalVisible: false,
      showStartTime: false,
      nameError: false,
      descriptionError: false
    };
  }

  componentDidMount() {
    this.props.findCategories();
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true
    })
      .then(location => {
        const { region } = this.state;
        this.setState({
          ...this.state,
          location: {
            name: 'Current Location',
            longitude: location.longitude,
            latitude: location.latitude
          },
          region: {
            ...region,
            longitude: location.longitude,
            latitude: location.latitude
          }
        });
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }

  toggleModal = () => {
    this.setState({
      ...this.state,
      isModalVisible: !this.state.isModalVisible
    });
  };

  onChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  onTimeChange = (name, value) => {
    console.log(value.value);
    this.setState({
      ...this.state,
      showStartTime: false,
      showEndTime: false,
      [name]: value.nativeEvent.timestamp
    });
  };

  componentDidUpdate(prevProps) {
    const { navigation, data, error, categoriesList } = this.props;

    if (prevProps.categoriesList !== categoriesList) {
      this.setState({
        ...this.state,
        categoriesList: [...categoriesList?.list]
      });
    }
    if (prevProps.data !== data) {
      navigation.goBack();
    }

    if (error && prevProps.error !== error) {
      showError(error);
    }
  }

  onSubmit = () => {
    const {
      startDate,
      endDate,
      registrationStartDate,
      registrationEndDate,
      startTime,
      endTime,
      name,
      description,
      pricings,
      categories,
      location,
      tier,
      capacity,
      eventPrice
    } = this.state;
    const organizer = { id: this.props.userData?.profileId };
    if (name.length >= 5 && description.length >= 5) {
      this.props.navigation.navigate('EventPayment', {
        data: {
          startDate,
          organizer,
          endDate,
          registrationStartDate,
          registrationEndDate,
          startTime,
          endTime,
          name,
          description,
          pricings,
          categories,
          location,
          tier,
          capacity,
          eventPrice
        }
      });
    } else if (name.length <= 5 && description.length <= 5) {
      this.setState({ ...this.state, nameError: true, descriptionError: true });
    } else if (name.length <= 5) {
      this.setState({ ...this.state, nameError: true });
    } else if (description.length <= 5) {
      this.setState({ ...this.state, descriptionError: true });
    }
  };

  onAddTicketChange = (name, value) => {
    const { addTicket } = this.state;
    this.setState({
      ...this.state,
      addTicket: { ...addTicket, [name]: value }
    });
  };

  onAddTicket = () => {
    const { addTicket, pricings, maxCapacity, capacity } = this.state;

    if (addTicket.stock <= maxCapacity) {
      this.setState(
        {
          ...this.state,
          pricings: [...pricings, addTicket],
          maxCapacity: maxCapacity - addTicket.stock,
          capacity: parseInt(capacity + addTicket.stock)
        },
        this.toggleModal
      );
    }
  };

  onRemoveTicket = ticket => {
    const { pricings } = this.state;

    const removeTicket = pricings.filter(t => {
      return t !== ticket;
    });

    this.setState({
      ...this.state,
      pricings: removeTicket
    });
    console.log(pricings);
  };

  showStartTimePicker = () => {
    this.setState({
      ...this.state,
      showStartTime: !this.state.showStartTime
    });
  };

  showEndTimePicker = () => {
    this.setState({
      ...this.state,
      showEndTime: !this.state.showEndTime
    });
  };

  onSearchCategory = category => {
    const { categories } = this.state;
    const currentCategories = [...categories];
    const idx = currentCategories.findIndex(id => id === category.id);
    idx !== -1
      ? currentCategories.splice(idx, 1)
      : currentCategories.push(category);
    this.setState({
      ...this.state,
      categories: currentCategories
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      startDate,
      nameError,
      descriptionError,
      endDate,
      registrationStartDate,
      registrationEndDate,
      region,
      showStartTime,
      showEndTime,
      startTime,
      endTime,
      pricings,
      categoriesList,
      categories,
      tier,
      addTicket,
      maxCapacity,
      capacity,
      eventPrice
    } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <CustomHeader
          navigation={navigation}
          title="New Event"
          eventTier={tier}
          showRightButton={true}
        />
        <View />
        <View style={styles.inputBox}>
          <ImageInput />
          <View>
            <TextInput
              mode="outlined"
              label="Event Name"
              onChangeText={value => this.onChange('name', value)}
            />
            <HelperText
              type="error"
              style={{ width: '80%' }}
              visible={nameError}
            >
              name cannot be less than a word
            </HelperText>
          </View>
          <View>
            <TextInput
              mode="outlined"
              label="Description"
              numberOfLines={5}
              onChangeText={value => this.onChange('description', value)}
            />
            <HelperText
              type="error"
              style={{ width: '80%' }}
              visible={descriptionError}
            >
              description cannot be less than a word
            </HelperText>
          </View>
          <View>
            <List.Section>
              <List.Accordion
                style={{ width: '100%', marginRight: 70 }}
                title="Add Category"
              >
                <ScrollView>
                  {categoriesList.map((category, index) => (
                    <List.Item
                      key={index}
                      style={categories.map(c => {
                        if (c.id == category.id) {
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
          </View>
          <Text style={styles.date}> Select Date </Text>
          <View style={styles.datepicker}>
            <DatePicker
              style={{ width: 160 }}
              placeholder="Start"
              date={this.state.startDate}
              mode="date"
              format="YYYY-MM-DD"
              minDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  fontSize: 2
                }
              }}
              onDateChange={value => this.onChange('startDate', value)}
            />
            <Text style={{ marginTop: 10 }}> - </Text>
            <DatePicker
              style={{ width: 160 }}
              placeholder="End"
              date={this.state.endDate}
              mode="date"
              format="YYYY-MM-DD"
              minDate={startDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  fontSize: 2
                }
              }}
              onDateChange={value => this.onChange('endDate', value)}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Button style={{ width: '50%' }}>
                <Text>Start Time</Text>
              </Button>
              <Button style={{ width: '50%' }}>
                <Text>End Time</Text>
              </Button>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button
                style={{ width: '50%' }}
                onPress={this.showStartTimePicker}
              >
                {moment(startTime).format('LT')}
              </Button>
              <Button style={{ width: '50%' }} onPress={this.showEndTimePicker}>
                {moment(endTime).format('LT')}
              </Button>
            </View>

            {showStartTime && (
              <DateTimePicker
                timeZoneOffsetInMinutes={0}
                value={startTime}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={value => this.onTimeChange('startTime', value)}
              />
            )}
            {showEndTime && (
              <DateTimePicker
                timeZoneOffsetInMinutes={0}
                value={endTime}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={value => this.onTimeChange('endTime', value)}
              />
            )}
          </View>
          <Text style={styles.date}> Registration Date </Text>
          <View style={styles.datepicker}>
            <DatePicker
              style={{ width: 160 }}
              placeholder="Start"
              date={registrationStartDate}
              mode="date"
              format="YYYY-MM-DD"
              minDate={new Date()}
              maxDate={endDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  fontSize: 2
                }
              }}
              onDateChange={value =>
                this.onChange('registrationStartDate', value)
              }
            />
            <Text style={{ marginTop: 10 }}> - </Text>
            <DatePicker
              style={{ width: 160 }}
              placeholder="End"
              date={registrationEndDate}
              mode="date"
              format="YYYY-MM-DD"
              minDate={registrationStartDate}
              maxDate={endDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  fontSize: 2
                }
              }}
              onDateChange={value =>
                this.onChange('registrationEndDate', value)
              }
            />
          </View>
          <Surface style={styles.surface}>
            <Title style={{ alignSelf: 'center' }}>Tickets {capacity}</Title>
            <Title style={{ alignSelf: 'center', fontSize: 11 }}>
              Remaining capacity: {maxCapacity}
            </Title>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                flexWrap: 'wrap'
              }}
            >
              {pricings.map((ticket, index) => (
                <Button
                  key={index}
                  icon="ticket"
                  onPress={() => this.onRemoveTicket(ticket)}
                  style={{ width: '30%', margin: 5, flexDirection: 'column' }}
                  mode="contained"
                >
                  {ticket.codename}
                </Button>
              ))}
            </View>
          </Surface>
          <Button
            icon="ticket"
            onPress={this.toggleModal}
            style={{ width: '80%', alignSelf: 'center' }}
            mode="contained"
          >
            Add Ticket
          </Button>

          <SafeAreaView style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={2}
              autoFocus={false}
              returnKeyType={'search'}
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed="auto" // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                console.log(details);
                fetch(
                  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
                    data.place_id
                  }&fields=name,rating,formatted_phone_number,geometry&key=AIzaSyB7jbVjgBd0Ueyn49tj0Zzgp0EsRrHwJgQ`,
                  {
                    method: 'GET'
                  }
                )
                  .then(response => response.json())
                  .then(responseJson => {
                    this.setState({
                      ...this.state,
                      location: {
                        name: responseJson?.result.name,
                        longitude: responseJson?.result.geometry.location.lat,
                        latitude: responseJson?.result.geometry.location.lng
                      },
                      region: {
                        ...region,
                        latitude: responseJson?.result.geometry.location.lat,
                        longitude: responseJson?.result.geometry.location.lng
                      }
                    });
                    console.log(responseJson.result.geometry.location.lat);
                    console.log(this.state.region);
                  })
                  .catch(error => {
                    console.error(error);
                  });
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0
                },
                textInput: {
                  margin: 10,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                }
              }}
              getDefaultValue={() => ''}
              query={{
                key: 'AIzaSyB7jbVjgBd0Ueyn49tj0Zzgp0EsRrHwJgQ',
                language: 'en',
                types: 'geocode'
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                type: 'cafe'
              }}
              GooglePlacesDetailsQuery={{
                fields: 'formatted_address'
              }}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3'
              ]}
              debounce={200}
              renderRightButton={() => (
                <Icon
                  style={{ marginTop: 15 }}
                  type="EvilIcons"
                  name="location"
                />
              )}
            />
          </SafeAreaView>
          <Card style={{ margin: 15 }}>
            <MapView
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
              region={region}
            >
              <Marker coordinate={region} pinColor={'purple'} />
            </MapView>
          </Card>
          <Modal
            transparent={true}
            animationType={'slide'}
            visible={this.state.isModalVisible}
          >
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                <View
                  style={{ flexDirection: 'row', marginTop: 10, padding: 15 }}
                >
                  <Title>Add Ticket</Title>
                  <FontAwesome5Icon
                    name={'times'}
                    size={20}
                    style={{ paddingLeft: 220 }}
                    onPress={this.toggleModal}
                  />
                </View>
                <TextInput
                  style={{ width: '80%' }}
                  mode="outlined"
                  label="name"
                  onChangeText={value => this.onAddTicketChange('name', value)}
                />
                <TextInput
                  style={{ width: '80%' }}
                  mode="outlined"
                  label="codename"
                  autoCapitalize="characters"
                  maxLength={3}
                  onChangeText={value =>
                    this.onAddTicketChange('codename', value)
                  }
                />

                <TextInput
                  style={{ width: '80%' }}
                  mode="outlined"
                  label="stock"
                  maxLength={4}
                  keyboardType="number-pad"
                  onChangeText={value =>
                    this.onAddTicketChange(
                      'stock',
                      value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')
                    )
                  }
                />
                <HelperText
                  type="error"
                  style={{ width: '80%' }}
                  visible={addTicket.stock > maxCapacity}
                >
                  Stock cannot be more than max capacity, remaining capacity:
                  {maxCapacity}
                </HelperText>

                <TextInput
                  style={{ width: '80%' }}
                  mode="outlined"
                  label="price"
                  onChangeText={value =>
                    this.onAddTicketChange('price', value.replace(/\D/g, ''))
                  }
                  render={props => (
                    <TextInputMask {...props} mask="Rp[00].[000].[000]" />
                  )}
                />

                <Button
                  color="#b036ec85"
                  mode="contained"
                  icon="plus"
                  style={{ margin: 15 }}
                  onPress={this.onAddTicket}
                >
                  Add
                </Button>
              </View>
            </View>
          </Modal>
        </View>
        <View />
        <View style={styles.buttonAdd}>
          <Button
            mode="contained"
            onPress={this.onSubmit}
            style={styles.addButton}
          >
            Add New Event
          </Button>
        </View>
      </ScrollView>
    );
  }
}

AddEvent.propTypes = {
  categoriesList: PropTypes.any,
  data: PropTypes.any,
  error: PropTypes.any,
  findCategories: PropTypes.func,
  navigation: PropTypes.shape({
    goBack: PropTypes.func
  }),
  route: PropTypes.shape({
    params: PropTypes.any
  }),
  save: PropTypes.func,
  userData: PropTypes.any
};

const mapStateToProps = state => ({
  categoriesList: state.findCategories.data,
  userData: state.auth.data,
  data: state.savedEvent.data,
  loading: state.savedEvent.loading,
  error: state.savedEvent.error
});

const mapDispatchToProps = {
  save,
  findCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent);
