import React from "react"
import {View, Text, StyleSheet, Image,ScrollView} from "react-native"
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import MyButtons from "../components/MyButtons";
import datas from "../services/data.json";

const Perfil = (props) => {

    const user2 = datas.users[2];

 return (
    <>
        <TopNavBar title={user2.username}/>
    
        <View style={{flex:1, margin:10}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{padding:10,justifyContent:"center", alignItems:"center", flex:2}}>
                <Image source={require("../assets/kottak.jpg")} style={{borderRadius:170, width:170,height:170}}></Image>
            </View>
            <View style={{justifyContent:"center",alignItems:"center", flex:1}}>
                <MyButtons title="Editar Perfil" width={350} color="#1a6dc0"></MyButtons>
            </View>
            <View style={{flex:3}}>
                <Text style={{textAlign:"left",paddingVertical:10,paddingHorizontal:20, fontSize:20,fontWeight:300}}>Os meus Dados</Text>
                <View style={{backgroundColor:"#f3f1f1",flex:1,paddingHorizontal:20,paddingVertical:10}}>
                    <View style={{marginVertical:5}}>
                        <Text style={{fontWeight:"bold", fontSize:17}}>Nome: <Text style={{fontWeight:"normal"}}>{user2.name}</Text></Text>
                    </View>
                    <View style={{marginVertical:5}}>
                        <Text style={{fontWeight:"bold", fontSize:17}}>Apelido: <Text style={{fontWeight:"normal"}}>{user2.apelido}</Text></Text>
                    </View>
                    <View style={{marginVertical:5}}>
                        <Text style={{fontWeight:"bold", fontSize:17}}>Data de Nascimento: <Text style={{fontWeight:"normal"}}>{user2.date}</Text></Text>
                    </View>
                    <View style={{marginVertical:5}}>
                        <Text style={{fontWeight:"bold", fontSize:17}}>Username: <Text style={{fontWeight:"normal"}}>{user2.username}</Text></Text>
                    </View>
                    <View style={{marginVertical:5}}>
                        <Text style={{fontWeight:"bold", fontSize:17}}>Password: <Text style={{fontWeight:"normal"}}>********</Text></Text>
                    </View>
                    <View style={{marginVertical:5}}>
                        <Text style={{fontWeight:"bold", fontSize:17, marginBottom:5}}>Morada</Text>
                        <Text style={{paddingLeft:20, fontWeight:"bold", fontSize:17,marginBottom:5}}>Rua: <Text style={{fontWeight:"normal"}}>{user2.morada}</Text></Text>
                        <Text style={{paddingLeft:20, fontWeight:"bold", fontSize:17,marginBottom:5}}>Cidade: <Text style={{fontWeight:"normal"}}>{user2.city}</Text></Text>
                        <Text style={{paddingLeft:20, fontWeight:"bold", fontSize:17,marginBottom:5}}>Código Postal: <Text style={{fontWeight:"normal"}}>4557-344</Text></Text>
                    </View>
                    
                </View>
            </View>    
            </ScrollView>
        </View>  
       
        <BottomNavBar perfil></BottomNavBar>
    </>
  )
};

export default Perfil;

const styles=StyleSheet.create({

});
