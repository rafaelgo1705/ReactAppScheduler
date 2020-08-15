import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import styles from '../utility/styles';

export default function Login() {
    const abrirTelaInicio = () => {
      Alert.alert("Teste", "Este é um alerta de teste")
    }

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
        />
        <TextInput
          style={styles.telaLoginInput}
          onChangeText={text => onChangeText(text)}
        />

        <TouchableOpacity
          style={styles.telaLoginButton}
          onPress={()=>{abrirTelaInicio()}}>
          <Text>Entrar</Text>
        </TouchableOpacity>
       
      </View>
    );
  }