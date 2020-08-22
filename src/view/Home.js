import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Alert, AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button';

import api from '../services/api';

import styles from '../utility/styles';
import colors from '../utility/colors';

export default class Home extends React.Component {
      state = {
        nameList: []
      }

    componentDidMount = async () => {
      this.getdata();
    }

    getdata = async () => {
        this.setState({ nameList: []})
        const header = await AsyncStorage.getItem('@token')

        await api.get('/schedule', {
          headers:header,
          validateStatus: function (status){
            return status < 500
          }   
        })
        .then((response) => {
          console.log(response);

        }).catch((error) => {
          console.log(error)
        })

        /*const response = await api.get('/schedule', {
          headers:header
        })
        .then((response) => {
          return response.data;

        }).catch((error) => {
          return error.toJSON()
        })*/

        /*this.setState({
          nameList: response.data
        })*/

        //console.log(response)
        
    }

    openScreenRegisterSchedule = () => {
      this.props.navigation.navigate('RegisterSchedule');
    }

    openScreenLogin = () => {
      this.props.navigation.navigate('Login');
    }

    render() {
      return (
        <View style={styles.screenHome}> 
          <FlatList
                data={this.state.nameList}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={
                        () => {Alert.alert("Atividade " + item.id, item.name)}}
                      style={[
                        styles.screenHomeItemsArray,
                        { backgroundColor: colors.colorWhite },
                      ]}>
                      <Image source={require('../utility/img/imgLogin.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                      <View style={{flexDirection:'column', justifyContent: 'center'}}>
                        <Text style={styles.screenHomeItemsTitle} >{item.name}</Text>
                        <Text style={styles.screenHomeItemsTitle} >{item.date + " " + item.hour}</Text>
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