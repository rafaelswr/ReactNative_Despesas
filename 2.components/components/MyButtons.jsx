import React from "react"
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"

const MyButtons = (props) => {

    const button  = {
        backgroundColor:props.isDisabled ? "grey":props.color,
        padding:15,
        borderRadius:props.radius ? props.radius : 8 ,
        width:props.width ? props.width : null,
        margin:10,
    };

    return(
        <View >
            <TouchableOpacity disabled={props.isDisabled} underlayColor="#969797" onPress={props.onPress} style={button}> 
                <Text style={styles.touchText}>{props.title}</Text>
            </TouchableOpacity> 
        </View>
    );
}

const styles = StyleSheet.create({
    touchText:{
        color:"white",
        fontWeight:"500",
        textAlign:"center"
    }
});

export default MyButtons; 
