import React  from "react";
import { createStackNavigator, createAppContainer } from "react-navigation"; //react navigation es un sistema de enrutamiento
import AppStart from '../screens/Start';
import AppLogin from '../screens/Login';
import AppRegister from "../screens/Register";


const AppNavigator = createStackNavigator({
    Home:{
        screen:AppStart
    },
    Login:{
        screen:AppLogin
    },
    Register:{
        screen:AppRegister
    }
},{
    initialRouteName: "Home"
});

export default createAppContainer(AppNavigator);