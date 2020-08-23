import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import styles from '../utility/styles';

export default class Account extends React.Component {
  constructor(props){
    super(props)

  }

  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'StackSig' },
        ],
      })
    );
  }

  render() {
    return (
      <View style={{flex:1, alignItems: "center"}}>
        <View style={{flex:1, alignItems: "center", justifyContent: "center"}}> 
          <View style={{alignItems:'center'}}>
            <Image
              style={styles.screenLoginImage}
              source={require('../utility/img/imgLogin.png')}
            />
          </View>
          <Text style={styles.screenAccountItemsTitleText}>Rafael Gomes</Text>
          <Text style={styles.screenAccountItemsTitleTextInfo}>rr147440@gmail.com</Text>
          <Text style={styles.screenAccountItemsTitleTextInfo}>rafaelgo</Text>
          
          <TouchableOpacity
            style={styles.screenAccountButton}
            onPress={()=>{this.logOut()}}>
            <Text>Sair</Text>
          </TouchableOpacity>

          
        </View>
          <TouchableOpacity
            style={styles.screenAccountButtonDelete}
            onPress={()=>{this.deleteAccount()}}>
            <Text style={styles.screenAccountButtonText}>Apagar Conta</Text>
          </TouchableOpacity>
      </View>
    );
  }
}