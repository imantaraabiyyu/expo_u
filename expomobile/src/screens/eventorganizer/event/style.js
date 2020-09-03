import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  newTitle: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  eventDesc: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
  },
  accountNumberInput: {
    backgroundColor: '#fff',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 30
  },
  paymentMethodCard: {
    marginVertical: 30,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingVertical: 20
  },
  paymentMethodTitle: {
    alignSelf: 'center',
    marginVertical: 15,
    fontSize: 15
  },
  AccountNumber: {
    alignSelf: 'center',
    color: 'navy',
    fontSize: 20,
    marginTop: 20
  },
  isSelected: {
    backgroundColor: '#b036ec85',
    borderRadius: 12,
    margin: 2
  },
  buttonPaymentText: { fontSize: 12, color: 'white' },
  category: {
    borderRadius: 12,
    margin: 2
  },
  buttonPayment: {
    marginHorizontal: 5,
    width: '30%',
    fontSize: 8
  },
  surface: {
    height: 200,
    width: '90%',
    alignSelf: 'center',
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20
  },
  surfaceTier: {
    height: 150,
    width: '60%',
    alignSelf: 'center',
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 550,
    width: 350,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center'
    // justifyContent: 'space-around'
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  addPricing: {
    margin: 15
  },
  inputBox: {
    width: 380,
    alignSelf: 'center',
    margin: 20,
    padding: 10
  },
  buttonAdd: {
    alignSelf: 'center',
    width: 350,
    paddingBottom: 15
  },
  textPrice: {
    margin: 5,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FD9536'
  },
  addButton: {
    borderRadius: 10,
    backgroundColor: '#30d98d'
  },
  datepicker: {
    flexDirection: 'row',
    margin: 10,
    padding: 5
  },
  date: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 15
  },
  text: {
    backgroundColor: '#FFF'
  },
  input: {
    marginBottom: 10
  }
});

export default styles;
