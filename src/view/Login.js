import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, AsyncStorage, ScrollView } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../utility/styles';
import { CommonActions } from '@react-navigation/native';

import api from '../services/api';

export default class Login extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: "",
      showAlert: false,
      error: ""
    }
  }

  login = async () => {
    this.setState({
      showAlertLoad: true
    })
    if(this.validate()){
      const credentials = {
        email: this.state.email,
        password: this.state.password
      }
  
      await api.post("/authenticate", credentials)
      .then( (response) => {
        this.saveUserAuth(response.data.token)
  
      }).catch((error) => {
        if(error.response.status === 401){
          let errorMsg = ""
            for (let msg of error.response.data) {
              errorMsg += msg.message + "\n" 
            }
  
            this.setState({
              showAlertLoad: false,
              error: errorMsg,
              showAlert: true
            })
        }
      })
    }
  }

  saveUserAuth = async (user) => {
    await AsyncStorage.clear()
    await AsyncStorage.setItem('@token', user)

    if(await AsyncStorage.getItem('@token') != null){
      this.openHomeScreen()
    }
  }

  openHomeScreen = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'TabsScreen' },
        ],
      })
    );
  }

  openRegisterScreen = () => {
    this.props.navigation.navigate('Register')
  }

  validate = () => {
    this.setState({ error: "" })
    let error = "";

    if (this.state.email == ""){
      error += "O campo Email está vazio!\n";
    }

    if (this.state.password == ""){
      error += "O campo Senha está vazio!";
    }

    if (error.length > 0){
      this.setState({
        showAlertLoad: false,
        error: error,
        showAlert: true
      })
      return false;

    }else{
      return true;
    }
  }

  render(){
    return (
      <View style={{flex: 1, justifyContent:'center'}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.screenLogin}>
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={false}
              title="Erro nos campos"
              message={this.state.error}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              cancelText="Cancelar"
              confirmText="OK"
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => {
              }}
              onConfirmPressed={() => {
                this.setState({
                  showAlert: false
                })
              }}
            />
            <AwesomeAlert
              show={this.state.showAlertLoad}
              showProgress={true}
              title="Entrando..."
              message=""
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={false}
              
            />
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
              <Text style={styles.screenLoginButtonTextSignIn}>Entrar</Text>
            </TouchableOpacity>

            <View style={{ alignItems:'center'}}>
              <Text style={{ justifyContent:'center', alignItems:'center', alignContent:'center', marginTop:10}}>OU</Text>
            </View>         

            <TouchableOpacity
              style={styles.screenLoginButtonCad}
              onPress={()=>{this.openRegisterScreen()}}>
              <Text style={styles.screenLoginButtonTextSignUp}>Cadastre-se gratuitamente</Text>
            </TouchableOpacity>
          
          </View>
        </ScrollView>
      </View>
    );
  }
}