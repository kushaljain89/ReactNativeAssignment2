import React, {Component} from "react";
import {View, Text, Image} from "react-native";
import Styles from './styles';

class Splash extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: "Home"
    };

    constructor() {
        super();
    }

    render() {
        return (
            <View style={Styles.background}>
                <Image style={Styles.logo}
                       source={require('../../../images/logo.png')}/>
            </View>
        );
    }
}

export default Splash;
