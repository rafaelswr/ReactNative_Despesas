import React from "react"
import {View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native"
import {Ionicons} from "@expo/vector-icons";

const TopNavBar = (props) => {

  return (
    <View style={styles.container}>
            {props.leftIconName && 
                <View style={{flex:0.3}}>
                    <TouchableWithoutFeedback onPress={()=>{}}>
                        <Ionicons name={props.leftIconName} size={34} color={"white"}></Ionicons>
                    </TouchableWithoutFeedback>
                </View>
            }
            <View style={{flex:2}}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            {props.rightIconName &&  
            <View style={{flex:0.3, justifyContent:"center", alignItems:"flex-end"}}>
                <TouchableWithoutFeedback onPress={()=>{}}>
                    <Ionicons name={props.rightIconName} size={36} color={"white"}></Ionicons>
                </TouchableWithoutFeedback>
            </View>
            }
           
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        height:90,
        borderBottomColor:"black", 
        borderBottomWidth:3, 
        backgroundColor:"#1b6cc0",
        flexDirection:"row",
        alignItems:"flex-end",
        paddingHorizontal:15,
        paddingBottom:10,
    }, 

    title:{
        color:"white",
        fontSize:23,
        marginBottom:5,
        fontWeight:500,
    }
})

export default TopNavBar;
