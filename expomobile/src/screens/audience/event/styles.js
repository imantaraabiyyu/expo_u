import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    marginVertical: 15,
    paddingBottom: 25,
    borderBottomWidth: 2,
    borderColor: '#E233DB'
  },
  dateText: {
    fontSize: 1
  },
  isSelected: {
    backgroundColor: '#b036ec85',
    borderRadius: 12,
    margin: 2
  },
  category: {
    borderRadius: 12,
    margin: 2
  },
  cardCover: {
    width: '100%',
    height: 180,
    marginBottom: 10
  },
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0
  },
  cardContent: {
    flexDirection: 'row'
  },
  date: {
    padding: 15,
    fontSize: 15,
    color: 'gray'
  },
  dateEvent: {
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    flexDirection: 'row'
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
    height: 550,
    width: 350,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center'
    // justifyContent: 'space-around'
  },
  inputFilter: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff'
  },
  buttonMap: {
    marginRight: 120
  }
});

export default styles;
