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

    const [metodosPagamento, setMetodosPagamento] = useState(datas.metodosPagamento);
    const [filteredMethods, setFilteredMethods] = useState(datas.metodosPagamento);
    const [newPagamento, setNewPagamento] = useState("");
    const [existsPagamento, setExistsPagamento] = useState(false);
    

    const handleBlur = () => {
      setExistsPagamento(false);
   }


  return (

    <View style={adminStyles.containerMain}>
      <AdminTopNav iconName="refresh-outline" title="Métodos Pagamento"></AdminTopNav> 

      <Pesquisa onSearch={(search)=>{
          setFilteredMethods(metodosPagamento.filter(method=>{
            return method.toLowerCase().includes(search.toLowerCase());
          }))
      }}></Pesquisa>
      
      <View style={adminStyles.horizontalLine}/>
      
      <View style={{height:86}}>
          <Text style={geralStyles.headerInputs}>Novo Método Pagamento</Text>
          <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                  maxLength={50} onBlur={handleBlur} value={newPagamento}  onChangeText={setNewPagamento} placeholder="Insira um novo método..." 
                  style={[geralStyles.textInputContainer, existsPagamento && geralStyles.invalidInput]}></TextInput> 
          {
            existsPagamento && <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Este método de pagamento já existe!</Text>
          }
          
      </View>

      <View style={{flexDirection:"row"}}>
      <View style={{flex:1}}>
          <MyButtons onPress={()=>{
              setExistsPagamento(metodosPagamento.some(method=>{
                  return method.toLowerCase() === newPagamento.toLowerCase();
              }));

              }} title="Guardar" color="#1a6dc0"></MyButtons>
      </View>
      <View style={{flex:1}}>
          <MyButtons onPress={()=>{
              setNewPagamento("");
          }}  title="Cancelar" color="#989696"></MyButtons>
      </View>
  </View>

      <View style={adminStyles.horizontalLine}/>

  
          <FlatList data={filteredMethods} renderItem={({item})=>{
              return( <AdminCard onPress={()=>{}} name="close-outline" size={34} title={item} backgroundColor="#ACFDEE"></AdminCard>);
          }} keyExtractor={(item) => item.toString()}></FlatList>

      
      
  </View>
  );
};

export default MetodosPagamento;

