import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { checkTransactionId } from '../../../actions/transactions';
import { CustomHeader } from '../../../component/CustomHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import { connect } from 'react-redux';
import { showError, showSaveSuccess } from '../../../utils/toast';
import { BarIndicator } from 'react-native-indicators';

class Scanning extends Component {
  state = {
    barcode: 'QR Your Event'
  };
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
    }
  };

  componentDidUpdate(prevProps) {
    const { data, error } = this.props;

    if (prevProps.data !== data) {
      showSaveSuccess('Success');
    }
    if (prevProps.error !== error) {
      showError('Transaction Id not found.');
    }
  }

  checkId = () => {
    this.props.checkTransactionId(this.state.barcode);
  };
  render() {
    const { navigation, loading } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#E48' }}>
        <View>
          <CustomHeader
            style={{ flex: 2, position: 'absolute' }}
            navigation={navigation}
            title="expo U"
            hideLeftButton={true}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: 'grey' }}>
          {loading ? (
            <BarIndicator
              color="#E233DB"
              style={{
                marginVertical: '50%',
                marginHorizontal: '50%',
                zIndex: 1,
                position: 'absolute'
              }}
            />
          ) : null}
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel'
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel'
            }}
            onBarCodeRead={barcodes => {
              console.log(barcodes);
              this.setState(
                {
                  barcode: barcodes.data
                },
                this.checkId
              );
            }}
          />

          <View style={{ position: 'absolute', width: '100%' }} />
        </View>

        <View
          style={{
            backgroundColor: '#FFF',
            width: 420,
            height: 220,
            paddingHorizontal: 16
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#9000D3' }}
            >
              Scan QR Code
            </Text>
            <FontAwesome
              name="ticket-alt"
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: '#9000D3',
                marginRight: 20
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 14
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold'
                }}
              >
                {`Code : ${this.state.barcode}`}
              </Text>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={styles.capture}
              >
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Scanning.propTypes = {
  checkTransactionId: PropTypes.func,
  data: PropTypes.any,
  error: PropTypes.any,
  navigation: PropTypes.any
};
const mapStateToProps = state => ({
  data: state.checkTransactionId.data,
  loading: state.checkTransactionId.loading,
  error: state.checkTransactionId.error
});

const mapDispatchToProps = {
  checkTransactionId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanning);
