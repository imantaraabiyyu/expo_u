import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#fff'
  },
  title: {
    marginStart: 15,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  titleNewEvents: {
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  surface: {
    padding: 8,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginHorizontal: 8,
    borderRadius: 20
  },
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 15
  },
  viewSlider: {
    height: 200,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  slider: {
    marginTop: 20,
    borderRadius: 30,
    width: '90%',
    height: '88%',
    marginHorizontal: 20
  },
  card: {
    borderRadius: 5,
    height: '22%'
  },
  body: {
    marginTop: 30,
    height: 200,
    width: '100%',
    alignItems: 'center'
  },
  menu: {
    marginTop: 5,
    height: 150,
    flex: 1,
    flexWrap: 'wrap',
    marginHorizontal: 20
  },
  button: {
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20
  },
  menubar: {
    fontSize: 60,
    color: '#60DC69',
    alignSelf: 'center'
  },
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 15
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 45
  },
  imageEvent: {
    width: 250,
    height: '1%',
    marginHorizontal: 20
  },
  center: {
    alignSelf: 'center',
    paddingBottom: 45
  },
  fontSize: {
    alignSelf: 'center',
    fontSize: 10
  },
  textSlider: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    top: 150,
    left: 0,
    right: 0,
    fontSize: 30,
    paddingHorizontal: 110,
    color: '#fff'
  }
});

export default styles;
