import React,{useState} from 'react'
import { View, Text, TextInput,FlatList, Alert} from "react-native"
import MyButtons from '../../components/MyButtons';
import AdminCard from '../../components/Admin/AdminCard';
import Pesquisa from '../../components/Pesquisa';
import adminStyles from "../../styles/adminStyles.jsx";
import geralStyles from '../../styles/geralStyles';
import AdminTopNav from '../../components/Admin/AdminTopNav';
import datas from "../../services/data.json";

const AdminCidades = (props)=>{
    
    const [cities, setCities] = useState(datas.cities);
    const [filteredCities, setFilteredCities] = useState(datas.cities);
    const [newCity, setNewCity] = useState("");
    const [cityExists, setCityExists] = useState(false);

    const handleBlur = () => {
        setCityExists(false);
    }

    return(
        <View style={adminStyles.containerMain}>
            <AdminTopNav iconName="refresh-outline" title="Cidades"></AdminTopNav> 
               
            <Pesquisa onSearch={(search) => {
                setFilteredCities(cities.filter(city=>{
                    return city.toLowerCase().includes(search.toLowerCase());
                }));
                }}></Pesquisa>
            
            <View style={adminStyles.horizontalLine}/>
            
            <View style={{height:86}}>
                <Text style={geralStyles.headerInputs}> Nova Cidade </Text>
                <TextInput onChangeText={setNewCity} numberOfLines={1} autoComplete="off" autoCorrect={false}
                        maxLength={50} onBlur={handleBlur} value={newCity}  placeholder="Nova cidade" 
                        style={[geralStyles.textInputContainer, cityExists && geralStyles.invalidInput]}></TextInput> 
                {
                  cityExists && <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Esta Cidade já existe</Text>
                }
            </View>

            <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}>
                    <MyButtons onPress={()=>{
                       setCityExists(cities.some(city=>{
                            return city.toLowerCase() === newCity.toLowerCase();
                        }));
                        
                        }} title="Guardar" color="#1a6dc0"></MyButtons>
                </View>
                <View style={{flex:1}}>
                    <MyButtons onPress={()=>{
                        setNewCity("");
                    }}  title="Cancelar" color="#989696"></MyButtons>
                </View>
            </View>
            
            <View style={adminStyles.horizontalLine}/>

            <FlatList data={filteredCities} renderItem={({item})=>{
                  return( <AdminCard onPress={()=>{}} name="close-outline" size={34} title={item} backgroundColor="#FDEBAC"></AdminCard>);
            }} keyExtractor={(item) => item.toString()}></FlatList>

        </View>
    );
    
}

export default AdminCidades;
