import React,{useState} from "react";
import {View, Text, TextInput, Alert, ScrollView} from "react-native";
import adminStyles from "../../styles/adminStyles";
import AdminTopNav from "../../components/Admin/AdminTopNav";
import MyButtons from "../../components/MyButtons";
import geralStyles from "../../styles/geralStyles";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import datas from "../../services/data.json";

const AdminUser = (props) => {

    const {item} = props.route.params; 

    const [name, setName ] = useState(item.name);
    const [apelido, setApelido ] = useState(item.apelido);
    const [username, setUsername ] = useState(item.username);
    const [morada, setMorada ] = useState(item.morada);
    const [codPostal_1,setCodePostal_1] = useState("");
    const [codPostal_2,setCodePostal_2] = useState("");
    const postalCode = `${codPostal_1}-${codPostal_2}`;
    const [city, setCity] = useState(item.city);
    const [date, setDate] = useState(item.date);



    return (
        <View style={adminStyles.containerMain}>
            <AdminTopNav title={username} iconName="trash-outline"></AdminTopNav>
            <View style={adminStyles.horizontalLine}></View>
            <MyButtons title="Redefinir Password" width={200} color="#b79232"></MyButtons>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height:92}}>
                <View style={{ flex:1, paddingHorizontal:5,}}>
                    <Text style={geralStyles.headerInputs}>Nome</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={name}  onChangeText={setName} placeholder="Primeiro Nome" 
                        style={geralStyles.textInputContainer}></TextInput>

                </View>
            </View>
            <View style={{height:92}}>
                <View style={{ flex:1, paddingHorizontal:5}}>
                    <Text style={geralStyles.headerInputs}>Apelido</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={apelido}  onChangeText={setApelido} placeholder="Último Nome" 
                        style={geralStyles.textInputContainer}></TextInput>
                        
                </View>     
            </View>


            <View style={{height:92}}>
                <View style={{ flex:1, paddingHorizontal:5}}>
                    <Text style={geralStyles.headerInputs}>Username</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={username}  onChangeText={setUsername} placeholder="nome de utilizador " 
                        style={geralStyles.textInputContainer}></TextInput>
                </View>

            </View>

          <View style={{height:92,paddingLeft:5}}>
                <Text style={geralStyles.headerInputs}>Data de Nascimento</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{flex:0.9, }}>
                        <TextInput value={date} onChangeText={setDate} dataDetectorTypes="calendarEvent" placeholder="dd/mm/aaaa" style={geralStyles.textInputContainer}></TextInput>
                    </View>
                    <Ionicons style={{ paddingLeft:5}} size={30} name="calendar-outline"></Ionicons>
                </View>
            </View>
            <View style={{flexDirection:"row",height:92}}>
                <View style={{ flex:1,paddingHorizontal:5}}>
                    <Text style={geralStyles.headerInputs}>Morada</Text>
                    <TextInput  numberOfLines={1} autoComplete="off" autoCorrect={false}
                    maxLength={50} value={morada}  onChangeText={setMorada} placeholder="Rua, número de porta" 
                        style={geralStyles.textInputContainer}></TextInput>
           
                </View>

            </View>
            

            <View style={{flexDirection:"row", height:92}}>
                <View style={{ flex:1, paddingHorizontal:5,}}>
                    <Text style={geralStyles.headerInputs}>Cidade</Text>
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
                    <Text style={geralStyles.headerInputs}>Código Postal</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                            maxLength={50} placeholder="0000" value={codPostal_1} onChangeText={setCodePostal_1}
                            style={[geralStyles.textInputContainer,{flex:0.6}]}></TextInput>
                        <Text style={{alignSelf:"center", fontSize:14,paddingHorizontal:5,}}>-</Text>
                        <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                            maxLength={50} placeholder="000" value={codPostal_2} onChangeText={setCodePostal_2}
                            style={[geralStyles.textInputContainer,{flex:0.4}]}></TextInput>
                    </View>
                </View>
            </View>


            <View style={adminStyles.horizontalLine}></View>

            <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <MyButtons onPress={()=>{Alert.alert('Cidade guardada com sucesso!')}} title="Guardar" color="#1a6dc0"></MyButtons>
                    </View>
                    <View style={{flex:1}}>
                        <MyButtons onPress={()=>{Alert.alert('Todas as alterações serão ignoradas.'); props.navigation.goBack();}}  title="Cancelar" color="#989696"></MyButtons>
                    </View>
                </View>
                
        </ScrollView>

        </View>
  )
};

export default AdminUser;
