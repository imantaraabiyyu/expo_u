import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff'
  },
  first: {
    backgroundColor: '#9000d3',
    width: 420,
    height: 170
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    borderRadius: 40,
    marginTop: 30,
    marginBottom: 10
  },
  name: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 16,
    marginBottom: 20,
    marginTop: -10
  },
  event: {
    width: 340,
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#9000D3',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -32,
    shadowColor: '#BA1BB4'
  },
  count: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    marginRight: 18
  },
  status: {
    alignSelf: 'center',
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 10,
    marginRight: 25
  },
  menu: {
    backgroundColor: '#fff',
    width: 340,
    height: 150,
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'center',
    alignSelf: 'center'
  },
  menutitle: {
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 80,
    fontWeight: 'bold',
    fontSize: 13
  },
  iconAdd: {
    width: 110,
    height: 50,
    paddingTop: 5,
    paddingLeft: 8,
    fontSize: 38,
    color: '#00CED1',
    marginLeft: 50,
    marginBottom: 20
  },
  iconMerchant: {
    width: 110,
    height: 50,
    paddingTop: 5,
    paddingLeft: 8,
    fontSize: 38,
    color: '#FF8C00',
    marginLeft: 50,
    marginBottom: 20
  },
  iconEvents: {
    width: 110,
    height: 50,
    paddingTop: 5,
    paddingLeft: 8,
    fontSize: 38,
    color: '#D266CE',
    marginLeft: 50,
    marginBottom: 20
  },
  iconWallet: {
    width: 110,
    height: 50,
    paddingTop: 5,
    paddingLeft: 8,
    fontSize: 42,
    color: '#575FA8',
    marginLeft: 50,
    marginBottom: 20
  },
  bgEdit: {
    backgroundColor: '#FFF',
    width: 380,
    alignSelf: 'center',
    margin: 10,
    padding: 10
  },
  edit: {
    backgroundColor: '#fff',
    color: '#000000'
  },
  surface: {
    marginTop: 40,
    height: 140,
    width: '50%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    marginRight: 15
  },
  text: { marginTop: 0, fontWeight: 'bold', fontSize: 15, alignSelf: 'center' }
});

export default styles;
