import React,{useState} from "react"
import {View, ScrollView,Image, Text, StyleSheet} from "react-native"
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import { Ionicons } from "@expo/vector-icons";
import MyButtons from "../components/MyButtons";
import datas from "../services/data.json";
import geralStyles from "../styles/geralStyles";

const DetalheDespesa = (props) => {

    const exp1 = datas.expenses[0];
    
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    var dataDespesa = new Date(exp1.data);

    const day = dataDespesa.getDate();
    const monthIndex = dataDespesa.getMonth();
    const month = months[monthIndex];
    const dateString = `${day} de ${month} de ${dataDespesa.getFullYear()}`;

    const [metodoPagamento,setMetodoPagamento] = useState(exp1.metodoPagamento);
    
  return (
    <>
        <TopNavBar leftIconName="arrow-back-outline" 
                   onPressLeft={() => {props.navigation.goBack()}}
                   title="Detalhes Despesa" rightIconName="trash-outline"></TopNavBar>
        <ScrollView style={{flex:1, margin:10}}>
            
            { !exp1.pago ? 
            
                <View style={{marginBottom:10, backgroundColor:"#faf026", flex:1, flexDirection:"row", justifyContent:"flex-start",alignItems:"center"}}>
                    <View style={{padding:20}}>
                        <Ionicons name="warning-outline" size={30}></Ionicons>
                    </View>
                    <Text style={{fontSize:20,fontWeight:"500"}}>Aguarda Pagamento</Text>
                </View> 
            :
                <View style={{marginBottom:10, backgroundColor:"#7eff27", flex:1, flexDirection:"row", justifyContent:"flex-start",alignItems:"center"}}>
                    <View style={{padding:20}}>
                        <Ionicons name="checkbox-outline" size={30}></Ionicons>
                    </View>
                    <Text style={{fontSize:20,fontWeight:"500"}}>Pagamento Definido</Text>
                </View>
            }
           
            <View style={{flex:1,flexDirection:"row", borderColor:"#77c9f3",borderWidth:3,}}>
                <View style={{flex:1}}>
                   <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:20,fontWeight:"bold",}}>{exp1.emissor}</Text>
                   </View>
                   <View style={{flex:1,justifyContent:"center",alignItems:"center",}}>
                    <Text style={{fontSize:20,fontWeight:500}}>{exp1.valor}€</Text>
                    </View> 
                </View>
                <View style={{flex:1,justifyContent:"center",alignItems:"center", padding:10}}>
                    <Image source={require("../assets/meo.jpg")} style={{ width:100,height:100}}></Image>
                </View>
            </View>
            <View style={{backgroundColor:"#77c9f3", padding:20}}>
                <Text style={{fontSize:20,fontWeight:50}}>{exp1.descricao}</Text>
            </View>
            <View style={{marginTop:20}}>
                <Text>Data de Pagamento</Text>
                <Text style={{fontSize:30,fontWeight:"500",paddingVertical:10}}>{dateString}</Text>
            </View>
            <View style={{marginTop:20}}>
                <Text>Tipo de Pagamento</Text>
                <Text style={{fontSize:30,fontWeight:"500",paddingVertical:10}}>{exp1.metodoPagamento}</Text>
            </View>
            {metodoPagamento=="multibanco"&&
            <View style={{backgroundColor:"#edecec", padding:20, justifyContent:"center",alignItems:"flex-start",paddingLeft:100}}>
                <Text style={geralStyles.headerInputs}>Entidade: <Text style={{fontWeight:"normal"}}>{exp1.entidade}</Text></Text>
                <Text style={geralStyles.headerInputs}>Referência: <Text style={{fontWeight:"normal"}}>{exp1.referencia}</Text></Text>
                <Text style={geralStyles.headerInputs}>Valor: <Text style={{fontWeight:"normal"}}>{exp1.valor}</Text></Text>
            </View>
            }
            <MyButtons onPress={() => {props.navigation.navigate('EditarDespesa')}} 
                       title="Editar" width={350} color="black"></MyButtons>
        </ScrollView>
    </>
  )
};

const styles=StyleSheet.create({

});

export default DetalheDespesa;

