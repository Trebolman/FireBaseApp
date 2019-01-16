import React, {Component} from 'react';
import { View } from 'react-native';

import BackgroundImage from '../components/BackgroundImage';
import Button from '../components/button';

import t from 'tcomb-form-native';
import FormValidation from "../utils/validations";

import { Card } from 'react-native-elements';

import * as firebase from 'firebase';

export default class Restaurants extends Component{
    constructor(){
        super()
        this.state = {
            restaurants:[],
            loaded:false,
            restaurant_logo:"D:\iTrebolSoft\WebApp_React_Firebase\FireBaseApp\assets\Images\restaurant.png"
        }
        this.refRestaurants = firebase.database.ref().child('restaurants'); //cuando estemos en firebase hay varios hilos. 
        // existen ahi hilos que se guardan similarmente a mongo
    }
    componentDidMount(){
        console.log("componentDidMount");
        this.refRestaurants.on('value',(snapshot)=>{
            let restaurants = [];
            snapshot.forEach((registro)=>{
                restaurants.push({
                    id:registro.key, //como mongo, se crea un id
                    name: registro.val().name,
                    address: registro.val().address,
                    capacity: registro.val().capacity,
                    description: registro.val().description
                });
            });
        }); //colocamos dos valores (value, callback)

        this.setState(
            {
                restaurants:restaurants,
                loaded:true
            }
        )
        console.log("finComponenteDidMount");
    }
}