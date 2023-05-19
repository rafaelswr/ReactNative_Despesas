
import React,{useState} from "react";
import {View, Text, Pressable,Modal,Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyButtons from "../MyButtons";
import geralStyles from "../../styles/geralStyles";

const AdminCard = (props) => {
  const [locked, setLocked] = useState(props.name);
  const [modalVisible, setModalVisible] = useState(false);

  
  const toggleLocked = () => {
      setLocked(locked=="lock-closed-outline" ? 'lock-open-outline' : 'lock-closed-outline' );
  };

 
  const ModalPress = ()=>{
    return (
          <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <View style={geralStyles.modal}>
                <View style={geralStyles.modalContainer}>
                 <Text style={geralStyles.modalText}>Tem a certeza que deseja eliminar {props.modalReference} {props.title} ?</Text>
                  <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <MyButtons onPress={()=>{Alert.alert(`${props.modalReference} eliminado com sucesso`); setModalVisible(false)}} title="Sim" color="#1a6dc0"></MyButtons>
                    </View>
                    <View style={{flex:1}}>
                        <MyButtons onPress={()=>{setModalVisible(false)}}  title="Não" color="#989696"></MyButtons>
                    </View>
                 </View>
                </View>
            </View>
        </Modal>
      );
  }

 
  return (
    <View style={{flex:1, height:70, flexDirection:"row", marginVertical:5,opacity:locked=="lock-closed-outline" ? 0.5 : 1.0}}>
        <View style={{backgroundColor:props.backgroundColor ? props.backgroundColor: "white",flex:0.85, borderRightColor:"black", borderRightWidth:2,justifyContent:"center",alignItems:"flex-start",paddingHorizontal:10}}>
            <Text style={{fontSize:20,fontWeight:500}}>{props.title}</Text>
        </View>
        <View style={{backgroundColor:props.name=="close-outline" ? "red": "#efefef",flex:0.15,justifyContent:"center",alignItems:"center"}}>
            <Pressable onPress={()=>{
              if(props.name!="close-outline"){
                return toggleLocked();
              }else {
                setModalVisible(true);
            }}}>
              <Ionicons name={props.name=="close-outline" ? props.name : locked } size={props.size} color={props.name == "close-outline" ? "white":"black"}></Ionicons>               
            </Pressable>
        </View>
            {
                modalVisible && <ModalPress></ModalPress>
            }
    </View>
  )
};





export default AdminCard;

