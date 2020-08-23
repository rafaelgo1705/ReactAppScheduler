import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Image } from 'react-native';

import styles from '../utility/styles';
import api from '../services/api';

export default class UpdateSchedule extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount = () => {
      this.getData()

  }

  getData = async () => {
    const { route } = this.props;
    const {idActivity} = route.params

    await api.get('/schedule/'+idActivity)
    .then((response) => {
        //console.log(response.data)
        const get = response.data
        const res = get.map((get) => {
            //console.log(get)
            const {id, name} = get;
        })

        console.log(JSON.stringify(id))
        console.log(JSON.stringify(name))
        /*console.log(JSON.stringify(date))
        console.log(JSON.stringify(hour))*/
    })
  }

  editActivity = () => {

  }

  deleteActivity = () => {

  }

  return = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
        <View style={{flex:1, alignItems: "center"}}>
        <View style={{flex:1, alignItems: "center", justifyContent: "center"}}> 
            <View style={{alignItems:'center'}}>
            <Image
                style={styles.screenLoginImage}
                source={require('../utility/img/imgActivity.png')}
            />
            </View>
            <Text style={styles.screenAccountItemsTitleText}>Rafael Gomes</Text>
            <Text style={styles.screenAccountItemsTitleTextInfo}>rr147440@gmail.com</Text>
            <Text style={styles.screenAccountItemsTitleTextInfo}>rafaelgo</Text>
            
            <TouchableOpacity
                style={styles.screenAccountButton}
                onPress={()=>{this.editActivity()}}>
                <Text style={styles.screenAccountButtonTextBlack}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.screenAccountButtonDelete}
                onPress={()=>{this.deleteActivity()}}>
                <Text style={styles.screenAccountButtonText}>Apagar</Text>
            </TouchableOpacity>
            
        </View>
            <TouchableOpacity
                style={styles.screenAccountButton}
                onPress={()=>{this.return()}}>
                <Text style={styles.screenAccountButtonTextBlack}>Retornar</Text>
            </TouchableOpacity>
      </View>
    );
  }
}