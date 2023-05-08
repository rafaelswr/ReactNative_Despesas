import React,{useState} from 'react'
import { View,FlatList, Text, TextInput, StyleSheet, Modal, Button, Alert, ScrollView,} from "react-native"

import AdminCard from '../../components/Admin/AdminCard';
import Pesquisa from '../../components/Pesquisa';
import adminStyles from "../../styles/adminStyles.jsx";
import AdminTopNav from '../../components/Admin/AdminTopNav';
import datas from "../../services/data.json";

const AdminUtilizadores = (props) => {

    const [search, setSearch] = useState("");
    
    return(
        <View style={adminStyles.containerMain}>
            <AdminTopNav iconName="refresh-outline" title="Utilizadores"></AdminTopNav> 

            <Pesquisa search={search} onSearch={(value)=>setSearch(value)}></Pesquisa>
            
            
            <FlatList data={datas.users} renderItem={({item})=>{
                  return(<AdminCard onPress={()=>{}} name={item.iconName} title={item.name} size={25} backgroundColor="#ADFFB5"></AdminCard>);
            }} keyExtractor={(item) => item.id.toString()}></FlatList>


            
        </View>
    );
};

export default AdminUtilizadores;

