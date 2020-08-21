import React from 'react';
import { View, Image, AsyncStorage } from 'react-native';

import styles from '../utility/styles';

import api from '../services/api';

export default class LoadScreen extends React.Component {

    componentDidMount(){
        const user = await AsyncStorage.getItem('@token');

        props.navigation.navigate(user ? 'Home' : 'Login');
    }

    render(){
      return (
        <View style={styles.screenLogin}>
          <View style={{alignItems:'center'}}>
            <Image
              style={styles.screenLoginImage}
              source={require('../utility/img/imgLogin.png')}
            />
          </View>
        
        </View>
      );
    }
  }