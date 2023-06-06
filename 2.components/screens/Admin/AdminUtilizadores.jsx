import React,{useState} from 'react'
import { View,FlatList, Text, TextInput, StyleSheet, Modal, Button, Alert, ScrollView,} from "react-native"

import AdminCard from '../../components/Admin/AdminCard';
import Pesquisa from '../../components/Pesquisa';
import adminStyles from "../../styles/adminStyles.jsx";
import AdminTopNav from '../../components/Admin/AdminTopNav';
import datas from "../../services/data.json";

const AdminUtilizadores = (props) => {

    const [users, setUsers] = useState(datas.users);
    const [filteredUsers, setFilteredUsers] = useState(datas.users);
    
    return(
        <View style={adminStyles.containerMain}>
            <AdminTopNav iconName="refresh-outline" title="Utilizadores"></AdminTopNav> 

            <Pesquisa onSearch={ search => {
                setFilteredUsers(users.filter(user=>{
                    return user.username.toLowerCase().includes(search.toLowerCase());
                }))
            }}></Pesquisa>
            
            
            <FlatList data={filteredUsers} renderItem={({item})=>{
                  return(<AdminCard  onPress={()=>{props.navigation.navigate("AdminStack", {screen:"AdminUser", params:{item}})}} name={item.iconName} title={item.username} size={25} backgroundColor="#ADFFB5"></AdminCard>);
            }} keyExtractor={(item) => item.id.toString()}></FlatList>


            
        </View>
    );
};

export default AdminUtilizadores;
