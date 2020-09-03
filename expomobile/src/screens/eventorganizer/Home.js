import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import { Surface, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { findById } from '../../actions/eventorganizers';
import {
  findByStatusDone,
  findByStatusOnProgress,
  findByStatusOnSchedule
} from '../../actions/events';
import CustomHeader from '../../component/CustomHeader/CustomHeader';
import styles from './style';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      photo: '',
      data: '',
      totalOnSchedule: 0,
      totalOnProgress: 0,
      totalDone: 0,
      params: {
        sort: 'asc',
        page: 0
      }
    };
  }

  componentDidMount() {
    const { id, profileId } = this.props.userData;

    if (id) {
      this.props.findByStatusOnSchedule({ id });
      this.props.findByStatusOnProgress({ id });
      this.props.findByStatusDone({ id });
    }
    if (profileId) {
      this.props.findById({ profileId });
    }
  }

  componentDidUpdate(prevProps) {
    const { dataSchedule, dataProgress, dataDone, data, userData } = this.props;
    console.log(userData);
    if (prevProps.data !== data) {
      this.setState({ ...data });
      this.setState({ photo: userData.photo });
    }
    if (prevProps.dataSchedule !== dataSchedule) {
      this.setState({ ...this.state, totalOnSchedule: dataSchedule?.total });
    }
    if (prevProps.dataProgress !== dataProgress) {
      this.setState({ ...this.state, totalOnProgress: dataProgress?.total });
    }
    if (prevProps.dataDone !== dataDone) {
      this.setState({ ...this.state, totalDone: dataDone?.total });
    }
  }

  reload() {
    this.props.findById;
    this.props.findByStatusOnProgress;
    this.props.findByStatusOnSchedule;
    this.props.findByStatusDone;
  }

  onRefresh = () => {
    this.setState(() => this.reload(this.state));
  };

  render() {
    const { navigation, authLoading, loading } = this.props;
    const {
      name,
      photo,
      totalOnSchedule,
      totalOnProgress,
      totalDone
    } = this.state;
    console.log(totalOnSchedule, totalOnProgress, totalDone);
    console.log('data ok', name);
    console.log('photo :', photo);

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
        }
        style={{ backgroundColor: '#FFF' }}
      >
        <CustomHeader
          navigation={navigation}
          title="Expo U"
          hideLeftButton={true}
        />
        <LinearGradient
          colors={['#9400D3', '#bd1ccc', '#192f6a']}
          style={styles.first}
        >
          <Image
            style={{
              width: 110,
              height: 110,
              borderRadius: 65,
              marginTop: 5,
              borderWidth: 5,
              borderColor: '#FFF',
              alignSelf: 'center',
              marginBottom: 10
            }}
            source={
              photo != 'no_photo'
                ? { uri: photo }
                : require('../../../assets/images/screen/noImage.png')
            }
          />
          <Text style={styles.name}>{name}</Text>
        </LinearGradient>

        <View>
          <View style={styles.event}>
            <View>
              <Text style={styles.count}>{totalOnSchedule}</Text>
              <Text style={styles.status}>On Schedule </Text>
            </View>
            <View>
              <Text style={styles.count}>{totalOnProgress}</Text>
              <Text style={styles.status}> On Progress </Text>
            </View>
            <View>
              <Text style={styles.count}>{totalDone}</Text>
              <Text style={styles.status}> Done</Text>
            </View>
          </View>

          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                marginLeft: 15,
                alignSelf: 'center',
                marginTop: -10
              }}
            >
              <TouchableOpacity
                style={styles.surface}
                onPress={() => navigation.navigate('EventTier')}
              >
                <Surface>
                  <FontAwesome name="plus" style={styles.iconAdd} />
                  <Text style={styles.text}>Add Event</Text>
                </Surface>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.surface}
                onPress={() => navigation.navigate('EventEO')}
              >
                <Surface>
                  <FontAwesome name="heart" style={styles.iconEvents} />
                  <Text style={styles.text}>Events</Text>
                </Surface>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                marginLeft: 15,
                alignSelf: 'center',
                marginTop: -10
              }}
            >
              <TouchableOpacity
                style={styles.surface}
                onPress={() => navigation.navigate('MerchantEO')}
              >
                <Surface>
                  <FontAwesome name="store" style={styles.iconMerchant} />
                  <Text style={styles.text}>Merchant</Text>
                </Surface>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.surface}
                onPress={() => navigation.navigate('WalletEO')}
              >
                <Surface>
                  <FontAwesome name="wallet" style={styles.iconWallet} />
                  <Text style={styles.text}>Wallet</Text>
                </Surface>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Home.propTypes = {
  authLoading: PropTypes.any,
  data: PropTypes.any,
  dataDone: PropTypes.any,
  dataProgress: PropTypes.any,
  dataSchedule: PropTypes.any,
  findById: PropTypes.func,
  findByStatusDone: PropTypes.func,
  findByStatusOnProgress: PropTypes.func,
  findByStatusOnSchedule: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  route: PropTypes.any,
  userData: PropTypes.shape({
    photo: PropTypes.any
  })
};

const mapStateToProps = state => ({
  userData: state.auth.data,

  dataSchedule: state.eventsStatusOnSchedule.data,
  dataProgress: state.eventsStatusOnProgress.data,
  dataDone: state.eventsStatusDone.data,

  dataAuth: state.auth?.data,
  errorAuth: state.auth?.error,

  data: state.EOById.data,
  loading:
    state.EOById.loading ||
    state.auth?.authLoading ||
    state.eventsStatusOnProgress.loading,
  error: state.EOById.error
});

const mapDispatchToProps = {
  findById,
  findByStatusOnSchedule,
  findByStatusOnProgress,
  findByStatusDone
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
