import React, { useEffect, useState } from "react"
import { View, Text, TextInput, FlatList } from "react-native"
import MyButtons from '../../components/MyButtons';
import AdminCard from '../../components/Admin/AdminCard';
import Pesquisa from '../../components/Pesquisa';
import adminStyles from "../../styles/adminStyles.jsx";
import geralStyles from '../../styles/geralStyles';
import AdminTopNav from '../../components/Admin/AdminTopNav';
//firestore
import { adminManagementCreateAsync } from "../../services/firebaseService";
import { getMetodosPagamentoAsync } from "../../services/firebaseService";

const MetodosPagamento = (props) => { 

    const [metodosPagamento, setMetodosPagamento] = useState([]);
    const [filteredMethods, setFilteredMethods] = useState([]);
    const [newPagamento, setNewPagamento] = useState("");
    const [existsPagamento, setExistsPagamento] = useState(false);
    

    useEffect(()=>{
        getMetodos();
    },[]); 

    const getMetodos = ()=>{
        getMetodosPagamentoAsync((value)=>{
            setMetodosPagamento(value);
            setFilteredMethods(value);
        });
    }

    const existsAsync =  () => {
        
    }

   const onSuccess = ()=>{
        alert(`Método de Pagamento adicionado!`);
        setNewPagamento("");
        setExistsPagamento(false);
        console.log("Método adicionado");
    } 


  return (

    <View style={adminStyles.containerMain}>
      <AdminTopNav iconName="refresh-outline" OnPress={()=>{
        getMetodos(); 
      }}  title="Métodos Pagamento"></AdminTopNav> 

      <Pesquisa onSearch = {(search)=>{ 
          setFilteredMethods(metodosPagamento.filter(method=>{
            return method.nome.toLowerCase().includes(search.toLowerCase());
          }))
         
      }}/>
      
      <View style={adminStyles.horizontalLine}/>

      <View style={{height:86}}>
          <Text style={geralStyles.headerInputs}>Novo Método Pagamento</Text>
          <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                  maxLength={50}  value={newPagamento}  onChangeText={(value)=>{
                    setNewPagamento(value);
                }} placeholder="Insira um novo método..." 
                  style={[geralStyles.textInputContainer, existsPagamento && geralStyles.invalidInput]}></TextInput> 
          { 
            existsPagamento && <Text style={{color:"red",fontWeight:"bold", fontSize:12}}>Este método de pagamento já existe!</Text>
          }
          
      </View>

      <View style={{flexDirection:"row"}}>
      <View style={{flex:1}}>
          <MyButtons onPress={ () => { 

                const exists  = metodosPagamento.some(method=>{
                    return method.nome.toLowerCase() === newPagamento.toLowerCase();
                });

                if(!exists && newPagamento!=""){ 
                    
                    const obj = {
                        nome:newPagamento,
                    }
                    adminManagementCreateAsync(obj, "metodosPagamento", onSuccess);
                }else{

                    setExistsPagamento(true);
                    console.log("Método já existe");
                }
           
              }} title="Guardar" color="#1a6dc0"></MyButtons>
      </View>
      <View style={{flex:1}}>
          <MyButtons onPress={()=>{
              setExistsPagamento(false);
              setNewPagamento("");
          }}  title="Limpar" color="#989696"></MyButtons>
      </View>
  </View>

      <View style={adminStyles.horizontalLine}/>

  
          <FlatList data={filteredMethods} renderItem={({item})=>{
              return( <AdminCard modalReference="o Metodo de Pagamento" onPress={()=>{}} name="close-outline" size={34} title={item.nome} backgroundColor="#ACFDEE"></AdminCard>);
          }} keyExtractor={(item) => item.id}></FlatList>

      
      
  </View>
  );
};

export default MetodosPagamento;

