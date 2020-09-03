import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    marginTop: 10,
    marginHorizontal: 10
  },
  center: {
    alignSelf: 'center'
  },
  textCenter: {
    alignSelf: 'center',
    color: '#181819'
  },
  textDesc: {
    alignSelf: 'flex-start',
    marginVertical: 10
  },
  textPrice: {
    margin: 5,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FD9536'
  },
  viewButton: {
    marginTop: 20,
    marginHorizontal: 30,
    flexDirection: 'row'
  },
  buttonWallet: {
    height: 110,
    width: 160,
    backgroundColor: '#fff'
  },
  buttonTf: {
    height: 110,
    width: 160,
    marginLeft: 5,
    backgroundColor: '#fff'
  },
  wallet: {
    alignSelf: 'center',
    paddingVertical: 10
  },
  text: {
    alignSelf: 'center'
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
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headerChoice: {
    flexDirection: 'row',
    marginTop: 20
  },
  touch: {
    marginHorizontal: 5
  },
  ticket: {
    height: 30,
    width: 80,
    borderWidth: 1,
    backgroundColor: '#949494d1'
  },
  ticketSelected: {
    height: 30,
    width: 80,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#f9ca21fa',
    borderColor: '#787270'
  },
  cardSl: {
    height: 30,
    width: 80,
    borderWidth: 1,
    borderColor: '#DFA83B'
  },
  cardPtm: {
    height: 30,
    width: 80,
    borderWidth: 1,
    borderColor: '#000'
  },
  cardVolume: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5
  }
});

export default styles;
