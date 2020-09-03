import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { EventTierButton } from '../EventTierButton';
class CustomHeader extends Component {
  onBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { hideLeftButton, showRightButton, eventTier } = this.props;
    return (
      <Header style={{ backgroundColor: '#9400D3' }}>
        <View>
          <StatusBar backgroundColor="#9400D3" />
        </View>
        {!hideLeftButton && (
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
        )}
        <Body>
          <Title style={{ marginLeft: 42 }}>{this.props.title}</Title>
        </Body>
        {showRightButton && (
          <Right>
            <EventTierButton tier={eventTier} />
          </Right>
        )}
      </Header>
    );
  }
}

CustomHeader.propTypes = {
  eventTier: PropTypes.any,
  hideLeftButton: PropTypes.any,
  navigation: PropTypes.shape({
    goBack: PropTypes.func
  }),
  showRightButton: PropTypes.any,
  title: PropTypes.any
};

export default CustomHeader;
