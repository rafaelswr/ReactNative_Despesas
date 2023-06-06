import React, { useState } from "react";
import { View, Image, Text, TextInput } from "react-native";
import adminStyles from "../../styles/adminStyles";
import AdminTopNav from "../../components/Admin/AdminTopNav";
import MyButtons from "../../components/MyButtons";
import { Picker } from "@react-native-picker/picker";
import geralStyles from "../../styles/geralStyles";
import datas from "../../services/data.json";
import { useImagePicker } from "../../services/imageService";
//firestore
import { adminManagementCreateAsync } from "../../services/firebaseService";

const NovoEmissor = (props) => {

    const [emissor,setEmissor] = useState("");
    const [tipoPagamento, setTipoPagamento] = useState("");

    const {ModalPress, removePhoto, openModal, selectedImage, modalVisible} = useImagePicker();

    const onSuccess = _ =>{
        alert("Novo Emissor adicionado");
        setEmissor("");
        setTipoPagamento("");
    }


  return (
    <View style={adminStyles.containerMain}>
        <AdminTopNav title="Novo Emissor"></AdminTopNav>
        <View style={{ paddingHorizontal:10}}>
            <View style={{height:92}}>
              <Text style={geralStyles.headerInputs}>Nome</Text>
              <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                  maxLength={50} value={emissor}  onChangeText={setEmissor} placeholder="Nome Emissor, Sigla" 
                  style={geralStyles.textInputContainer}></TextInput> 
            </View>

            <View style={{flexDirection:"row", paddingVertical:10}}>
                <View style={{flex:0.55}}>
                    <View style={{margin:10, backgroundColor:"#91a9ca"}}>
                        <Image resizeMode="contain" source={{uri:selectedImage}} style={{alignSelf:"center", width:150,margin:10, height:100}}></Image>
                    </View>
                </View>
                <View style={{flex:0.45,alignSelf:"center"}}>
                    <MyButtons onPress={()=>{openModal()}} title="Upload Foto" color="#1a6dc0"></MyButtons>
                    <MyButtons onPress={()=>{removePhoto()}} title="Remove Foto" color="red"></MyButtons>
                </View>
            </View>

            <View style={{height:92, paddingTop:10}}>
            <Text style={geralStyles.headerInputs}>Método de Pagamento Predefinido</Text>
              <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                  <Picker style={{ width:340}} mode="dropdown" 
                  selectedValue={tipoPagamento} onValueChange={(value)=>setTipoPagamento(value)}>
                        <Picker.Item label="-" value="-"></Picker.Item>
                        {datas.metodosPagamento.map((metodo, index) => (
                            <Picker.Item key={index} label={metodo} value={metodo} />
                            
                        ))}
                  </Picker>
              </View> 
            </View>
            
        </View> 
        <View style={{marginVertical:40}}>
            
            <MyButtons onPress={()=>{

                if(emissor == "" || tipoPagamento =="-"){
                    alert("Deixou campos em vazio!");
                }else{
                    const newEmissor = {
                        nome:emissor, 
                        pagamentoPredefinido:tipoPagamento,
                    }

                   adminManagementCreateAsync(newEmissor,"emissores",onSuccess);
            
                }
               
            }}  title="Adicionar" width={350} color="#1a6dc0"/>

            <MyButtons onPress={()=>{}}  title="Cancelar " width={350} color="#989696"/>
        </View>
        {
            modalVisible && <ModalPress></ModalPress>
        }  
   </View>
  )
};

export default NovoEmissor;
