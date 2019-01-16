import React, { Component } from 'react'
import {ImageBackground} from 'react-native';
export default class AppBackgroundImage extends Component {
    render() {
        const {source, children} = this.props;
        return (
            <ImageBackground 
                source = {source}
                style = {
                    {
                        flex:1,
                        width:null,
                        height:null
                    }
                }>{children}</ImageBackground>
        );
    }
}