import React,{useState, useEffect} from "react"; 
import {View, Text, StyleSheet, TextInput,ScrollView,ActivityIndicator, Image, KeyboardAvoidingView} from "react-native"
import TopNavBar from "../components/TopNavBar";
import { useNavigation, CommonActions } from '@react-navigation/native';

import BottomNavBar from "../components/BottomNavBar";
import MyButtons from "../components/MyButtons";
import datas from "../services/data.json";
import { Picker } from "@react-native-picker/picker";
import geralStyles from "../styles/geralStyles";
import { Ionicons } from "@expo/vector-icons";
import { useImagePicker } from "../services/imageService";


const EditarPerfil = (props) => {
    const { selectedImage, modalVisible, removePhoto, openModal, ModalPress } = useImagePicker();

    const {user} = props.route.params; 

    const [name, setName ] = useState(user.name);
    const [apelido, setApelido ] = useState(user.apelido);
    const [username, setUsername ] = useState(user.username);
    const [morada, setMorada ] = useState(user.morada);
    const [date, setDate ] = useState(user.date);
    const [codPostal_1,setCodePostal_1] = useState("1234");
    const [codPostal_2,setCodePostal_2] = useState("231");
    const [codPostal,setCodPostal] = useState("");
    const [city,setCity] = useState(user.city);
    const [currentFilter, setCurrentFilter] = useState(user.city);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timer;
    
        if (isLoading) {
          timer = setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      });
    


  return (
    <>
      <TopNavBar leftIconName="arrow-back-outline" 
                 onPressLeft={()=>{
                    if (props.navigation.canGoBack()){
                        //props.navigation.goBack();
                      //  props.navigation.navigate("Perfil");
                    //console.log("1");
                       // props.navigation.popToTop();
                       props.navigation.goBack(); 
                       console.log("1");
                    }else{
                        props.navigation.navigate("Perfil");
                        console.log("2");
                    }
                }}
    
                 title="Editar Perfil" 
                 rightIconName="checkmark-outline"></TopNavBar>
      
      <ScrollView keyboardDismissMode="on-drag" showsVerticalScrollIndicator={false} style={{flex:1, margin:10}}>
      
        {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                </View>
            ) : 
            <>
      
            <View style={{flexDirection:"row",backgroundColor:"#a9c6e2",paddingVertical:20, justifyContent:"center", alignItems:"center"}}>
                <View style={{paddingRight:10}}>
                    <Image resizeMode="contain"  source={{ uri: selectedImage }} style={{borderRadius:140, width:140,height:140}}></Image>
                </View>
                <View style={{paddingLeft:10}}>
                    <MyButtons onPress={()=>{openModal()}} radius={190} title="Redefinir foto" width={180} color="#1a6dc0"></MyButtons>
                    <MyButtons onPress={()=>{removePhoto()}} radius={190} title="Eliminar foto"  width={180}  color="red"></MyButtons>
                </View>
            </View>
            <MyButtons onPress={() => {props.navigation.navigate('NewPassword')}}
                       title="Redefinir Password" width={200} color="#b79232"></MyButtons>

            <View style={{flexDirection:"row", height:92}}>
                <View style={{ flex:1, paddingHorizontal:5,}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Nome</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={name}  onChangeText={setName} placeholder="Primeiro nome" 
                        style={styles.textInputContainer}></TextInput>
                        
                </View>
                
                <View style={{ flex:1, paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Apelido</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={apelido}  onChangeText={setApelido} placeholder="Último nome" 
                        style={styles.textInputContainer}></TextInput>
                        
                </View>
                
            </View>

            <View style={{height:92,paddingLeft:5}}>
                <Text style={{fontSize:17, fontWeight:500}}>Data de Nascimento</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{flex:0.9, }}>
                        <TextInput value={date} onChangeText={setDate} dataDetectorTypes="calendarEvent" placeholder="dd/mm/aaaa" style={geralStyles.textInputContainer}></TextInput>
                    </View>
                    <Ionicons style={{ paddingLeft:5}} size={30} name="calendar-outline"></Ionicons>
                </View>
            </View>

            <View style={{flexDirection:"row",height:92}}>
                <View style={{ flex:0.5, paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Username</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={username}  onChangeText={setUsername} placeholder="Insira o seu nome de utilizador" 
                        style={styles.textInputContainer}></TextInput>
                </View>

            </View>
            <View style={{flexDirection:"row",height:92}}>
                <View style={{ flex:1,paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Morada</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
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
                                selectedValue={currentFilter} onValueChange={(value)=>setCurrentFilter(value)}>
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
                        <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                            maxLength={50} placeholder="0000" value={codPostal_1} onChangeText={setCodePostal_1}
                            style={[styles.textInputContainer,{flex:0.6}]}></TextInput>
                        <Text style={{alignSelf:"center", fontSize:14,paddingHorizontal:5,}}>-</Text>
                        <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                            maxLength={50} placeholder="000" value={codPostal_2} onChangeText={setCodePostal_2}
                            style={[styles.textInputContainer,{flex:0.4}]}></TextInput>
                    </View>
                </View>
            </View>
            <MyButtons title="Cancelar" width={350} color="#838383"
                        onPress={() => {props.navigation.goBack()}}></MyButtons>
        
        </>}
        
        </ScrollView>
        {
            modalVisible && <ModalPress></ModalPress>
        }
    </>
  )
};


const styles=StyleSheet.create({
    textInputContainer:{
        paddingLeft:10,
        borderRadius:8, 
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

export default EditarPerfil;
