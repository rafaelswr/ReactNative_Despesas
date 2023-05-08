import React from "react"
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import { Ionicons } from "@expo/vector-icons";

const BottomNavBar = (props) => {

        const colorPerfil ={
              color: props.perfil ? "#1a6dc0" : "black",
        }
        const colorHistorico ={
                color: props.historico ? "#1a6dc0" : "black",
        }
        const colorHome ={
                color: props.home ? "#1a6dc0" : "black",
        }
        const colorLogout ={
                color: props.logout ? "#1a6dc0" : "black",
        }


return (
      <View style={{backgroundColor:"white",borderTopColor:"black", borderTopWidth:2, height:60, flexDirection:"row", justifyContent:"space-around"}}>
            <TouchableOpacity onPress={()=>{}}>
                    <View style={{padding:5}}>
                        <Ionicons name="person" size={25} style={[styles.icon,colorPerfil]}></Ionicons> 
                       <Text style={[styles.text,colorPerfil]}>Perfil</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}>
                    <View style={{ padding:5}}>
                        <Ionicons name="book" style={[styles.icon,colorHistorico]} size={25} ></Ionicons> 
                       <Text style={[styles.text,colorHistorico]}>Historico</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}>
                    <View style={{ padding:5}}>
                        <Ionicons name="home" size={25} style={[styles.icon,colorHome]}></Ionicons> 
                       <Text style={[styles.text,colorHome]}>home</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}>
                    <View style={{ padding:5}}>
                        <Ionicons name="log-out"size={25} style={[styles.text,colorLogout]}></Ionicons> 
                       <Text style={[styles.text,colorLogout]}>logout</Text>
                    </View>
            </TouchableOpacity>

        </View>
   
  )
};

const styles = StyleSheet.create({
        icon:{
                alignSelf:"center",
        },
        text:{
          fontWeight:500,      
        },
})

export default BottomNavBar;

