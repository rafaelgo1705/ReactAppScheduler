import React from 'react';
import { View, Image, AsyncStorage } from 'react-native';

import styles from '../utility/styles';

export default class LoadScreen extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('@token')

    this.props.navigation.navigate(token ? 'TabsScreen' : 'StackSig');
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