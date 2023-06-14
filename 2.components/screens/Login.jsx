import {useState, useReducer} from "react";
import * as React from 'react';
import {View, Text,TextInput,ScrollView, StyleSheet,Image, Pressable} from "react-native";
import MyButtons from "../components/MyButtons";
import geralStyles from "../styles/geralStyles";
import { loginReducer } from "../services/loginService";

const Login = ({ navigation }) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);

    const [state, dispatch]= useReducer(loginReducer, {focusEmail:false, focusPassword:false});

    const onFocusPassword = _ => dispatch({ type: 'focusPassword' });
    const onFocusEmail  = _ => dispatch({type:"focusEmail"});
    const onBlurPassword = _ => dispatch({ type: 'blurPassword' });
    const onBlurEmail  = _ => dispatch({type:"blurEmail"});




    const onSubmitHandler = () => {
              
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(emailRegex.test(email)){
            setValidEmail(true);
        }else{
            setValidEmail(false);
            console.log("email is invalid");
        }
    }   
        


    return(
        <ScrollView style={{flex:1, margin:10}} showsHorizontalScrollIndicator={false}> 
            <View style={[styles.imageContainer]}>
                <Image style={{width:150, height:150}} source={require("../assets/logoApp.jpg")}/>
            </View>
            <View>
                <Text style={{fontSize:25,textAlign:"center", fontWeight:500}}>Olá, seja muito bemvindo!</Text>
            </View>
            <View style={{marginTop:40, padding:20,}}>
                <View style={{height:95}}>
                    <Text style={{fontSize:18,fontWeight:500}}>Email</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={email} keyboardType="email-address" onBlur={onBlurEmail} onFocus={onFocusEmail} 
                    onChangeText={value=>{setValidEmail(true); setEmail(value);}} placeholder="Insira o seu email" 
                        style={[styles.textInputContainer ,!validEmail && geralStyles.invalidInput, state.focusEmail && geralStyles.inputFocused]}/>
                    {validEmail==false && <Text style={{color: 'red',fontWeight:"bold"}}>Por favor, insira um email válido</Text>}
                </View>
                <View style={{height:95}}>
                    <Text style={{fontSize:18, fontWeight:500}}>Password</Text>
                    <TextInput secureTextEntry numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={password} onFocus={onFocusPassword} onBlur={onBlurPassword} onChangeText={setPassword} placeholder="Insira a sua password" 
                        style={[styles.textInputContainer, state.focusPassword && geralStyles.inputFocused]}></TextInput>
                </View>
            </View>
            <View style={{marginBottom:10}}>
                <MyButtons onPress={()=>onSubmitHandler()}  
                           title="Entrar" width={320} color="#1a6dc0"></MyButtons>
            </View>
            
            <Pressable onPress={() => {navigation.navigate('NewPassword')}}>
                       <Text style={{color:"#1a6dc0", textAlign:"center", paddingVertical:10}}>Esqueci-me da Password</Text>
            </Pressable>

            <View style={{flexDirection: 'row', justifyContent:'center', alignItens:'center', paddingVertical:10}}>
                <Text style={{color:"black", fontSize:15, textAlign:"center"}}>Ainda não tem conta?</Text>
                <Pressable onPress={() => {navigation.navigate('Registar')}}>
                           <Text style={{color:"#1a6dc0"}}> Clique aqui!</Text>
                </Pressable>
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
    },
    textInputContainer:{
        paddingLeft:10,
        borderRadius:0, 
        borderColor:"#cacaca",
        borderWidth:1,
        height:50, 
        shadowColor: '#56000c',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor:"white",
        fontSize:17,
    }
}); 

export default Login; 