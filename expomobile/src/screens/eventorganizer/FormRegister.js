import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Document from './event/inputPicker/Document';
import { TextInput, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import styles from './style';

class FormRegister extends Component {
  state = {
    avatarSource: null
  };

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
    return (
      <View style={styles.bgEdit}>
        <View>
          {this.state.avatarSource && (
            <Image
              source={{ uri: this.state.avatarSource }}
              style={styles.image}
            />
          )}
          <Button onPress={this.selectImage} style={styles.imageButton}>
            Select Logo
          </Button>
        </View>
        <TextInput style={styles.edit} label="Name" />
        <TextInput style={styles.edit} label="Company" />
        <TextInput style={styles.edit} label="Phone" />
        <TextInput style={styles.edit} label="Address" />
        <TextInput style={styles.edit} label="City" />
        <TextInput style={styles.edit} label="Description" />
        <TextInput style={styles.edit} label="NPWP Number" />
        <TextInput style={styles.edit} label="SIUP Number" />
        <Document />
        <Button mode="contained">Save</Button>
      </View>
    );
  }
}

FormRegister.propTypes = {
  navigation: PropTypes.any
};

export default FormRegister;
