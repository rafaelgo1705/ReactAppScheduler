import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Alert, Modal } from 'react-native';
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
      id: null,
      stateRegister: false
    }
  }
      
  componentDidMount = () => {
    this.getData();
  }

  getData = async () => {
      this.setState({ nameList: [] })

      console.log(this.state.nameList.toString())

      //console.log(await AsyncStorage.getItem('@token'));

      await api.get('/schedule')
      .then((response) => {
        this.setState({ nameList: response.data })

      }).catch((error) => {
        console.log(error.message)
      })
      
  }

  deleteActivity = async () => {
    await api.delete('/schedule/'+this.state.id)
    .then( (response) => {
      this.getData()
      console.log(response.data)
    })

    this.setState({
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
        <FlatList
              data={this.state.nameList}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={
                      () => {}}
                    onLongPress={
                    () => {this.setState({
                      showAlert: !this.state.showAlert,
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