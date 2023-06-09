import React from "react"
import {View, Text, TouchableHighlight, Alert} from "react-native"
import { Ionicons } from "@expo/vector-icons";
import adminStyles from "../../styles/adminStyles.jsx";

const AdminTopNav = (props) => {
  return (
    <View style={adminStyles.containerNav}>
        {props.backIconName &&
            <View style={{flex:0.12}}>
                <TouchableHighlight underlayColor="#efefef" onPress={props.OnBackPress}>
                    <Ionicons name={props.backIconName} size={37} color="black"></Ionicons>
                </TouchableHighlight>
            </View>
        }
        <View style={{flex:1, flexDirection:props.userAdmin && "row"}}>
            <Text style={adminStyles.titleNav}>{props.title}</Text>
            {
                props.userAdmin && <Text style={adminStyles.titleNav}>,{props.userAdmin}</Text>
            }
        </View>
        {props.iconName &&
            <View style={{flex:0.12}}>
                <TouchableHighlight underlayColor="#efefef" onPress={props.OnPress}>
                    <Ionicons name={props.iconName} size={37} color="black"></Ionicons>
                </TouchableHighlight>
            </View>
        }
    </View>
  )
};

export default AdminTopNav;
