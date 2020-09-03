import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    flex: 1
  },
  category: {
    borderRadius: 20,
    fontSize: 12
  },
  card: {
    marginHorizontal: 15,
    marginVertical: 15
  },
  imageCover: {
    width: '100%'
  },
  cardContent: {
    flexDirection: 'row'
  },
  date: {
    marginRight: 15,
    marginTop: 20,
    fontWeight: 'bold'
  },
  buttonMap: {},
  menu: {
    width: '100%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    marginVertical: 15
  },
  menuButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 20
  },
  margin: {
    marginHorizontal: 15,
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row'
  },
  viewTiket: {
    marginVertical: 10,
    marginLeft: 15,
    marginRight: 60
  },
  viewPrice: {
    marginVertical: 10,
    marginLeft: 15
  },
  viewOrder: {
    marginVertical: 10,
    marginLeft: 15,
    marginRight: 20
  },
  eventStyle: {
    flexDirection: 'row',
    marginLeft: 30
  },
  buttonPay: {
    backgroundColor: '#80DC69'
  }
});

export default styles;
