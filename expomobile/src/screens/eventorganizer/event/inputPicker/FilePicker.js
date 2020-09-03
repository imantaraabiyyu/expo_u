import React, { Component } from 'react';
import FilePickerManager from 'react-native-file-picker';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

class FilePicker extends Component {
  state = {
    file: null
  };

  selectFile = async () => {
    FilePickerManager.showFilePicker(null, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        this.setState({
          file: response
        });
      }
    });
  };
  render() {
    return (
      <View>
        <Button onPress={this.selectFile}>Upload Proposal Event .pdf</Button>
      </View>
    );
  }
}
export default FilePicker;
