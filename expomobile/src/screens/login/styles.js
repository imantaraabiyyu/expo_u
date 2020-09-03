import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 2,
    paddingBottom: 2
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%'
  },
  banner: {
    marginTop: 250,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
    borderTopRightRadius: 70,
    alignSelf: 'center',
    width: '50%',
    height: '24%'
  },
  banner2: {
    marginTop: 270,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F1F518',
    marginLeft: 40,
    width: '50%',
    height: '24%'
  },
  banner3: {
    marginTop: 230,
    alignSelf: 'center',
    borderRadius: 5,
    width: '55%',
    height: '28%'
  },
  button: {
    backgroundColor: '#FFDA58',
    color: '#9D2EB9',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 60,
    width: '60%',
    height: '8%'
  },
  buttonText: {
    color: '#9D2EB9'
  },
  text: {
    color: '#E233DB',
    fontSize: 30,
    fontWeight: 'bold'
  },
  card: {
    position: 'relative',
    zIndex: -1,
    marginHorizontal: 30,
    borderColor: '#6807F9',
    flex: 1
  },
  title: {
    alignSelf: 'center',
    color: '#E233DB',
    fontSize: 20
  },
  input: {
    borderRadius: 5,
    color: 'white'
  },

  inputText: {
    height: 40,
    borderColor: '#E233DB',
    borderWidth: 1
  },
  slide1: {
    width: '100%'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  }
});

export default styles;
