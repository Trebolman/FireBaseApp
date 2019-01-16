import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// importando componente de boton creado en components
import AppButton from './application/components/button';
import AppBackgroundImage from './application/components/BackgroundImage';
import AppPreLoader from './application/components/PreLoader';
import AppStart from './application/screens/Start';
import Login from './application/screens/Login';
import Router from './application/navigation/guest';

import * as firebase from 'firebase';
import firebaseconfig from './application/utils/firebase';

firebase.initializeApp(firebaseconfig);

export default class App extends React.Component {
  constructor(){
    firebase.auth().signOut();
    console.log("constructor");
    super()
    // console.log(firebase.auth().currentUser);
    this.state={
      isLogged:false,
      loaded:false
    }
  }

  componentWillMount(){
    console.log("componentWillMount");
  }
  
  async componentDidMount(){
    console.log("componentDidMoount");
    await firebase.auth().onAuthStateChanged((user)=>{
      // esta funcion se ejecuta cada vez que el usuario cambia de sesión de activo a inactivo o viceversa
      // esta funcion es asincrona
      if(!user){
        this.setState({
          isLogged:false,
          loaded:true //Si se ha cargado el screen o no. Y asi es
        })
      }else{
        this.setState({
          isLogged:true,
          loaded:true //Si se ha cargado el screen o no. Y asi es
        })
      }
      
    });
  }

  render() {
    console.log("render");
    const {isLogged, loaded} = this.state;
    if(!loaded){
      console.log("Esta cargando...");
      return(<AppPreLoader></AppPreLoader>); 
    }
    if(isLogged){
      console.log("Existia una sesion abierta previamente");
      return(<Text style={styles.center}>Screen de usuario loggeado</Text>)
    }else{
      console.log("No existe usuario loggeado");
      return (<Router></Router>); //Similar a nuestro routerLink
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  center:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})