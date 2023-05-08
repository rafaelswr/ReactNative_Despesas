import React from "react"
import {View, Text, StyleSheet, TouchableHighlight, Image} from "react-native"
import { Ionicons } from "@expo/vector-icons";

const CardExpenses = (props) => {
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    var dataDespesa = new Date(props.data);

    const day = dataDespesa.getDate();
    const monthIndex = dataDespesa.getMonth();
    const month = months[monthIndex];
    const dateString = `${day} de ${month} de ${dataDespesa.getFullYear()}`;

    const calcularDifDias=()=>{
        const hoje = new Date();
        const timeDiff = dataDespesa.getTime() - hoje.getTime();
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays; 

    };

   
  return (
        <TouchableHighlight underlayColor={"transparent"} onPress={()=>{}}>
        <View style={{borderColor:"#C3C3C2",borderWidth:2, backgroundColor: props.pago ? "#4efe7f" : 
      (calcularDifDias() < 0 ? "red" : (calcularDifDias() > 3 ? "#D9D9D9":"orange")),marginVertical:5,height:150, padding:7, borderRadius:10}}>
            <View style={{ flexDirection:"row"}}>
                <View style={{ flex:0.80, paddingBottom:20}}>
                    <Text style={{paddingTop:5,paddingBottom:10, fontSize:18, fontWeight:"700"}}>{props.emissor}</Text>
                    <Text>Descrição: {props.descricao}</Text>
                </View>
                <View style={{paddingVertical:5,flex:0.30}}>
                    <View style={{backgroundColor:"black", padding:10, borderRadius:5}}>
                        <Text style={{color:"white", textAlign:"center", fontSize:18}}>{props.valor}€</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection:"row"}}>
                <View style={{flex:0.18}}>
                    <Image source={require("../assets/meo.jpg")} style={{borderRadius:5, width:60, height:42}}></Image>
                </View>
                <View style={{flex:0.70, justifyContent:"center", alignItems:"center"}}>
                    {!props.pago ?
                        <Text style={{fontSize:16}}>Pagar até: <Text style={{fontWeight:"bold", fontSize:14}}>{dateString}</Text></Text>
                        : <Text style={{fontSize:16,fontWeight:"bold"}}>Despesa Paga</Text>
                    }
                    </View>
                    
                    <View style={{flex:0.12}}>
                    {
                        (calcularDifDias()<=0 && !props.pago) ? 
                        <Ionicons name="alert-outline" size={32} color="black"></Ionicons>:
                        (props.pago &&  <Ionicons name="checkmark-circle-outline" size={32} color="black"></Ionicons>)
                       
                        
                    }
                    </View>  
                   
            </View>
        </View>
    </TouchableHighlight>

  )
};

export default CardExpenses;

