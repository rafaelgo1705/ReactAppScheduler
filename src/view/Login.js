import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';

import styles from '../utility/styles';

import api from '../services/api';

export default class Login extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: ""
    }
  }
  
  login = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password
    }

    await api.post("/authenticate", credentials)
    .then( (response) => {
      this.saveUserAuth(response.data.token)

      this.openHomeScreen()
    })
    
  }

  saveUserAuth = async (user) => {
    await AsyncStorage.clear()
    await AsyncStorage.setItem('@token', user)
  }

  openHomeScreen = () => {
    this.props.navigation.navigate('Home');
  }

  openRegisterScreen = () => {
    this.props.navigation.navigate('Register')
  }

  validate = () => {
    let erro = "";

    if (this.state.email == ""){
      erro += "O campo Email está vazio!\n";
    }

    if (this.state.password == ""){
      erro += "O campo Senha está vazio!";
    }

    if (erro.length > 0){
      Alert.alert("Erro", erro);
      return false;

    }else{
      return true;
    }
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
        
        <TextInput
          style={styles.screenLoginInput}
          onChangeText={(text) => { this.setState({ email:text }) }}
          placeholder= 'Email...'
          textContentType='emailAddress'
          keyboardType='email-address'
        />
        
        <TextInput
          style={styles.screenLoginInput}
          onChangeText={(text) => { this.setState({ password:text }) }}
          placeholder= 'Senha...'
          textContentType='password'
        />

        <TouchableOpacity
          style={styles.screenLoginButton}
          onPress={()=>{this.login()}}>
          <Text>Entrar</Text>
        </TouchableOpacity>

        <View style={{ alignContent:'center'}}>
          <Text style={{ justifyContent:'center', alignItems:'center', alignContent:'center' }}>OU</Text>
        </View>         

        <TouchableOpacity
          style={styles.screenLoginButton}
          onPress={()=>{this.openRegisterScreen()}}>
          <Text>Cadastre-se</Text>
        </TouchableOpacity>
      
      </View>
    );
  }
}