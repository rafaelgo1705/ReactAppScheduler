import axios from 'axios';

import { AsyncStorage } from 'react-native';

const api = axios.create({
    baseURL: 'http://192.168.0.101:3333',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
});

api.interceptors.request.use( async (config) => {
  try {
    const token = await AsyncStorage.getItem('@token')

    if (token){
      config.headers.Authorization = `Bearer ${token}`
    }

    return config

  } catch (error){
    console.log(error)
  }
})

export default api;