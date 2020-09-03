import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    flex: 1
  },
  cardCover: {
    resizeMode: 'cover',
    width: 150,
    alignSelf: 'center',
    marginTop: 20,
    height: 150
  },
  textStatus: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 15,
    color: 'navy'
  },
  cardParent: {
    marginHorizontal: 25,
    marginVertical: 20
  },
  viewName: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold'
  },
  viewDate: {
    marginTop: 20,
    marginHorizontal: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fontAwesome: {
    marginRight: 15,
    marginVertical: 5
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 320,
    width: 320,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default styles;
