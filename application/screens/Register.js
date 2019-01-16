import React, { Component } from 'react';
import { View } from 'react-native';

import BackgroundImage from '../components/BackgroundImage';
import Button from '../components/button';

import t from 'tcomb-form-native'; //nos ofrece validaciones
import FormValidation from "../utils/validations";

import { Card } from 'react-native-elements';

import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from "react-navigation";
const Form = t.form.Form;

export default class Register extends Component {
    constructor() {
        super()
        // creamos nuestra variable de estado
        this.state = {
            user: {
                email: '',
                password: ''
            }
        }
        // creando validador
        this.samePassword = {
            // creamos una regla
            mismoPassword: t.refinement(t.String, (passIngresado) => {
                // if(passIngresado === this.state.user.password){
                //     return true;
                // }else{
                //     return false;
                // }
                return passIngresado === this.state.user.password;
            })
        }
        this.validate = null; // creando variable
    }

    
    onChange(event) {
        console.log(event);
        
        this.setState({
                user: event
            })
    }
        
    register() {
        console.log();
        this.validate = this.refs.form.getValue();
        if(this.validate !== null){
            firebase.auth().createUserWithEmailAndPassword(this.validate.email, this.validate.password)
                .then(()=>{
                    Toast.showWithGravity("Usuario creado", Toast.LONG, Toast.BOTTOM);
                    this.setState({
                        user:{
                            email:'',
                            password:''
                        }
                    });

                    const navigateAction = NavigationActions.navigate({routeName: 'Login'});
                    this.props.navigation.dispatch(navigateAction); 
                })
                .catch((err)=>{
                    console.log("Error: "+err);
                });
        }
    }
    
    render() {
        
    const user = t.struct({
        // email: t.String,
        email: FormValidation.email,
        password: FormValidation.password,
        passwordConfirm: this.samePassword.mismoPassword
    });

    const options = {
        fields: {
            email: {
                help: "Introduce tu email", //placeholder
                error: "Email incorrect", //validate
                autoCapitalize: 'none' //auto mayuscula
            },
            password: {
                help: "Ingrese su contraseña",
                error: "La contraseña debe tener mas de 6 digitos",
                password: true, /* ****** */
                secureTextEntry: true
            },
            passwordConfirm: {
                help: "Repita su contraseña",
                error: "Las contraseñas no coinciden",
                password: true, /* ****** */
                secureTextEntry: true
            }
        }
    }

        return (
            <BackgroundImage
                source={require("../../assets/Images/fondo_back.jpg")}>
                <View>
                    <Card wrapperStyle={{ paddingLeft: 10 }} title="Registrarme">
                        <Form
                            ref="form"
                            type={user}
                            options={options}
                            onChange={(event) => { this.onChange(event) }}
                            value={this.state.user} //para que el texto no se borre apenas se escribe
                            >
                        </Form>
                        <Button
                            bgColor="#FF2A2A"
                            title="Registrar"
                            action={this.register.bind(this)}
                            // iconName="user-plus"
                            iconSize={15}
                            iconColor="#55FFAA">
                        </Button>
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
} 