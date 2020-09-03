import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%'
  },
  text: {
    color: '#E233DB',
    fontSize: 30,
    fontWeight: 'bold'
  },
  card: {
    height: 360,
    marginHorizontal: 30,
    borderColor: '#6807F9'
  },
  title: {
    alignSelf: 'center',
    color: '#E233DB',
    fontSize: 20,
    marginBottom: 10
  },
  input: {
    borderRadius: 5,
    color: 'white'
  },

  inputText: {
    height: 15,
    borderColor: '#E233DB',
    borderWidth: 1
  },
  fb: {}
});

export default styles;
