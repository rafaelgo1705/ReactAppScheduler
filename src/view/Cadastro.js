import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import styles from '../utility/styles';

import axios from 'axios';
import api from '../services/api';

export default class Cadastro extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        name: "",
        username: "",
        email: "",
        password: ""
      }

    }

    cadastrarUsuario = async () => {
        await axios.post(api()+'/register', {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response);
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    abrirTelaLogin = () => {
      this.props.navigation.goBack();
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
            onChangeText={(text) => { this.setState({ name:text }) }}
            placeholder= 'Nome...'
            textContentType='none'
          />

        <TextInput
            style={styles.telaLoginInput}
            onChangeText={(text) => { this.setState({ username:text }) }}
            placeholder= 'Usuário...'
            textContentType='none'
          />

          <TextInput
            style={styles.telaLoginInput}
            onChangeText={(text) => { this.setState({ email:text }) }}
            placeholder= 'Email...'
            textContentType='none'
          />
          
          <TextInput
            style={styles.telaLoginInput}
            onChangeText={(text) => { this.setState({ password:text }) }}
            placeholder= 'Senha...'
            textContentType='password'
          />

          <TouchableOpacity
            style={styles.telaLoginButton}
            onPress={()=>{this.cadastrarUsuario()}}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.telaLoginButton}
            onPress={()=>{this.abrirTelaLogin()}}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        
        </View>
      );
    }
  }