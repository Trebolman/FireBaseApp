import React, { Component } from 'react'
// importanto el elemento button de react-native
import { Button } from 'react-native-elements';

// importando el elemento Dimensions de react-native para obtner las dimensiones de la pantlla del dispotivo
import { Dimensions } from 'react-native';

// importando componente para hacer uso de iconos
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AppButton extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        // var title = 'Click aqui';
        // var title = this.props.title;
        const {iconName, iconColor, bgColor, action, iconSize} = this.props; //por destructuracion
        const title =this.props.title;
        // gracias a la libreria dimensions definiremos el tamaño de la pantalla
        const {width} = Dimensions.get('window'); //obteniendo el ancho de la pantalla
        
        return (
            <Button 
                text={8}
                title={title}
                icon={<Icon 
                    name = {iconName} 
                    size = {iconSize} 
                    color = {iconColor}>
                    </Icon>}
                buttonStyle = 
                {
                    {
                        backgroundColor: bgColor,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginBottom: 5,
                        marginLeft: 0,
                        width: width
                    }
                }
                iconRight={true}
                onPress={action}>
            </Button>
            
        );
    }
}