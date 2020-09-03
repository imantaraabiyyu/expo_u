import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import style from './styles';
import ImageInput from '../picker/ImageInput';
import { CustomHeader } from '../../../component/CustomHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MerchantImage from '../picker/MerchantImage';
import { connect } from 'react-redux';
import { save } from '../../../actions/merchants';

class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
  }

  selectImage = async () => {
    ImagePicker.showImagePicker(
      { noData: true, mediaType: 'photo' },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({
            avatarSource: response.uri
          });
        }
      }
    );
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={style.bg}>
        <CustomHeader
          style={{ position: 'absolute' }}
          title="Submission"
          navigation={navigation}
        />
        <ScrollView>
          <View>
            <MerchantImage />
          </View>
          <View style={style.headerInput}>
            <TextInput style={style.input} label="Merchant Name" />
            <TextInput style={style.input} label="Phone" />
            <TextInput style={style.input} label="Address" />
            <TextInput style={style.input} label="City" />
            <TextInput style={style.input} label="Description" />
            <TextInput style={style.input} label="KTP Number" />
            <View style={style.uploadHeader}>
              <View style={style.upload}>
                <ImageInput />
              </View>
            </View>
            <TouchableOpacity>
              <Button mode="contained" style={style.button}>
                Save
              </Button>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Submission.propTypes = {
  navigation: PropTypes.any
};

const mapStateToProps = state => ({
  data: state.savedMerchant.data,
  loading: state.savedMerchant.loading,
  error: state.savedMerchant.error
});

const mapDispatchProps = {
  save
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Submission);
