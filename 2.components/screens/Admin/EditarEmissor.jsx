import React, { useEffect, useState } from "react"
import {View, Text, ActivityIndicator,TextInput, TouchableOpacity, Image} from "react-native"
import AdminTopNav from "../../components/Admin/AdminTopNav";
import adminStyles from "../../styles/adminStyles";
import geralStyles from "../../styles/geralStyles";
import { Ionicons } from "@expo/vector-icons";
import MyButtons from "../../components/MyButtons";
import { Picker } from "@react-native-picker/picker";

//firestore
import { getAllDataCollectionAsync, getDocumentOfCollection, updateDocument } from "../../services/firebaseService";


const EditarEmissor = (props) => {

    const [editEmissor,setEditEmissor] = useState({});
    const [newEmissor, setNewEmissor] = useState("");
    const [tipoPagamento, setTipoPagamento] = useState("");
    const [loading, setLoading] = useState(true);
    const [metodosPagamento, setMetodosPagamento] = useState([]);


    const emissorID = props.route.params.emissorID;

    const aux = ()=>{
        setLoading(true);
        getDocumentOfCollection((value)=>{
            setEditEmissor(value); 
            setNewEmissor(value.nome);
            setTipoPagamento(value.pagamentoPredefinido);
        }, emissorID, "emissores").then(()=>{
            setTimeout(()=>{
                setLoading(false);
            },1000);
        });
    }

    useEffect(()=>{
       aux();
    },[emissorID]);

    useEffect(()=>{
        getAllDataCollectionAsync((value)=>{
            setMetodosPagamento(value);         
        }, "metodosPagamento");
    },[]);

    const [existeEmissor, setExisteEmissor] = useState(false);


    const handleNomeChange = (value) => {
        setNewEmissor(value);
    };

    return (
        <View style={adminStyles.containerMain}>
            { 
                loading ?
                    <View style={{flex:1}}>
                        <ActivityIndicator style={{flex:1,justifyContent:"center",alignItems:"center"}} size="large" color="blue"></ActivityIndicator> 
                    </View>
                :
                    <>            
                        <AdminTopNav title={editEmissor.nome} backIconName="arrow-back-outline" OnBackPress={()=>{
                           
                           props.navigation.navigate("Emissores");}}  iconName="refresh-outline"  OnPress={()=>aux()}/>
                        <View style={{ paddingHorizontal:10}}>
                            <View style={{height:92}}>
                                <Text style={geralStyles.headerInputs}>Nome</Text>
                                <View style={{flexDirection:"row"}}>
                                    <TextInput  numberOfLines={1} autoComplete="off" autoCorrect={false}
                                        maxLength={50} value={newEmissor} onChangeText={handleNomeChange} placeholder="Nome Emissor, Sigla" 
                                        style={[geralStyles.textInputContainer, existeEmissor && geralStyles.invalidInput, {flex:0.9}]}/>
                                    <View style={{justifyContent:"center", alignItems:"center", flex:0.2}}>
                                        <TouchableOpacity onPress={()=>{
                                            setNewEmissor("");
                                            setExisteEmissor("");
                                        }}>
                                            <Ionicons name="close-outline" style={{alignSelf:"center"}} size={30}></Ionicons>
                                            <Text style={{color:"#969595"}}>Limpar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {
                                    existeEmissor && <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Emissor com o mesmo nome já existe!</Text>
                                }
                            </View>

                            <View style={{flexDirection:"row", paddingVertical:10}}>
                                <View style={{flex:0.55}}>
                                    <View style={{margin:10, backgroundColor:"#91a9ca"}}>
                                        <Image resizeMode="contain" source={{}} style={{alignSelf:"center", width:150,margin:10, height:100}}></Image>
                                    </View>
                                </View>
                        
                            </View>

                            <View style={{height:92, paddingTop:10}}>
                                <Text style={geralStyles.headerInputs}>Método de Pagamento Predefinido</Text>
                                <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                                    <Picker style={{ width:340}} mode="dropdown" 
                                    selectedValue={tipoPagamento} onValueChange={(value)=>setTipoPagamento(value)}>
                                        <Picker.Item label="-" value={tipoPagamento}></Picker.Item>

                                        {metodosPagamento.map((item) => (
                                            <Picker.Item key={item.id} label={item.nome} value={item.nome} />
                                            
                                        ))}

                                    </Picker>
                                </View> 
                            </View>
                        </View> 

                        <View style={{marginVertical:40}}>
                        
                            <MyButtons onPress={()=>{
                                if(newEmissor != "" && tipoPagamento!="-"){
                                    if(newEmissor.toLowerCase()!= editEmissor.nome.toLowerCase() 
                                    || tipoPagamento.toLowerCase() != editEmissor.pagamentoPredefinido.toLowerCase()){
                                        updateDocument(()=>{
                                            alert("Dados Atualizados!")
                                        },editEmissor.id, "emissores",{
                                            nome:newEmissor,
                                            pagamentoPredefinido:tipoPagamento
                                        }).then(()=>{
                                            aux();
                                        })
                                    }
                                }else{
                                    alert("Dados não atualizados");
                                }

                            }}  title="Atualizar" width={350} color="#1a6dc0"/>

                            <MyButtons onPress={()=>{
                                props.navigation.navigate("Emissores");
                            }}  title="Cancelar e voltar" width={350} color="#989696"/>    
                        </View>
                    </>
            }
    </View>
)};

export default EditarEmissor;
