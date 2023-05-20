import React,{useState} from "react"
import {View, Text, FlatList, ScrollView} from "react-native"
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import CardExpenses from "../components/CardExpenses";
import { Picker } from "@react-native-picker/picker"
import datas from "../services/data.json";

const MinhasDespesas = (props, navigation) => {
  const [currentFilter, setCurrentFilter] = useState("Ver Todas");
  
  var soma = 0; 
  const filteredExpenses = datas.expenses.filter((expense) => {
    soma += expense.valor;
    const expenseDate = new Date(expense.data);
    const today = new Date();
    const timeDiff = expenseDate.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (currentFilter === "Atrasadas") {
      return !expense.pago && diffDays < 0;
    } else if (currentFilter === "Por Pagar") {
      return !expense.pago && diffDays >= 0;
    } else if (currentFilter === "Apenas Pagas") {
      return expense.pago;
    } else {
      return true;
    }
  });

  return (
    <>      
      <View style={{margin:10, flex:1}}> 
          <Text style={{fontSize:17,paddingTop:5}}>Seja bem-vindo <Text style={{fontWeight:"bold"}}>user1!</Text></Text>
          <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between", paddingTop:20,paddingBottom:10}}>
              <Text style={{fontSize:20,fontWeight:"600", flex:0.4}}>maio 2023</Text>
              <View style={{flex:0.6 ,borderWidth:2 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                  <Picker style={{borderColor:"red", width:220, borderWidth:2}} mode="dropdown" 
                  selectedValue={currentFilter} onValueChange={(value)=>setCurrentFilter(value)}>
                      <Picker.Item label="Ver Todas" value="Ver Todas"></Picker.Item>
                      <Picker.Item label="Apenas Pagas" value="Apenas Pagas"></Picker.Item>
                      <Picker.Item label="Atrasadas" value="Atrasadas"></Picker.Item>
                      <Picker.Item label="Por Pagar" value="Por Pagar"></Picker.Item>
                  </Picker>
              </View>
          </View>
  
        <FlatList data={filteredExpenses} renderItem={({item})=>{
            return(<CardExpenses emissor={item.emissor} logo={`data:image/png;base64,${props.foto}`} data={item.data} pago={item.pago} descricao={item.descricao} valor={item.valor}></CardExpenses>);
        }} keyExtractor={(item) => item.id.toString()}></FlatList>
        
        {
          currentFilter=="Ver Todas" && 
            <> 
            <Text style={{fontSize:17}}>Total das Despesas do mês</Text>
            <Text style={{fontSize:20, color:"blue"}} >{soma}€</Text>
            </>
        }
       </View>
    </>
  )
};

export default MinhasDespesas;
