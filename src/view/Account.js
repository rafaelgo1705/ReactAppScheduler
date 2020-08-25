import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Image, ScrollView, TextInput } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../utility/styles';
import api from '../services/api';

export default class Account extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      id: null,
      name: "",
      email: "",
      username: "",
      titleAlertLoad: false,
      showAlertLoad: false,
      created_at: "",
      updated_at: "",
    }

  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      titleAlertLoad: "Carregando usuário...",
      showAlertLoad: true
    })
  
    await api.get('/user')
    .then((response) => {
        const get = response.data
        get.map((get) => {
            const {id, name, username, email, created_at, updated_at} = get;
            this.setState({
              id: id,
              name: name,
              username: username,
              email: email,
              created_at: created_at,
              updated_at: updated_at

            }, () => {
              this.setState({
                showAlertLoad: false
              })
            })
        })
    })
  }

  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'StackSig' },
        ],
      })
    );
  }

  deleteAccount = () => {
    
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent:'center'}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.screenLogin}>
          <AwesomeAlert
              show={this.state.showAlertLoad}
              showProgress={true}
              title="Carregando..."
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={false}
              
            />
            <View style={{flex:1, alignItems: "stretch", justifyContent: "center"}}> 
              <View style={{alignItems:'center'}}>
                <Image
                  style={styles.screenLoginImage}
                  source={require('../utility/img/imgLogin.png')}
                />
              </View>
                <TextInput
                  style={styles.screenLoginInput}
                  editable={false}
                  value={this.state.name}
                  onChangeText={(text) => { this.setState({ name:text }) }}
                  placeholder= 'Nome...'
                  textContentType='none'
                  keyboardType='default'
                />

                <TextInput
                  style={styles.screenLoginInput}
                  editable={false}
                  value={this.state.username}
                  onChangeText={(text) => { this.setState({ username:text }) }}
                  placeholder= 'Usuário...'
                  textContentType='none'
                  keyboardType='default'
                />

                <TextInput
                  style={styles.screenLoginInput}
                  editable={false}
                  value={this.state.email}
                  onChangeText={(text) => { this.setState({ email:text }) }}
                  placeholder= 'Email...'
                  textContentType='none'
                  keyboardType='default'
                />
              
              <TouchableOpacity
                style={styles.screenAccountButton}
                onPress={()=>{this.logOut()}}>
                <Text>Sair</Text>
              </TouchableOpacity>

              
            </View>
              <TouchableOpacity
                style={styles.screenAccountButtonDelete}
                onPress={()=>{this.deleteAccount()}}>
                <Text style={styles.screenAccountButtonText}>Apagar Conta</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}