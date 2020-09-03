import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
// eslint-disable-next-line react/prop-types
function RowItem({ navigation }) {
  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('EventMerchant')}>
        <Card.Cover
          source={require('../../assets/images/event1.jpg')}
          style={styles.cardCover}
        />
      </TouchableOpacity>
      <View>
        <Card.Content style={styles.cardContent}>
          <Paragraph style={styles.date}>APR {'\n'}2020</Paragraph>
          <View>
            <Title>COLOR RUN INDONESIA 2020</Title>
            <Paragraph>JCC Senayan</Paragraph>
            <Paragraph>Rp. 200.000</Paragraph>
          </View>
        </Card.Content>
      </View>
    </Card>
  );
}

export default RowItem;
