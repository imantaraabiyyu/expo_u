import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';

class ImageInput extends Component {
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
      <View>
        <View style={styles.imageBackground}>
          <Button onPress={this.selectImage} style={styles.imageButton}>
            Upload KTP
          </Button>

          {this.state.avatarSource && (
            <Image
              source={{ uri: this.state.avatarSource }}
              style={styles.image}
            />
          )}
        </View>
      </View>
    );
  }
}
export default ImageInput;
