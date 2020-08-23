import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import styles from '../utility/styles';

import api from '../services/api';

export default class RegisterSchedule extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: "",
      date: "",
      hour: ""
    }
  }
   
  validate = () => {
    let erro = "";

    if (this.state.name == ""){
      erro += "O campo Atividade está vazio!\n";
    }

    if (this.state.date == ""){
      erro += "O campo Data está vazio!\n";
    }

    if (this.state.hour == ""){
      erro += "O campo Hora está vazio!";
    }

    if (erro.length > 0){
      Alert.alert("Erro", erro);
      return false;

    }else{
      return true;
    }
  }

  register = async () => {
    if(this.validate()){
      const data = {
        name: this.state.name,
        date: this.state.date,
        hour: this.state.hour
      }
      
      await api.post("/schedule", data
      ).then((response) => {
        console.log(response.data)
        this.return()
      })
    }    
  }

  return = () => {
    const { navigation, route } = this.props;
    navigation.goBack();
    route.params.onStateRegister({ stateRegister: true });
  }

  render(){
    return (
      <View style={styles.screenLogin}>
        <TextInput
          style={styles.screenLoginInput}
          onChangeText={(text) => { this.setState({ name:text }) }}
          placeholder= 'Atividade...'
          textContentType='none'
        />

        <TextInput
          style={styles.screenLoginInput}
          onChangeText={(text) => { this.setState({ date:text }) }}
          placeholder= 'Data...'
          textContentType='none'
        />

        <TextInput
          style={styles.screenLoginInput}
          onChangeText={(text) => { this.setState({ hour:text }) }}
          placeholder= 'Hora...'
          textContentType='none'
        />

        <TouchableOpacity
          style={styles.screenLoginButton}
          onPress={()=>{this.register()}}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.screenLoginButton}
          onPress={()=>{this.return()}}>
          <Text>Retornar</Text>
        </TouchableOpacity>
      
      </View>
    );
  }
}