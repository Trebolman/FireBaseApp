import React, {Component} from 'react';
import { View } from 'react-native';

import BackgroundImage from '../components/BackgroundImage';
import Button from '../components/button';

import t from 'tcomb-form-native';
import FormValidation from "../utils/validations";

import { Card } from 'react-native-elements';

import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';

const Form = t.form.Form;

export default class Login extends Component{
    login(){
        // obtiene el formulario
        const validate = this.refs.form.getValue(); //getElementById().value
        // Si no han sido validados, devuelven null
        // Si se validaron correctamente, validate tiene un json con los campos
        // console.log(validate.email);
        // console.log(validate.password);
        if(validate !== null){
            firebase.auth().signInWithEmailAndPassword(validate.email,validate.password)
                .then(()=>{ //cuando se envia resolve
                    Toast.showWithGravity("Bienvenido", Toast.LONG, Toast.TOP);
                })
                .catch((error)=>{ //cuanso se envia reject
                    Toast.showWithGravity(error.message, Toast.LONG, Toast.TOP);
                });            
        }else{
            Toast.showWithGravity("Los campos son inválidos", Toast.LONG, Toast.TOP);
        }
    }

    render(){
        // creando el modelo user
        const user = t.struct({
            // email: t.String,
            email: FormValidation.email,
            // password: t.String
            password: FormValidation.password
        });

        const options = {
            fields:{
                email:{
                    help:"Introduce tu email", //placeholder
                    error:"Email incorrect", //validate
                    autoCapitalize: 'none' //auto mayuscula
                },
                password:{
                    help: "Introduce tu email",
                    error: "Email incorrect",
                    password: true, /* ****** */
                    secureTextEntry: true
                }
            }
        }
        return(
            <BackgroundImage source={require('../../assets/Images/fondo_back.jpg')}>
                <View>
                    <Card
                        wrapperStyle={{paddingLeft:10}}
                        title="Iniciar sesion">
                            <Form 
                                ref="form" //Es como el getElementsById
                                type={user}
                                options={options}
                                >
                            </Form>
                            <Button
                                bgColor="#2A7FFF"
                                title="Login"
                                action={this.login.bind(this)}
                                iconSize={15}
                                iconColor="#55FFAA">
                            </Button>
                    </Card>
                </View>
            </BackgroundImage>
        );
    }
}