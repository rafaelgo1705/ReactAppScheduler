import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';

import styles from '../utility/styles';

import api from '../services/api';

export default class Login extends React.Component {
    state = {
        email: "",
        password: ""
    }
    
    login = async () => {
      try{
        const credentials = {
          email: this.state.email,
          password: this.state.password
        }

        const response = await api.post("/authenticate", credentials)
        const user = response.data

        await this.saveUserAuth(user)

        this.openHomeScreen()

      } catch(err){
        console.log(err)

      }
      
    }

    saveUserAuth = async (user) => {
      await AsyncStorage.setItem('@token', JSON.stringify(user))
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