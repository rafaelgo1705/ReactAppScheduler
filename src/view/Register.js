import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../utility/styles';

import api from '../services/api';

export default class Register extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      showAlert: false,
      showAlertSucess: false,
      error: ""
    }
  }

  validate = () => {
    this.setState({ error: "" })
    let error = "";

    if (this.state.name == ""){
      error += "O campo Nome está vazio!\n";
    }

    if (this.state.username == ""){
      error += "O campo Usuário está vazio!\n";
    }

    if (this.state.email == ""){
      error += "O campo Email está vazio!\n";
    }

    if (this.state.password == ""){
      error += "O campo Senha está vazio!\n";
    }

    if (error.length > 0){
      this.setState({
        error: error,
        showAlert: true
      })
      return false;

    }else{
      return true;
    }
  }

  register = async () => {
    if (this.validate()){
      const data = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
  
      await api.post('/register', {
        ...data
      })
      .then((response) => {
        this.setState({
          showAlertSucess: true
        })
          
      }).catch((error) => {
        if(error.response.status === 406){
          let errorMsg = ""
            for (let msg of error.response.data) {
              errorMsg += msg.message + "\n" 
            }
  
            this.setState({
              error: errorMsg,
              showAlert: true
            })
        }
      })
    }
  }

  return = () => {
    this.props.navigation.goBack();
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
            show={this.state.showAlertSucess}
            showProgress={false}
            title="Sucesso"
            message="Cadastro criado!"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="Cancelar"
            confirmText="OK"
            confirmButtonColor="#4BB543"
            onCancelPressed={() => {
            }}
            onConfirmPressed={() => {
              this.setState({
                showAlertSucess: false
              }, () => {
                this.return()
              })
            }}
          />
            <View style={{alignItems:'center'}}>
              <Image
                style={styles.screenLoginImage}
                source={require('../utility/img/imgLogin.png')}
              />
            </View>
            
            <TextInput
              style={styles.screenLoginInput}
              onChangeText={(text) => { this.setState({ name:text }) }}
              placeholder= 'Nome...'
              textContentType='none'
            />

          <TextInput
              style={styles.screenLoginInput}
              onChangeText={(text) => { this.setState({ username:text }) }}
              placeholder= 'Usuário...'
              textContentType='none'
            />

            <TextInput
              style={styles.screenLoginInput}
              onChangeText={(text) => { this.setState({ email:text }) }}
              placeholder= 'Email...'
              textContentType='none'
            />
            
            <TextInput
              style={styles.screenLoginInput}
              onChangeText={(text) => { this.setState({ password:text }) }}
              placeholder= 'Senha...'
              textContentType='password'
            />

            <TouchableOpacity
              style={styles.screenLoginButton}
              onPress={()=>{this.register()}}>
              <Text style={styles.screenAccountButtonTextBlack}>Cadastrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.screenLoginButton}
              onPress={()=>{this.return()}}>
              <Text style={styles.screenAccountButtonTextBlack}>Retornar</Text>
            </TouchableOpacity>
          
          </View>
        </ScrollView>
      </View>
    );
  }
}