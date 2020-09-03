import React, { Component } from 'react';
import {
  DocumentPicker,
  DocumentPickerUtil
} from 'react-native-document-picker';
import { Button, View } from 'react-native';

class Document extends Component {
  selectFile = async () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.pdf()]
      },
      (error, res) => {
        // Android
        console.log(
          res.uri,
          res.type, // mime type
          res.fileName,
          res.fileSize
        );
      }
    );
  };
  render() {
    return (
      <View>
        <Button title="Select File" onPress={this.selectFile} />
      </View>
    );
  }
}
export default Document;
