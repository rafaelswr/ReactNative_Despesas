import React,{useState} from "react";
import {View, Text, StyleSheet, TextInput, Alert} from "react-native";
import adminStyles from "../styles/adminStyles";
import geralStyles from "../styles/geralStyles";
import MyButtons from "../components/MyButtons";

const NewPassword = (props) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);
    
    const handlePassword = ()=>{
        if(password !== confirmPassword){
          setValidPassword(false); 
        }else{
          setValidPassword(true);
        }
    }

    return (
    <View style={adminStyles.containerMain}>
        <Text style={styles.headerText}>Nova Password</Text>
        <View style={adminStyles.horizontalLine}></View>
        <View style={{paddingHorizontal:5 }}>
            <Text style={{fontSize:18}}> *Password dever ser composta por 6 letras, 1 maiúscula, 1 minúscula e caracteres especiais.</Text>
        </View>
        <View style={styles.containerPasswords}>
            <View style={{flexDirection:"row",height:92}}>
                <View style={{ flex:1,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Password</Text>
                    <TextInput secureTextEntry numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={password} placeholder="*******"  onChangeText={setPassword}
                        style={[geralStyles.textInputContainer, !validPassword && geralStyles.invalidInput]}></TextInput>
                </View>
                
            </View>
             
            <View style={{flexDirection:"row",height:92}}>
                <View style={{ flex:1,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Confirmar Password </Text>
                    <TextInput placeholder="*******" onEndEditing={handlePassword} secureTextEntry numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={confirmPassword}  onChangeText={setConfirmPassword}
                        style={[geralStyles.textInputContainer, !validPassword && geralStyles.invalidInput]}></TextInput>    
                    {
                      !validPassword &&  <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Passwords não coincidem </Text>
                    }
                    
                </View>

            </View>
        </View>
        <View style={{flexDirection:"row"}}>
            <View style={{flex:1}}>
                <MyButtons onPress={()=>{Alert.alert('Novo Método adicionado!')}} title="Guardar" color="#1a6dc0"></MyButtons>
            </View>
            <View style={{flex:1}}>
                <MyButtons onPress={()=>{props.navigation.goBack()}}  
                           title="Cancelar" 
                           color="#989696"></MyButtons>
            </View>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    headerText:{
        fontSize:30,
        fontWeight:600,
    },
    containerPasswords:{
        marginVertical:30,
    }
})

export default NewPassword;
