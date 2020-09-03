import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Image, ImageBackground, StatusBar, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './styles';

class OnBoarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
    };
  }

  _onDone = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState(
        { showRealApp: true },
        this.props.showRealApp(this.state.showRealApp)
      );
    });
  };

  _onSkip = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
    });
  };

  _renderItem = ({ item }) => {
    return (
      <View>
        <StatusBar hidden />
        <ImageBackground
          source={item.imageBackground}
          style={{ resizeMode: 'cover', width: '100%', height: '100%' }}
        >
          <Image
            style={{
              marginTop: 250,
              borderBottomRightRadius: 70,
              borderBottomLeftRadius: 70,
              borderTopRightRadius: 70,
              alignSelf: 'center',
              width: '50%',
              height: '24%'
            }}
            source={item.image}
          />
        </ImageBackground>
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-back"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  render() {
    const slides = [
      {
        key: 1,
        image: require('../../../assets/images/screen/screen.jpg'),
        imageBackground: require('../../../assets/images/screen/slide1.png')
      },
      {
        key: 2,
        image: require('../../../assets/images/screen/Screen2.jpg'),
        imageBackground: require('../../../assets/images/screen/slide2.png')
      },
      {
        key: 3,
        image: require('../../../assets/images/screen/Screen3.jpg'),
        imageBackground: require('../../../assets/images/screen/slide3.png')
      }
    ];
    return (
      <View style={{ height: '100%', width: '100%' }}>
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          dotStyle={{ backgroundColor: '#6807F9' }}
          activeDotStyle={{ backgroundColor: '#E233DB' }}
          onDone={this._onDone}
          showSkipButton={true}
          onSkip={this._onSkip}
          showPrevButton={false}
          showDoneButton={true}
          prevLabel={<Icon name="arrowleft" size={23} />}
          nextLabel={<Icon name="arrowright" size={23} />}
          doneLabel="done"
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderPrevButton={this._renderPrevButton}
        />
      </View>
    );
  }
}

OnBoarding.propTypes = {
  showRealApp: PropTypes.func
};
export default OnBoarding;
