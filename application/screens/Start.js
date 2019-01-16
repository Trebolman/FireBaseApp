import React, { Component } from 'react';
import AppBackgroundImage from '../components/BackgroundImage';
import Button from '../components/button';

import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { NavigationActions } from "react-navigation";
import facebook from '../utils/facebook';
import firebase from 'firebase'; //importar a la biblioteca, no a los utils


export default class AppStart extends Component {
    static navigationOptions = {
        title: 'Aplicacion Daniele'
    }
    login() {
        console.log("Login");
        const navigateAction = NavigationActions.navigate({
            routeName: 'Login'
        });

        this.props.navigation.dispatch(navigateAction);
    }
    registrar() {
        console.log("Register");
        const navigateAction = NavigationActions.navigate({
            routeName: 'Register'
        });

        this.props.navigation.dispatch(navigateAction);
    }

    async facebook() {
        // Expo es una propiedad de React
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            facebook.config.application_id,
            {
                permissions: facebook.config.permissions
            }
        )
        if (type === "success") {
            console.log("success");
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=picture`);
            const info = await response.json();
            console.log(info);
            // Alert.alert("Nombre de usuario",`usuario concatenado con ${info.name}`);
            // Alert.alert("Foto de perfil",`${info.pic}`);
            // const credentials = firebase.auth.FacebookAuthProvider.credentials(token);
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            // console.log(credentials);
            // firebase.auth().signInWithCredential(credentials).catch((err)=>{ //el onAuthStateChanged cambia de estado
            //     console.log("Error catch");
            //     console.log(err);
            // });
            firebase.auth().signInAndRetrieveDataWithCredential(credentials).catch((err) => {
                console.log("Error catch");
                console.log(err);
            });
        } else if (type === "cancel") {//cuando el usuario pone cancelar
            console.log("El usuario canceló la acción");
        } else {
            console.log("Error desconocido");
        }
    }

    render() {
        return (
            <AppBackgroundImage source={require('../../assets/Images/fondo_back.jpg')}>
                <View style={styles.View}>
                    <Button
                        bgColor="#FF7FD4"
                        title="Ingresar"
                        action={this.login.bind(this)}
                        iconName="sign-in"
                        iconSize={30}
                        iconColor="#fff">
                    </Button>
                    <Button
                        bgColor="#7FAAFF"
                        title="Registrarme"
                        action={this.registrar.bind(this)}
                        iconName="user-plus"
                        iconSize={30}
                        iconColor="#fff">
                    </Button>
                    <Button
                        bgColor="#4267B2"
                        title="Facebook"
                        action={this.facebook.bind(this)}
                        iconName="facebook"
                        iconSize={30}
                        iconColor="#fff">
                    </Button>
                </View>
            </AppBackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: '#fff',
        //   alignItems: 'center',
        justifyContent: 'center'
    }
})