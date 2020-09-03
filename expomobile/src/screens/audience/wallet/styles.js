import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 80,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9400D3'
  },
  rowCard: {
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#9400D3',
    marginHorizontal: 20
  },
  viewInCard: {
    marginLeft: 5,
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between'
  },
  textPrice: {
    fontSize: 10
  },
  textCenter: {
    fontSize: 20
  },
  history: {
    width: '85%',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    marginHorizontal: 10
  },
  activity: {
    color: 'red'
  },
  activityTitle: {
    marginLeft: 30,
    marginTop: 40
  },
  backgroundGradient: {
    height: 70,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  cardCountdown: {
    marginVertical: 120,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingVertical: 30,
    height: 450
  },
  cardList: {
    marginHorizontal: 20
  },
  textInputList: {
    backgroundColor: '#fff',
    width: '85%',
    alignSelf: 'center'
  },
  backgroundTopUp: {
    backgroundColor: '#fff',
    flex: 1
  },
  cardBank: {
    marginVertical: 10,
    width: '80%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingVertical: 20,
    height: 250
  },
  textCardBank: {
    alignSelf: 'center',
    marginVertical: 15,
    fontSize: 15
  },
  textVirtualAccount: {
    alignSelf: 'center',
    color: 'navy',
    fontSize: 20,
    marginTop: 20
  },
  buttonTopUp: {
    backgroundColor: '#80DC69'
  },
  buttonBank: {
    backgroundColor: '#92ddea'
  }
});

export default styles;
