import React from "react"
import {View, Text,Image,ScrollView, StyleSheet} from "react-native"
import MyButtons from "../components/MyButtons";

const FirstPage = ({navigation}) => {
    return(
        <ScrollView showsVerticalScrollIndicator={false}> 
            <View style={styles.imageContainer}> 
            <Image style={{width:200, height:200}} source={require("../assets/logoApp.jpg")}/>
            <Text style={styles.title}>MINHAS DESPESAS</Text>
            <Text style={styles.subtitle}> As suas contas num só lugar</Text>
            <View style={{marginVertical:40}}>
                <MyButtons  title="Entrar" width={350} color="#1a6dc0"
                            onPress={() => {navigation.navigate('Login')}}></MyButtons>
                <MyButtons  title="Registar" width={350} color="#1a6dc0"
                            onPress={() => {navigation.navigate('Registar')}}></MyButtons>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imageContainer:{
        alignItems: 'center',
        justifyContent: "flex-start",
        paddingTop:40,
    },
    title:{
        fontSize:35,
        fontFamily:"Roboto",
        fontWeight:"400",
    },
    subtitle:{
        fontSize:20,
        color:"#aaadac",
        fontFamily:"Roboto",
        paddingVertical:30, 
    }
}); 

export default FirstPage;

