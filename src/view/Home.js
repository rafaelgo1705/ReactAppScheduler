import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button';

import AwesomeAlert from 'react-native-awesome-alerts';

import api from '../services/api';

import styles from '../utility/styles';
import colors from '../utility/colors';

export default class Home extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: "",
      nameList: [], 
      modalVisible: false,
      showAlert: false,
      showAlertLoad: false,
      id: null,
      stateRegister: false,
      titleAlertLoad: "",
    }
  }
      
  componentDidMount = () => {
    this.getData();
  }

  getData = async () => {
    this.setState({
      titleAlertLoad: "Carregando atividades...",
      showAlertLoad: true
    })
      this.setState({ nameList: [] })

      console.log(this.state.nameList.toString())

      await api.get('/schedule')
      .then((response) => {
        this.setState({ 
          nameList: response.data 
        }, () => {
          this.setState({
            titleAlertLoad: "",
            showAlertLoad: false
          })
        })

      }).catch((error) => {
        if (error.response.status === 401){
          this.setState({
            titleAlertLoad: "",
            showAlertLoad: false
          })
          AsyncStorage.clear()
          this.props.navigation.navigate("StackSig")
        }
      })
      
  }

  deleteActivity = async () => {
    this.setState({
      titleAlertLoad: "Deletando atividade...",
      showAlertLoad: true
    })
    await api.delete('/schedule/'+this.state.id)
    .then( (response) => {
      this.setState({
        showAlert: false
      }, () => {
        this.getData()
      }) 
    })

    this.setState({
      titleAlertLoad: "",
      showAlertLoad: false,
      showAlert: false,
      name: "",
      id: null
    })
  }

  onStateRegister = data => {
    this.setState({ stateRegister: data })
    this.getData()
  }

  openScreenRegisterSchedule = () => {
    this.props.navigation.navigate('RegisterSchedule', { onStateRegister: this.onStateRegister });
  }

  openScreenUpdateSchedule = (item) => {
    this.props.navigation.navigate('UpdateSchedule', {
      onStateRegister: this.onStateRegister,
      idActivity: item.id
    });
  }

  render() {
    return (
      <View style={styles.screenHome}> 
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title={this.state.name}
          message="Deseja apagar esta atividade?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancelar"
          confirmText="Apagar"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.setState({
              showAlert: false,
              name: "",
              id: null
            })
          }}
          onConfirmPressed={() => {
            this.deleteActivity(this.state.id)
          }}
        />
        <AwesomeAlert
              show={this.state.showAlertLoad}
              showProgress={true}
              title={this.state.titleAlertLoad}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={false}
              
            />
        <FlatList
              data={this.state.nameList}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={
                      () => { this.openScreenUpdateSchedule(item) }}
                    onLongPress={
                    () => {this.setState({
                      showAlert: true,
                      name: item.name,
                      id: item.id
                    })}
                    }
                    style={[
                      styles.screenHomeItemsArray,
                      { backgroundColor: colors.colorWhite },
                    ]}>
                    <Image source={require('../utility/img/imgActivity.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                    <View style={{flexDirection:'column', justifyContent: 'center'}}>
                      <Text style={styles.screenHomeItemsTitle} >{item.name}</Text>
                      <View style={{ flexDirection: "row"}}>
                        <Text style={styles.screenHomeItemsTitleText}>Data:</Text>
                        <Text style={styles.screenHomeItemsTitleTextInfo} >{item.date}</Text>
                      </View>
                      <View style={{ flexDirection: "row"}}>
                        <Text style={styles.screenHomeItemsTitleText}>Hora:</Text>
                        <Text style={styles.screenHomeItemsTitleTextInfo} >{item.hour}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={item => item.id.toString()}
            />

        <ActionButton buttonColor={colors.colorBlueLogin} onPress={() => this.openScreenRegisterSchedule()}/>
      </View>
    );
  }
}