import React,{useState} from "react"
import {View, Text, TextInput,FlatList} from "react-native"
import MyButtons from '../../components/MyButtons';
import AdminCard from '../../components/Admin/AdminCard';
import Pesquisa from '../../components/Pesquisa';
import adminStyles from "../../styles/adminStyles.jsx";
import geralStyles from '../../styles/geralStyles';
import AdminTopNav from '../../components/Admin/AdminTopNav';
import datas from "../../services/data.json";

const MetodosPagamento = (props) => {

    const [search, setSearch] = useState("");
    const [newPagamento, setnewPagamento] = useState("");
    const [existsPagamento, setExistsPagamento] = useState(false);
    
  return (

    <View style={adminStyles.containerMain}>
                <AdminTopNav iconName="refresh-outline" title="Métodos Pagamento"></AdminTopNav> 

                <Pesquisa search={search} onSearch={(value)=>setSearch(value)}></Pesquisa>
               
                <View style={adminStyles.horizontalLine}/>
                
                <View style={{height:86}}>
                    <Text style={geralStyles.headerInputs}>Novo Método Pagamento</Text>
                    <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                            maxLength={50} value={newPagamento}  onChangeText={setnewPagamento} placeholder="Insira um novo método..." 
                            style={[geralStyles.textInputContainer, existsPagamento && styles.invalidInput]}></TextInput> 
                    {
                      existsPagamento && <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Esta Cidade já existe</Text>
                    }
                    
                </View>

                <View style={adminStyles.horizontalLine}/>

            
                    <FlatList data={datas.metodosPagamento} renderItem={({item})=>{
                        return( <AdminCard onPress={()=>{}} name="close-outline" size={34} title={item} backgroundColor="#ACFDEE"></AdminCard>);
                    }} keyExtractor={(item) => item.toString()}></FlatList>

                
                
            </View>
        );
};

export default MetodosPagamento;

