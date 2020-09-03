import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bar: {
    width: 420,
    height: 620,
    marginLeft: -5
  },
  Navigator: {
    color: '#9400D3',
    backgroundColor: '#9400D3'
  },
  progresscard: {
    width: 400,
    height: 140,
    paddingTop: 10,
    borderBottomColor: '#0000FF',
    flexDirection: 'row'
  } /* 
  banner: {
    padding: 10
  }, */,
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'roboto',
    alignSelf: 'center'
  },
  description: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 6
  },
  descIcon: {
    marginRight: 10,
    marginLeft: 10,
    fontSize: 16,
    color: '#9400D3'
  },
  descText: {
    marginLeft: 10,
    fontSize: 16
  },
  status: {
    flexDirection: 'column',
    borderWidth: 2,
    width: 250,
    height: 100,
    alignSelf: 'center'
  },
  descStatus: {
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  boxDescription: {
    marginTop: 20,
    borderWidth: 1
  },
  boxText: {
    marginLeft: 6,
    marginTop: 6,
    fontSize: 16,
    fontWeight: 'bold'
  },
  boxDesc: {
    marginLeft: 20,
    marginRight: 10,
    color: '#585858',
    marginTop: 0,
    alignItems: 'center',
    fontSize: 13
  },
  events: {
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
    height: '20%'
  },
  cardEvent: {
    width: 380,
    height: 120,
    marginTop: 20,
    borderRadius: 20,
    marginRight: 5,
    marginLeft: 15
  },
  view: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15
  },
  image: {
    marginTop: 20,
    width: '38%',
    height: '72%',
    resizeMode: 'stretch',
    borderRadius: 20
  }
});

export default styles;
