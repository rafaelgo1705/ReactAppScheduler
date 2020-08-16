import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import styles from '../utility/styles';

export default class Login extends React.Component {
    constructor(props){
      super(props);
    }

    abrirTelaInicio = () => {
      this.props.navigation.navigate('Home');
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
            onChangeText={text => onChangeText(text)}
            placeholder= 'Email...'
            textContentType='none'
          />
          
          <TextInput
            style={styles.telaLoginInput}
            onChangeText={text => onChangeText(text)}
            placeholder= 'Senha...'
            textContentType='password'
          />

          <TouchableOpacity
            style={styles.telaLoginButton}
            onPress={()=>{this.abrirTelaInicio()}}>
            <Text>Entrar</Text>
          </TouchableOpacity>
        
        </View>
      );
    }
  }