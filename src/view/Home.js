import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';

import axios from 'axios';

import styles from '../utility/styles';

const DATA = [
  {
    id: '1',
    title: 'Fazer bolo',
  },
  {
    id: '2',
    title: 'Relaxar',
  },
  {
    id: '3',
    title: 'Descansar',
  },
];

export default class Home extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        nameList: []
      }
    }

    componentDidMount = async () => {
      /*const token = await AsyncStorage.getItem('token').then((value) => {
        console.log(value);
      });*/

      const headers = {
          'Authorization': 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjYsImlhdCI6MTU5NzQ1OTI1OX0.v9EwfoLou2jvVwU2E2Bn_pqsKdP3SgAL-jC8edRaFpg'
      }
      
      await axios.get('http://192.168.0.100:3333/tweets', {
        headers: headers
      })
      .then(res => {
        const nameList = res.data;
        this.setState({ nameList });
        
      })
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