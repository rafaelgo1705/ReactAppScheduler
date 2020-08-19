import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Alert, AsyncStorage } from 'react-native';

import axios from 'axios';
import api from '../services/api';

import styles from '../utility/styles';

export default class Home extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        nameList: []
      }
    }

    componentDidMount = async () => {
      const headers = {
        'Authorization': 'Bearer' + await AsyncStorage.getItem('token')
      }
      
      await axios.get(api()+'/agenda', {
        headers: headers
      })
      .then(res => {
        const nameList = res.data;
        this.setState({ nameList });
        
      });
    }

    abrirTelaLogin = () => {
      this.props.navigation.goBack();
    }

    render() {
      return (
        <View style={styles.telaHome}> 
          <FlatList
                data={this.state.nameList}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={
                        () => {Alert.alert("Tweet " + item.id, item.content)}}
                      style={[
                        styles.telaHomeItensArray,
                        { backgroundColor: "000000" },
                      ]}>
                      <Image source={require('../utility/img/imgLogin.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                      <View style={{flexDirection:'column', justifyContent: 'center'}}>
                        <Text style={styles.telaHomeItensTitle} >{item.content}</Text> 
                      </View>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={item => item.id.toString()}
              />

          <TouchableOpacity
            style={styles.telaHomeButton}
            onPress={()=>this.abrirTelaLogin()}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        
        </View>
      );
    }
  }