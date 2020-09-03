import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  bg: {
    backgroundColor: '#fff',
    flex: 1
  },
  input: {
    backgroundColor: '#fff',
    height: 70
  },
  headerInput: {},
  upload: {
    flexDirection: 'row',
    marginLeft: 8
  },
  uploadHeader: {
    marginBottom: 20
  },
  uploadImage: {
    height: 170,
    width: 170,
    marginHorizontal: 10
  },
  coverImage: {
    resizeMode: 'cover',
    height: 150,
    width: 170
  },
  uploadKtp: {},
  button: {
    width: 100,
    alignSelf: 'center',
    marginBottom: 20
  },
  ktpUpload: {
    alignSelf: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: 'violet'
  }
});

export default style;
