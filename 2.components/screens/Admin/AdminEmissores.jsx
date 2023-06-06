import React,{useState} from 'react';
import { View, Text, FlatList,StyleSheet,TouchableOpacity} from "react-native";
import AdminCard from '../../components/Admin/AdminCard';
import Pesquisa from '../../components/Pesquisa';
import adminStyles from "../../styles/adminStyles.jsx";
import AdminTopNav from '../../components/Admin/AdminTopNav';
import { Ionicons } from '@expo/vector-icons';
import datas from "../../services/data.json";

const AdminEmissores = (props) => {
    
     const [issuers, setIssuers ] = useState(datas.issuers);
     const [filteredIssuers, setFilteredIssuers ] = useState(datas.issuers);
    
    return (
        <View style={adminStyles.containerMain}>
            <AdminTopNav iconName="refresh-outline" title="Emissores"></AdminTopNav> 

            <Pesquisa  onSearch={(search)=>{
                setFilteredIssuers(issuers.filter(emissor=>{
                    return emissor.nome.toLowerCase().includes(search.toLowerCase());
                }))
            }}></Pesquisa>
            
            <View style={{paddingVertical:5}}>
                <TouchableOpacity style={styles.buttonNovo} onPress={()=>{props.navigation.navigate("NovoEmissor");}}>
                    <View style={styles.orientation}>
                        <Ionicons size={20} name='add-outline'></Ionicons>
                        <Text style={styles.textButton}>Novo</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={adminStyles.horizontalLine}/>

            <FlatList data={filteredIssuers} renderItem={({item})=>{
                return( 
                    <AdminCard modalReference="o emissor" onPress={()=>{}} 
                            name="close-outline" size={34} title={item.nome} 
                            backgroundColor="#A9D6FF"/>
                );
            }} keyExtractor={(item) => item.id.toString()}></FlatList>

        </View>
    )
};

const styles =StyleSheet.create({
    buttonNovo:{
        borderColor:"#efefef",
        borderWidth:2,
        justifyContent:"center",
        width:80,
        height:40,
    },
    textButton:{
        fontSize:15,
        fontWeight:500     
    },
    orientation:{
        flexDirection:"row",
        alignItems:"center"
    }
})

export default AdminEmissores;
