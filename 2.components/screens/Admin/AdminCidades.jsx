import React,{useEffect, useState} from 'react'
import { View, Text, TextInput,FlatList, Alert} from "react-native"
import MyButtons from '../../components/MyButtons';
import AdminCard from '../../components/Admin/AdminCard';
import Pesquisa from '../../components/Pesquisa';
import adminStyles from "../../styles/adminStyles.jsx";
import geralStyles from '../../styles/geralStyles';
import AdminTopNav from '../../components/Admin/AdminTopNav';
import { 
    getAllDataCollectionAsync, 
    adminManagementCreateAsync, 
    adminDeleteDocAsync} from '../../services/firebaseService';

const AdminCidades = (props)=>{
    
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [newCity, setNewCity] = useState("");
    const [cityExists, setCityExists] = useState(false);



    const getCidades = () => {
        getAllDataCollectionAsync((data)=>{
            setCities(data);
            setFilteredCities(data);
        }, "cidades");
    }

    useEffect(()=>{
        getCidades();
         
    },[])

    const onSuccess = ()=>{
        alert("Nova cidade adicionada");
        setNewCity("");
        getCidades(); 
    }

    return(
        <View style={adminStyles.containerMain}>
            <AdminTopNav iconName="refresh-outline" title="Cidades"></AdminTopNav> 
               
            <Pesquisa onSearch={(search) => {
                    setFilteredCities(cities.filter(city=>{
                        return city.nome.toLowerCase().includes(search.toLowerCase());
                    }));
                }}>    
            </Pesquisa>
            
            <View style={adminStyles.horizontalLine}/>
            
            <View style={{height:86}}>
                <Text style={geralStyles.headerInputs}> Nova Cidade </Text>
                <TextInput onChangeText={setNewCity} numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={50} value={newCity}  placeholder="Nova cidade" 
                        style={[geralStyles.textInputContainer, cityExists && geralStyles.invalidInput]}></TextInput> 
                {
                  cityExists && <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Esta Cidade já existe</Text>
                }
            </View>

            <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}>
                    <MyButtons onPress={()=>{

                        const exists = cities.some(city=>{
                            return city.nome.toLowerCase() === newCity.toLowerCase();
                        });
                        
                        if(newCity!=""){
                            if(!exists){
                                const obj = {
                                    nome: newCity
                                }
                                adminManagementCreateAsync(obj,"cidades", onSuccess);
                            }else{
                                setCityExists(true);
                                console.log("Cidade já existe")
                            }
                        }else{
                            alert("Campos vazios, por favor insira dados!");
                        }
                        
                        }} title="Guardar" color="#1a6dc0"></MyButtons>
                </View>
                <View style={{flex:1}}>
                    <MyButtons onPress={()=>{
                        setNewCity("");
                        setCityExists(false);
                    }}  title="Limpar" color="#989696"></MyButtons>
                </View>
            </View>
            
            <View style={adminStyles.horizontalLine}/>

            <FlatList data={filteredCities} renderItem={({item})=>{
               
                return(
                    
                     <AdminCard modalReference="a Cidade" onPress={()=>{}} onPropsDelete={()=>{
                        adminDeleteDocAsync(()=>{
                            alert(`Cidade ${item.nome} elimininada!`);
                            getCidades(); 
                        },item.id, "cidades");
                     }} name="close-outline" size={34} title={item.nome} backgroundColor="#FDEBAC"></AdminCard>
                    
                 );
            }} keyExtractor={(item) => item.id}></FlatList>

        </View>
    );
    
}

export default AdminCidades;
