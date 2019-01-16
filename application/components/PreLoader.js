import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default class AppPreLoader extends Component {
    render() {

        return (
            <View style={styles}>
                <ActivityIndicator style={{height:80}} size="large"/>
            </View>
        )
    }
}

// Creamos estilos
const styles = StyleSheet.create({
    preloader:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height:height,
        backgroundColor: '#FF7FD4'
    }
});