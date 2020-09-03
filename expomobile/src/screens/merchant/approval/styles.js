import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 130,
    width: 120,
    borderRadius: 10
  },
  codeName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20
  },
  price: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 15
  },
  row: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 15,
    marginVertical: 5
  },
  cardRowItem: {
    marginTop: 10,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: '#E233DB'
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10
  },
  buttonActive: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: '40%',
    alignSelf: 'flex-end',
    borderRadius: 15
  },
  buttonNonActive: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: '40%',
    alignSelf: 'flex-end',
    borderRadius: 15
  }
});

export default styles;
