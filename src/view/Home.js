import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';

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
    }

    abrirTelaLogin = () => {
        this.props.navigation.goBack();
    }

    render() {
      return (
        <View style={styles.telaHome}> 
          <FlatList
                data={DATA}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={
                        () => {Alert.alert("Atividade " + item.id, item.title)}}
                      style={[
                        styles.telaHomeItensArray,
                        { backgroundColor: "000000" },
                      ]}>
                      <Image source={require('../utility/img/imgLogin.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                      <View style={{flexDirection:'column', justifyContent: 'center'}}>
                        <Text style={styles.telaHomeItensTitle} >{item.title}</Text> 
                      </View>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={item => item.id}
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