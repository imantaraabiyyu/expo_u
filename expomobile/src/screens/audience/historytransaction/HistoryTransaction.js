import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Title } from 'react-native-paper';
import QRCode from 'react-native-qrcode-generator';
import { CustomHeader } from '../../../component/CustomHeader';
import { findByTicketsByTransactionId } from '../../../actions/transactions';
import { connect } from 'react-redux';
import styles from './styles';
class HistoryTransaction extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.state = {
      id: route.params?.id,
      user: '',
      data: [],
      isModalVisible: false,
      quantity: ''
    };
  }
  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.findByTicketsByTransactionId(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { data, userData } = this.props;
    if (prevProps.data !== data) {
      this.setState({
        ...this.state,
        data: [...this.state.data, ...data?.list],
        user: { ...userData }
      });
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const { navigation } = this.props;
    const { data, user, id, quantity } = this.state;
    console.log(user);
    return (
      <View style={styles.background}>
        <CustomHeader
          style={{ position: 'absolute' }}
          navigation={navigation}
          title="Transaction Detail"
        />
        <ScrollView>
          <Title
            style={{ alignSelf: 'center', marginTop: 25, marginBottom: 10 }}
          >
            QR Code
          </Title>
          <View style={{ alignSelf: 'center' }}>
            <QRCode value={id} size={200} bgColor="black" fgColor="white" />
            <Title style={{ alignSelf: 'center', marginTop: 20 }}>
              {' '}
              Transaction ID
            </Title>
            <Text style={{ alignSelf: 'center' }}>{id}</Text>
            <Text style={{ alignSelf: 'center' }}>{data.quantity}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

HistoryTransaction.propTypes = {
  data: PropTypes.any,
  findByTicketsByTransactionId: PropTypes.func,
  navigation: PropTypes.any,
  route: PropTypes.shape({
    params: PropTypes.any
  })
};

const mapStateToProps = state => ({
  userData: state.auth.data,
  data: state.findTicketsByTransactionId.data,
  loading: state.findTicketsByTransactionId.loading,
  error: state.findTicketsByTransactionId.error
});

const mapDispatchToProps = {
  findByTicketsByTransactionId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryTransaction);
