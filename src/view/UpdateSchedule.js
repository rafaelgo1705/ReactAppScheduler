import React from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import styles from '../utility/styles';
import api from '../services/api';
import { ScrollView } from 'react-native-gesture-handler';

export default class UpdateSchedule extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      id: null, 
      name: "", 
      date: "", 
      dateView: "",
      hour: "", 
      created_at: "", 
      updated_at: "",
      showAlert: false,
      showAlertSucess: false,
      showAlertLoad: false,
      showAlertDelete: false,
      titleAlertSucess: "",
      titleAlertLoad: "",
      error: "",
      show: false,
      datePicker: new Date(),
      mode: ""
    }

  }

  componentDidMount = () => {
      this.getData()

  }

  getData = async () => {
    this.setState({
      titleAlertLoad: "Carregando atividade...",
      showAlertLoad: true
    })
    const { route } = this.props;
    const { idActivity } = route.params

    await api.get('/schedule/'+idActivity)
    .then((response) => {
        const get = response.data
        get.map((get) => {
            const {id, name, date, hour, created_at, updated_at} = get;
            this.setState({
              id: id, 
              name: name,
              date: date, 
              dateView: moment(new Date(date)).format("DD-MM-YYYY"),
              hour: hour, 
              created_at: created_at, 
              updated_at: updated_at
            }, () => {
              this.setState({
                titleAlertLoad: "",
                showAlertLoad: false
              })
            })
        })
    })
  }

  validate = () => {
    this.setState({ error: "" })
    let error = "";

    if (this.state.name == ""){
      error += "O campo Nome está vazio!\n";
    }

    if (this.state.date == ""){
      error += "O campo Data está vazio!\n";
    }

    if (this.state.hour == ""){
      error += "O campo Hora está vazio!\n";
    }

    if (error.length > 0){
      this.setState({ 
        titleAlertLoad: "",
        showAlertLoad: true,
        error: error,
        showAlert: true
      })
      return false;

    }else{
      return true;
    }
  }

  editActivity = async () => {
    this.setState({
      titleAlertLoad: "Salvando alterações...",
      showAlertLoad: true
    })

    if (this.validate()) {
      const data = {
        name: this.state.name,
        date: this.state.date,
        hour: this.state.hour,
      }
  
      await api.put('/schedule/'+this.state.id, {
        ...data
      }).then((response) => {
        this.setState({
          titleAlertSucess: "Atividade alterada!",
          titleAlertLoad: "",
          showAlertLoad: false,
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

  deleteActivity = async () => {
    this.setState({
      titleAlertLoad: "Deletando atividade...",
      showAlertLoad: true
    })
    await api.delete('/schedule/'+this.state.id)
    .then( (response) => {
      this.setState({
        showAlert: false,
        titleAlertLoad: "",
        showAlertLoad: false,
        showAlertDelete: false,
        showAlertSucess: true,
        titleAlertSucess: "Atividade deletada!",
      }) 
    })
  }

  return = () => {
    const { navigation, route } = this.props;
    navigation.goBack();
    route.params.onStateRegister({ stateRegister: true });
  }

  returnSimple = () => {
    this.props.navigation.goBack()
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    let formatDate = moment(new Date(currentDate)).format('YYYY-MM-DD');
    let formatDateView = moment(new Date(currentDate)).format('DD-MM-YYYY');
    let formatHour = moment(new Date(currentDate)).format('HH:mm');

    if(!(formatDate === 'Invalid date') || !(formatDateView === 'Invalid date')){
      if (this.state.mode === 'date'){
        this.setState({
          show:false,
          datePicker: currentDate,
          date: formatDate,
          dateView: formatDateView
        })
  
      }else if (this.state.mode === 'time') {
        this.setState({
          show:false,
          hour: formatHour
        })
      }
    }
    
    if(!(formatHour === 'Invalid date')){
      if (this.state.mode === 'date'){
        this.setState({
          show:false,
          datePicker: currentDate,
          date: formatDate,
          dateView: formatDateView
        })
  
      }else if (this.state.mode === 'time') {
        this.setState({
          show:false,
          hour: formatHour
        })
      }
    }
    
  };

  showMode = (currentMode) => {
    this.setState({
      show: true,
      mode: currentMode
    })
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent:'center'}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.screenLogin}>
            {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.datePicker}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          )}
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
            message={this.state.titleAlertSucess}
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
          <AwesomeAlert
          show={this.state.showAlertDelete}
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
              showAlertDelete: false,
            })
          }}
          onConfirmPressed={() => {
            this.deleteActivity()
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
            <View style={{flex:1, alignItems: "stretch", justifyContent: "center"}}> 
                <View style={{alignItems:'center'}}>
                  <Image
                      style={styles.screenLoginImage}
                      source={require('../utility/img/imgActivity.png')}
                  />
                </View>

                <TextInput
                  style={styles.screenLoginInput}
                  value={this.state.name}
                  onChangeText={(text) => { this.setState({ name:text }) }}
                  placeholder= 'Nome...'
                  textContentType='none'
                  keyboardType='default'
                />

                <View style={{flexDirection: "row", alignItems:'center'}}>
                  <View style={{flex:5}}>
                    <TextInput
                      style={styles.screenLoginInput}
                      value={this.state.dateView}
                      onChangeText={(text) => { this.setState({ date:text }) }}
                      placeholder= 'Data...'
                      textContentType='none'
                      keyboardType='numeric'
                    />
                  </View>
                  <View style={{flex:1}}>
                    <TouchableOpacity 
                      style={styles.registerScreenButtonImg}
                      onPress={ () => { this.showMode('date')}}>
                      <Image source={ require('../utility/img/imgDate.png') } style={{ width: 35, height: 35}} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{flexDirection: "row", alignItems:'center'}}>
                  <View style={{flex:5}}>
                    <TextInput
                      style={styles.screenLoginInput}
                      value={this.state.hour}
                      onChangeText={(text) => { this.setState({ hour:text }) }}
                      placeholder= 'Hora...'
                      textContentType='none'
                      keyboardType='default'
                  />
                  </View>
                  <View style={{flex:1}}>
                    <TouchableOpacity 
                    style={styles.registerScreenButtonImg}
                    onPress={ () => { this.showMode('time')}}>
                      <Image source={ require('../utility/img/imgClock.png') } style={{ width: 35, height: 35}} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <TouchableOpacity
                    style={styles.screenAccountButton}
                    onPress={()=>{this.editActivity()}}>
                    <Text style={styles.screenAccountButtonTextBlack}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.screenAccountButtonDelete}
                    onPress={()=>{this.setState({ showAlertDelete: true })}}>
                    <Text style={styles.screenAccountButtonText}>Apagar</Text>
                </TouchableOpacity>
                
            </View>
            <TouchableOpacity
                style={styles.screenAccountButton}
                onPress={()=>{this.returnSimple()}}>
                <Text style={styles.screenAccountButtonTextBlack}>Retornar</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    );
  }
}