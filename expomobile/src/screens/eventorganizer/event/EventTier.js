import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { CustomHeader } from '../../../component/CustomHeader';
import { Surface } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class EventTier extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <CustomHeader navigation={navigation} title="Event Tier" />
        <View style={{ margin: 30, padding: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                height: 140,
                width: '55%',
                alignSelf: 'center',
                elevation: 4,
                marginVertical: 8,
                marginHorizontal: 8,
                borderRadius: 20,
                backgroundColor: '#8B4513',
                elevation: 18
              }}
              onPress={() =>
                navigation.navigate('AddEventEO', {
                  tier: 1,
                  maxCapacity: 40,
                  eventPrice: 50000
                })
              }
            >
              <Surface
                style={{
                  alignSelf: 'center',
                  marginVertical: '50%',
                  backgroundColor: '#8B4513'
                }}
              >
                {/* <FontAwesome5Icon
                  name="users"
                  style={{
                    color: '#FFF',
                    marginTop: -70,
                    alignSelf: 'center',
                    fontSize: 22
                  }}
                /> */}
                <Text
                  style={{
                    color: '#8B4513',
                    marginTop: 5,
                    alignSelf: 'center',
                    fontSize: 16,
                    marginTop: -60,
                    backgroundColor: '#FFF',
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  BRONZE
                </Text>
                <Text style={{ color: '#FFF', marginTop: 10 }}>
                  Max Capacity : 40
                </Text>
                <Text style={{ color: '#FFF' }}>Price : Rp 50.000</Text>
              </Surface>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 140,
                width: '55%',
                alignSelf: 'center',
                elevation: 4,
                marginVertical: 8,
                marginHorizontal: 8,
                borderRadius: 20,
                backgroundColor: '#C0C0C0'
              }}
              onPress={() =>
                navigation.navigate('AddEventEO', {
                  tier: 2,
                  maxCapacity: 100,
                  eventPrice: 100000
                })
              }
            >
              <Surface
                style={{
                  alignSelf: 'center',
                  marginVertical: '50%',
                  backgroundColor: '#C0C0C0'
                }}
              >
                <Text
                  style={{
                    color: '#C0C0C0',
                    marginTop: 5,
                    alignSelf: 'center',
                    fontSize: 16,
                    marginTop: -60,
                    backgroundColor: '#FFF',
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  SILVER
                </Text>
                <Text style={{ color: '#FFF', marginTop: 10 }}>
                  Max Capacity : 40
                </Text>
                <Text style={{ color: '#FFF' }}>Price : Rp 100.000</Text>
              </Surface>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',

              alignSelf: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                height: 140,
                width: '55%',
                alignSelf: 'center',
                elevation: 4,
                marginVertical: 8,
                marginHorizontal: 8,
                borderRadius: 20,
                backgroundColor: '#FFD700'
              }}
              onPress={() =>
                navigation.navigate('AddEventEO', {
                  tier: 3,
                  maxCapacity: 500,
                  eventPrice: 300000
                })
              }
            >
              <Surface
                style={{
                  alignSelf: 'center',
                  marginVertical: '50%',
                  backgroundColor: '#FFD700'
                }}
              >
                <Text
                  style={{
                    color: '#FFD700',
                    marginTop: 5,
                    alignSelf: 'center',
                    fontSize: 16,
                    marginTop: -60,
                    backgroundColor: '#FFF',
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  GOLD
                </Text>
                <Text style={{ color: '#FFF', marginTop: 10 }}>
                  Max Capacity : 500
                </Text>
                <Text style={{ color: '#FFF' }}>Price : Rp 300.000</Text>
              </Surface>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 140,
                width: '55%',
                alignSelf: 'center',
                elevation: 4,
                marginVertical: 8,
                marginHorizontal: 8,
                borderRadius: 20,
                backgroundColor: '#E5E4E2'
              }}
              onPress={() =>
                navigation.navigate('AddEventEO', {
                  tier: 4,
                  maxCapacity: 1000,
                  eventPrice: 1000000
                })
              }
            >
              <Surface
                style={{
                  alignSelf: 'center',
                  marginVertical: '50%',
                  backgroundColor: '#E5E4E2'
                }}
              >
                <Text
                  style={{
                    color: '#696969',
                    marginTop: 5,
                    alignSelf: 'center',
                    fontSize: 16,
                    marginTop: -60,
                    backgroundColor: '#FFF',
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  PLATINUM
                </Text>
                <Text style={{ color: '#000', marginTop: 20 }}>
                  Max Capacity : 1000
                </Text>
                <Text style={{ color: '#000' }}>Price : Rp 1.000.000</Text>
              </Surface>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

EventTier.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};
