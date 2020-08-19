import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';

import styles from '../utility/styles';
import axios from 'axios';
import api from '../services/api';

export default class Login extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        email: "",
        password: ""
      }
    }

    logar = async () => {
      /*Alert.alert("Executa")
      try{
        const credentials = {
          email: this.state.email,
          password: this.state.password
        };
  
        const response = await axios.post(api()+'/authentication', credentials);
  
        const user = response.data;
  
        await AsyncStorage.setItem('token', user);

        console.log(await AsyncStorage.getItem('token'));
        //this.abrirTelaInicio();

      }catch(err){

      }*/
      

      const response = await axios.post(api()+'/authenticate', {
        email: this.state.email,
        password: this.state.password
      })
      .then( function(response) {
        return response;
        
      })
      .catch( function(error) {
        return error;
      });

      const user = response.data.token;
      await AsyncStorage.setItem('token', user);

      this.abrirTelaInicio();
    }

    abrirTelaInicio = () => {
      this.props.navigation.navigate('Home');
    }

    abrirTelaCadastro = () => {
      this.props.navigation.navigate('Cadastro')
    }

    render(){
      return (
        <View style={styles.telaLogin}>
          <View style={{alignItems:'center'}}>
            <Image
              style={styles.logoTelaLogin}
              source={require('../utility/img/imgLogin.png')}
            />
          </View>
          
          <TextInput
            style={styles.telaLoginInput}
            onChangeText={(text) => { this.setState({ email:text }) }}
            placeholder= 'Email...'
            textContentType='emailAddress'
            keyboardType='email-address'
          />
          
          <TextInput
            style={styles.telaLoginInput}
            onChangeText={(text) => { this.setState({ password:text }) }}
            placeholder= 'Senha...'
            textContentType='password'
          />

          <TouchableOpacity
            style={styles.telaLoginButton}
            onPress={()=>{this.logar()}}>
            <Text>Entrar</Text>
          </TouchableOpacity>

          <View style={{ alignContent:'center'}}>
            <Text style={{ justifyContent:'center', alignItems:'center', alignContent:'center' }}>OU</Text>
          </View>         

          <TouchableOpacity
            style={styles.telaLoginButton}
            onPress={()=>{this.abrirTelaCadastro()}}>
            <Text>Cadastre-se</Text>
          </TouchableOpacity>
        
        </View>
      );
    }
  }