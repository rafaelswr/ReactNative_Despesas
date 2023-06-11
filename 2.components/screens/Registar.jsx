import React,{useEffect,useRef, useState} from "react"
import {View, Text, StyleSheet,Image,TextInput,ScrollView,Animated, TouchableOpacity} from "react-native"
import TopNavBar2 from "../components/TopNavBar2";
import MyButtons from "../components/MyButtons";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useImagePicker } from "../services/imageService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAllDataCollectionAsync } from "../services/firebaseService";


const Registar = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {selectedImage, modalVisible, ModalPress, openModal,removePhoto } = useImagePicker();

  const [name, setName ] = useState("");
  const [apelido, setApelido ] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername ] = useState("");
  const [morada, setMorada ] = useState("");
  const [codPostal_1,setCodePostal_1] = useState("");
  const [codPostal_2,setCodePostal_2] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  //validations states
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [validForm, setValidForm ] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  
  //Erro messages 
  const [errorEmail, setErrorEmail ] = useState("");
  const [errorPassword, setErrorPassword ] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword ] = useState("");
  const [errorUsername, setErrorUsername ] = useState("");


  //data
  const [date, setDate] = useState(null);
  const [dateString, setDateString] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const postalCode = `${codPostal_1}-${codPostal_2}`;
  //alert
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Duração da animação de fade em milissegundos
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowAlert(false);
          props.navigation.navigate("Login");
        });
      }, 2000); // Tempo de exibição do alerta em milissegundos
    });
  };



  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    confirmForm();
  }, [validConfirmPassword, validPassword, validEmail, validUsername]);

  useEffect(()=>{
    getAllDataCollectionAsync((value)=>{
      setCities(value)
    },"cidades");
  },[])

  const handleDate = (event,date) => {
    setShowPicker(false);
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setDateString(dateString);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  //função regular para requisitos mínimos da password  
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handlePassword = ()=>{
    if(password.trim()===""){
      setErrorPassword("Insira a password da sua conta!");
      setValidPassword(false);
    }else if(!passwordRegExp.test(password)){
      setErrorPassword("Password nao cumpriu os requistos mínimos");
      setValidPassword(false);
    }else{
      setErrorPassword("");
      setValidPassword(true);
    }
   
  }

  const handleConfirmPassword = ()=>{
    if(confirmPassword.trim()===""){
      setErrorConfirmPassword("Preencha a confirmação da password");
      setValidConfirmPassword(false);
    }else if(password !== confirmPassword){
      setErrorConfirmPassword("Passwords não coincidem!"); 
      setValidConfirmPassword(false);
    }else{
      setErrorConfirmPassword("");
      setValidConfirmPassword(true);
    }
   
  }


  
  //função regular para requisitos mínimos da password  
  const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleEmail = ()=>{
    //se email ja existe associado a algum utilizador
    if(email.trim()==""){
      setErrorEmail("Introduza o seu email!");
      setValidEmail(false);
    }else if(!emailRegExp.test(email)){
      setErrorEmail("Insira um email válido!"); 
      setValidEmail(false);
    }else{
      setErrorEmail("");
      setValidEmail(true);
    }
    

  }

  const handleUsername = ()=>{
    //checks if username exists on firestore
    //const UserNameinUse= await firebase.firestore().collection('users').where('username', '==', username).get();
   // if(UserNameinUse.empty){
    if(username.trim()===""){
      setErrorUsername("Introduza o nome de utilizador!");
      setValidUsername(false);
    }else{
      setErrorUsername("");
      setValidUsername(true);
    }
    
    
  }

  const confirmForm = ()=>{
    
    if(validConfirmPassword && validPassword && validEmail && validUsername){
      setValidForm(true);
    }else{
      setValidForm(false);
    }
  }


  const handlingSubmit = async ()=>{
    if(validForm){
      const newUser = {
        nome:name,
        sobrenome:apelido,
        dataNascimento:dateString,
        username,   
        password,
        morada,
        cidade:city,
        codigo_postal:postalCode,
      };
     console.log("success: ",newUser); 

     handleShowAlert();
    }
    
  }

  return (

    
    <> 
    
      <TopNavBar2 leftIconName="arrow-back-outline" title="Registo"
                  onPressLeft={() => {props.navigation.goBack()}}></TopNavBar2>
      
      {showAlert && (
        <Animated.View
          style={{
            backgroundColor: 'green',
            padding:10,
            opacity: fadeAnim,
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <Text style={{ color: 'white', fontSize: 17 }}>Registo Efetuado com sucesso!</Text>
        </Animated.View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, margin:10}}>
        <View>
          <Text style={{textAlign:"center", fontSize:45, fontWeight:300,}}>Minhas Despesas</Text>
        </View>
        <View style={{marginVertical:20,flex:1,marginHorizontal:40,}}>
          <Text style={{textAlign:"center", fontSize:15, fontWeight:500,}}>Preencha os campos abaixo para começar a utilizar a app</Text>
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

          <View style={{paddingLeft:5, flex:1}}>
                  <View  style={{flexDirection:"row", justifyContent:"flex-start",alignItems:"center"}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Data de Nascimento</Text>
                    <TouchableOpacity onPress={showDatePicker} style={{marginHorizontal:10}} >
                      <Ionicons style={{ paddingLeft:5}} size={40} name="calendar"></Ionicons>
                    </TouchableOpacity>
                  </View>
                
                    {showPicker && (
                      <>
                          <DateTimePicker
                            mode="date"
                            value={date || new Date()}
                            onChange={handleDate}
                            maximumDate={new Date()}
                          />
                      </>
                    )}     

                    {
                      dateString!="" &&
                      (
                        <View style={[styles.textInputContainer,{width:100,paddingRight:10,marginBottom:15,justifyContent:"center",alignItems:"center"}]}>
                          <Text style={{alignSelf:"center"}}>{dateString}</Text>                          
                        </View>
                      )

                    }
                 
            </View>
        
            <View style={{flexDirection:"row", marginVertical:5}}>

                <View style={{flexDirection:"column", flex:0.6,}}>
                    <View style={{ flex:0.5, paddingHorizontal:5, height:90}}>
                        <Text style={{fontSize:17, fontWeight:500}}>Username *</Text>
                        <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={50} value={username}  onChangeText={setUsername} onEndEditing={handleUsername} placeholder="nome de utilizador" 
                            style={[styles.textInputContainer,  errorUsername.trim()!="" && styles.invalidInput]}></TextInput>
                          {errorUsername.trim()!="" &&  <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>{errorUsername} </Text>}
                    </View>
                    <View style={{ flex:0.4,paddingVertical:10, marginBottom:10, paddingHorizontal:5}}>
                        <TouchableOpacity style={{backgroundColor:"#a47c06", padding:10,borderRadius:10}} onPress={()=>openModal()}>
                            <Text style={{alignSelf:"center", color:"white"}}>Upload Foto (Opcional)</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                 { selectedImage && 
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
           

            <View style={{flexDirection:"row", flex:1, marginBottom:15,}}>
                <View style={{ flex:1,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Email *</Text>
                    <TextInput placeholder="Email de utilizador" numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} onChangeText={setEmail} value={email} onEndEditing={handleEmail}
                        style={[styles.textInputContainer,  errorEmail.trim()!="" && styles.invalidInput]}></TextInput>    
                    {
                      errorEmail.trim()!="" &&  <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>{errorEmail}</Text>
                    }
                    
                </View>

            </View>


            <View style={{flexDirection:"row", flex:1, marginBottom:15,}}>
                <View style={{ flex:0.5,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Password *</Text>
                    <TextInput secureTextEntry placeholder="*******" numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={password} onEndEditing={handlePassword} onChangeText={setPassword}
                        style={[styles.textInputContainer, errorPassword.length>0 && styles.invalidInput]}></TextInput>
                    { 
                      errorPassword.length>0 &&  <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>{errorPassword} </Text>
                    }
                </View>
                <View style={{ flex:0.5,paddingHorizontal:5 ,justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:13, fontWeight:"bold"}}><Text>NOTA</Text>: Password dever ser composta por, pelo menos, 6 letras das quias 1 maiúscula, 1 minúscula e caracteres especiais.</Text>
                </View>

            </View>
             
            <View style={{flexDirection:"row", flex:1, marginBottom:15,}}>
                <View style={{ flex:1,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Confirmar Password *</Text>
                    <TextInput placeholder="*******" onEndEditing={handleConfirmPassword} secureTextEntry numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={confirmPassword}  onChangeText={setConfirmPassword}
                        style={[styles.textInputContainer, errorConfirmPassword.length>0 && styles.invalidInput]}></TextInput>    
                    {
                      errorConfirmPassword.length>0 &&  <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>{errorConfirmPassword} </Text>
                    }
                    
                </View>

            </View>
             
            <View style={{flexDirection:"row", flex:1, marginBottom:15,}}>
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
                        {cities.map((city) => (
                            <Picker.Item key={city.id} label={city.nome} value={city.nome} />
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

          <MyButtons isDisabled={!validForm} 
                     onPress={handlingSubmit}
                     title="Registar" width={350} color="#1a6dc0"></MyButtons>
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