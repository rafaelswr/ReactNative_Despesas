import React,{useState} from "react"
import {View, Text, StyleSheet,Image,TextInput,ScrollView, TouchableOpacity} from "react-native"
import TopNavBar2 from "../components/TopNavBar2";
import MyButtons from "../components/MyButtons";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import datas from "../services/data.json";
import { useImagePicker } from "../services/imageService";


const Registar = (props) => {

  const {selectedImage,modalVisible, ModalPress, openModal,removePhoto } = useImagePicker();

  const [name, setName ] = useState("");
  const [apelido, setApelido ] = useState("");
  const [username, setUsername ] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [morada, setMorada ] = useState("");
  const [codPostal_1,setCodePostal_1] = useState("");
  const [codPostal_2,setCodePostal_2] = useState("");

  const postalCode = `${codPostal_1}-${codPostal_2}`;
  const [city, setCity] = useState("-");
  const [date, setDate] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [validForm, setValidForm ] = useState(false);

  
  const handlingUsername = async ()=>{
    //checks if username exists on firestore
    //const UserNameinUse= await firebase.firestore().collection('users').where('username', '==', username).get();
   // if(UserNameinUse.empty){
    if(true){   
      setValidUsername(true);
    }else{
      setValidUsername(false);
    }

  }

  const handlingSubmit = async ()=>{
    if(validPassword && validUsername ){
      
       const newUser = {
        id:datas.users.length+1, 
        nome:name,
        sobrenome:apelido,
        dataNascimento:date,
        username,   
        password,
        morada,
        cidade:city,
        codigo_postal:postalCode,
      };
      
     console.log("success");
    
    }
    
  }

  const handlePassword = ()=>{
    if(password !== confirmPassword){
      setValidPassword(false); 
    }else{
      setValidPassword(true);
    }

  }


  return (
    <> 
      <TopNavBar2 leftIconName="arrow-back-outline"></TopNavBar2>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, margin:10}}>
        <View>
          <Text style={{textAlign:"center", fontSize:45, fontWeight:300,}}>Minhas Despesas</Text>
        </View>
        <View style={{marginVertical:20,flex:1,marginHorizontal:40,}}>
          <Text style={{textAlign:"center", fontSize:15, fontWeight:200,}}>Preencha os campos abaixo para começar a utilizar a app</Text>
        </View>
        <View style={{borderWidth:2,borderColor:"#da721d"}}></View> 
        <View style={{flexDirection:"row", height:92, marginVertical:10,}}>
                <View style={{ flex:1, paddingHorizontal:5,}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Nome</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={name}  onChangeText={setName} placeholder="Primeiro Nome" 
                        style={styles.textInputContainer}></TextInput>

                </View>
                
                <View style={{ flex:1, paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Apelido</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={apelido}  onChangeText={setApelido} placeholder="Último Nome" 
                        style={styles.textInputContainer}></TextInput>
                        
                </View>
          </View>

          <View style={{height:92, paddingLeft:5}}>
                <Text style={{fontSize:17, fontWeight:500}}>Data de Nascimento</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{flex:0.8}}>
                        <TextInput value={date} onChangeText={setDate} dataDetectorTypes="calendarEvent" placeholder="aaaa/mm/dd"  style={styles.textInputContainer}></TextInput>
                    </View>
                    <Ionicons style={{ paddingLeft:5}} size={30} name="calendar-outline"></Ionicons>
                </View>
            </View>
        
            <View style={{flexDirection:"row", marginVertical:5}}>

                <View style={{flexDirection:"column", flex:0.6,}}>
                    <View style={{ flex:0.5, paddingHorizontal:5, height:90}}>
                        <Text style={{fontSize:17, fontWeight:500}}>Username</Text>
                        <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={50} value={username} onEndEditing={handlingUsername}  onChangeText={setUsername} placeholder="nome de utilizador" 
                            style={[styles.textInputContainer,  !validUsername && styles.invalidInput]}></TextInput>
                          {!validUsername &&  <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Username já existe </Text>}
                    </View>
                    <View style={{ flex:0.4,paddingVertical:10, marginBottom:10, paddingHorizontal:5}}>
                        <TouchableOpacity style={{backgroundColor:"#a47c06", padding:10,borderRadius:10}} onPress={()=>openModal()}>
                            <Text style={{alignSelf:"center", color:"white"}}>Upload Foto (Opcional)</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                 {selectedImage && 
                  <View style={{ flex:0.40,justifyContent:"center", alignItems:"center"}}>
                      <Image resizeMode="contain"  source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
                      <View>

                        <TouchableOpacity style={{backgroundColor:"red",padding:5, marginTop:5}} onPress={()=>{removePhoto()}}>
                          <Text style={{alignSelf:"center",color:"black", fontWeight:"bold"}}>Excluir Foto</Text>
                        </TouchableOpacity> 
                        </View>
                    </View>     
                  }
               
            </View>
           
            <View style={{flexDirection:"row",height:92,marginTop:5}}>
                <View style={{ flex:0.5,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Password</Text>
                    <TextInput secureTextEntry placeholder="*******" numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={password}  onChangeText={setPassword}
                        style={[styles.textInputContainer, !validPassword && styles.invalidInput]}></TextInput>
                </View>
                <View style={{ flex:0.5,paddingHorizontal:5 ,justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:13, fontWeight:"bold"}}> *Password dever ser composta por, pelo menos, 6 letras das quias 1 maiúscula, 1 minúscula e caracteres especiais.</Text>
                </View>

            </View>
             
            <View style={{flexDirection:"row",height:92}}>
                <View style={{ flex:1,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Confirmar Password </Text>
                    <TextInput placeholder="*******" onEndEditing={handlePassword} secureTextEntry numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={confirmPassword}  onChangeText={setConfirmPassword}
                        style={[styles.textInputContainer, !validPassword && styles.invalidInput]}></TextInput>    
                    {
                      !validPassword &&  <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Passwords não coincidem </Text>
                    }
                    
                </View>

            </View>
             
            <View style={{flexDirection:"row",height:92}}>
                <View style={{ flex:1,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Morada</Text>
                    <TextInput  numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={morada}  onChangeText={setMorada} placeholder="Rua, número de porta" 
                        style={styles.textInputContainer}></TextInput>
           
                </View>

            </View>
            

            <View style={{flexDirection:"row", height:92}}>
                <View style={{ flex:1, paddingHorizontal:5,}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Cidade</Text>
                    <ScrollView>
                    <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                        <Picker style={{borderColor:"red", width:210, borderWidth:1}} mode="dropdown" 
                              selectedValue={city} onValueChange={(value)=>setCity(value)}>
                        <Picker.Item label="-" value="-"></Picker.Item>
                        {datas.cities.map((city, index) => (
                            <Picker.Item key={index} label={city} value={city} />
                            
                        ))}
                
                    </Picker>
                   
                    </View>
                    </ScrollView>
                </View>
                <View style={{flex:0.60,paddingHorizontal:10}}>
                    <Text style={{fontSize:17, fontWeight:"500"}}>Código Postal</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput keyboardType="numeric" numberOfLines={1} autoComplete="off" autoCorrect={false}
                            maxLength={4} placeholder="0000" value={codPostal_1} onChangeText={setCodePostal_1}
                            style={[styles.textInputContainer,{flex:0.6}]}></TextInput>
                        <Text style={{alignSelf:"center", fontSize:14,paddingHorizontal:5,}}>-</Text>
                        <TextInput keyboardType="numeric" numberOfLines={1} autoComplete="off" autoCorrect={false}
                            maxLength={3} placeholder="000" value={codPostal_2} onChangeText={setCodePostal_2}
                            style={[styles.textInputContainer,{flex:0.4}]}></TextInput>
                    </View>
                </View>
            </View>

          <MyButtons isDisabled={!validForm} onPress={handlingSubmit} title="Registar" width={350} color="#1a6dc0"></MyButtons>
      </ScrollView>
                          {modalVisible && <ModalPress></ModalPress>}
    </>
  )
};

export default Registar; 

const styles=StyleSheet.create({
  textInputContainer:{
    paddingLeft:10,
    borderRadius:8, 
    borderColor: "#cacaca",
    borderWidth:1,
    height:50, 
    shadowColor: '#56000c',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor:"white",
    fontSize:17,
},
invalidInput:{
  borderColor:"red",
}
});