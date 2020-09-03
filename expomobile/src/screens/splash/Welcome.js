import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { findById } from '../../actions/eventorganizers';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      photo: ''
    };
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000)
    );
  };

  componentDidMount() {
    const { name, photo } = this.props.userData;
    this.setState({ name: name, photo: photo });
  }

  render() {
    const { name, photo } = this.state;
    return (
      <View style={styles.viewStyles}>
        <StatusBar backgroundColor="#FFF" />
        <View>
          <Image
            style={{
              width: 110,
              height: 110,
              borderRadius: 65,
              marginTop: 5,
              borderWidth: 5,
              borderColor: '#9000D3',
              alignSelf: 'center'
            }}
            source={
              photo != 'no_photo'
                ? { uri: photo }
                : require('../../../assets/images/screen/noImage.png')
            }
          />
        </View>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 25,
              fontFamily: 'courier-regular',
              letterSpacing: 6,
              marginTop: 40,
              alignSelf: 'center',
              fontWeight: 'bold'
            }}
          >
            Howdy !
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10 }}>{name}</Text>
        </View>
      </View>
    );
  }
}

Welcome.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.func,
  loading: PropTypes.any,
  navigation: PropTypes.any,
  route: PropTypes.any,
  userData: PropTypes.shape({
    photo: PropTypes.any
  })
};

const mapStateToProps = state => ({
  userData: state.auth.data,
  data: state.EOById.data,
  loading: state.EOById.loading
});

const mapDispatchProps = {
  findById
};

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
};
export default connect(
  mapStateToProps,
  mapDispatchProps
)(Welcome);
