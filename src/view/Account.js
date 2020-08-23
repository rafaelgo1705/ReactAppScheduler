import React from 'react';
import { Text, View } from 'react-native';

import styles from '../utility/styles';

export default class Account extends React.Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <View style={styles.screenHome}> 
        <Text>Tela da conta</Text>
      </View>
    );
  }
}