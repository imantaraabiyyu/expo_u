import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './style';

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
        <View
          style={{
            width: 360,
            height: 170,
            borderWidth: 2,
            borderColor: '#9400D3',
            backgroundColor: '#DCDCDC'
          }}
        >
          {this.state.avatarSource && (
            <Image
              source={{ uri: this.state.avatarSource }}
              style={styles.image}
            />
          )}
        </View>

        <Button onPress={this.selectImage} style={styles.imageButton}>
          Upload Banner Event ..
        </Button>
      </View>
    );
  }
}
export default ImageInput;
