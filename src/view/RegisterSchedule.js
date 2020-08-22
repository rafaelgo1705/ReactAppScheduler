import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';

import styles from '../utility/styles';

import api from '../services/api';

export default class RegisterSchedule extends React.Component {
   state = {
        name: "",
        date: "",
        hour: ""
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
      //if(this.validate()){
        
        const token = await AsyncStorage.getItem("@token")

        const headers= {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer'+token 
        };

        const data = {
          name: this.state.name,
          date: this.state.date,
          hour: this.state.hour
        }
        
        await api.post("/schedule", data, {
          headers:headers
        } 
        ).then((response) => {
          console.log(response.data)
        })
      //}
        
    }

    return = () => {
      this.props.navigation.goBack();
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