import React, { useEffect, useState } from "react";
import { View, Image, Text, TextInput,TouchableOpacity} from "react-native";
import adminStyles from "../../styles/adminStyles";
import AdminTopNav from "../../components/Admin/AdminTopNav";
import MyButtons from "../../components/MyButtons";
import { Picker } from "@react-native-picker/picker";
import geralStyles from "../../styles/geralStyles";
import datas from "../../services/data.json";
import { useImagePicker } from "../../services/imageService";
//firestore
import { adminManagementCreateAsync, getAllDataCollectionAsync } from "../../services/firebaseService";
import { Ionicons } from "@expo/vector-icons";

const NovoEmissor = (props) => {

    const [newEmissor,setNewEmissor] = useState("");
    const [tipoPagamento, setTipoPagamento] = useState("");
    const [metodosPagamento, setMetodosPagamento] = useState([]);
    const [existeEmissor, setExisteEmissor] = useState(false);
    const [emissores, setEmissores ]  = useState([]);

    const {ModalPress, removePhoto, openModal, selectedImage, modalVisible} = useImagePicker();

    useEffect(()=>{
        getAllDataCollectionAsync((data)=>{
            setMetodosPagamento(data); 
        },"metodosPagamento");
    },[])

    const getEmissores = () => {
        getAllDataCollectionAsync((data)=>{
            setEmissores(data);
        }, "emissores");
    }

    useEffect(()=>{
        getEmissores(); 
    },[])

    const onSuccess = _ =>{
        alert("Novo Emissor adicionado");
        setNewEmissor("");
        setTipoPagamento("");
        getEmissores(); 
    }


  return (
    <View style={adminStyles.containerMain}>
        <AdminTopNav title="Novo Emissor"  iconName="refresh-outline" OnPress={()=>getEmissores()} ></AdminTopNav>
        <View style={{ paddingHorizontal:10}}>
            <View style={{height:92}}>
              <Text style={geralStyles.headerInputs}>Nome</Text>
              <View style={{flexDirection:"row"}}>
                    <TextInput  numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={50} value={newEmissor}  onChangeText={setNewEmissor} placeholder="Nome Emissor, Sigla" 
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
                        <Image resizeMode="contain" source={{uri:selectedImage}} style={{alignSelf:"center", width:150,margin:10, height:100}}></Image>
                    </View>
                </View>
                <View style={{flex:0.45,alignSelf:"center"}}>
                    <MyButtons onPress={()=>{openModal()}} title="Upload Logo" color="#1a6dc0"></MyButtons>
                    <MyButtons onPress={()=>{removePhoto()}} title="Remove Logo" color="red"></MyButtons>
                </View>
            </View>

            <View style={{height:92, paddingTop:10}}>
            <Text style={geralStyles.headerInputs}>Método de Pagamento Predefinido</Text>
              <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                  <Picker style={{ width:340}} mode="dropdown" 
                  selectedValue={tipoPagamento} onValueChange={(value)=>setTipoPagamento(value)}>
                        <Picker.Item label="-" value="-"></Picker.Item>

                        {metodosPagamento.map((item) => (
                            <Picker.Item key={item.id} label={item.nome} value={item.nome} />
                            
                        ))}

                  </Picker>
              </View> 
            </View>
            
        </View> 
        <View style={{marginVertical:40}}>
            
            <MyButtons onPress={()=>{

                const exists = emissores.some((item)=>{
                    return item.nome.toLowerCase() === newEmissor.toLowerCase(); 
                })

                if(newEmissor != "" && (tipoPagamento != "" || tipoPagamento === "-")){  
                    if(!exists){
                        const obj = {
                            nome:newEmissor, 
                            pagamentoPredefinido:tipoPagamento,
                        }

                       adminManagementCreateAsync(obj,"emissores",onSuccess);    
                    
                    }else{    
                        setExisteEmissor(true);
                        console.log("Emissor já existe");
                    }
                }else{
                    alert("Deixou campos vazios!");
                }
            }}  title="Adicionar" width={350} color="#1a6dc0"/>

            <MyButtons onPress={()=>{
                    setExisteEmissor(false);
                    setTipoPagamento("-");
                    props.navigation.navigate("Emissores");
                }}  title="Voltar" width={350} color="#989696"/>
        </View>
        {
            modalVisible && <ModalPress></ModalPress>
        }  
   </View>
  )
};

export default NovoEmissor;
