import React from 'react';
import { View, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import styles from '../utility/styles';

console.disableYellowBox = true;

export default class LoadScreen extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('@token')

    this.props.navigation.navigate(token ? this.openTabsScreen() : this.openStackSig());
  }

  openTabsScreen = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'TabsScreen' },
        ],
      })
    );
  }

  openStackSig = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'StackSig' },
        ],
      })
    );
  }

  render(){
    return (
      <View style={styles.screenLogin}>
        <View style={{alignItems:'center'}}>
          <Image
            style={styles.screenLoginImage}
            source={require('../utility/img/imgActivity.png')}
          />
          <ActivityIndicator size="large"/>
        </View>
      
      </View>
    );
  }
}