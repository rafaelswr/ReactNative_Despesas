import React, {useState} from "react"
import {View, Text, StyleSheet, FlatList} from "react-native"
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import CardExpenses from "../components/CardExpenses";
import datas from "../services/data.json";

const HistoricoDespesas = (props) => {

    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    var dataDespesa = new Date(props.data);

    const day = dataDespesa.getDate();
    const monthIndex = dataDespesa.getMonth();
    const month = months[monthIndex];
    const dateString = `${day} de ${month} de ${dataDespesa.getFullYear()}`;

    var soma = 0; 
    const [currentFilter, setCurrentFilter] = useState("Apenas Pagas");

    const filteredExpenses = datas.expenses.filter((expense) => {
       soma+=expense.valor; 
        return expense.pago;
      });

    return (
    <>
        <TopNavBar leftIconName="arrow-back-outline" title="Historico Despesas"></TopNavBar>
        <View style={{flex:1, margin:10}}>
            <View style={{height:92,flexDirection:"row"}}>
                <View style={{flex:1, paddingHorizontal:10}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Ano</Text>
                    <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                        <Picker style={{borderColor:"red", width:165, borderWidth:1}} mode="dropdown" 
                            selectedValue={currentFilter} onValueChange={(value)=>setCurrentFilter(value)}>
                            <Picker.Item label="2023" value="2023"></Picker.Item>
                            <Picker.Item label="2022" value="2022"></Picker.Item>
                            <Picker.Item label="2021" value="2021"></Picker.Item>
                        </Picker>
                    </View> 
                </View>
                <View style={{flex:1, paddingHorizontal:10}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Mês</Text>
                    <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                        <Picker style={{borderColor:"red", width:165, borderWidth:1}} mode="dropdown" 
                            selectedValue={currentFilter} onValueChange={(value)=>setCurrentFilter(value)}>
                            <Picker.Item label="Maio" value="Maio"></Picker.Item>
                            <Picker.Item label="Abril" value="Abril"></Picker.Item>
                            <Picker.Item label="Março" value="Marco"></Picker.Item>
                            <Picker.Item label="Fevereiro" value="Fevereiro"></Picker.Item>
                            <Picker.Item label="Janeiro" value="Janeiro"></Picker.Item>
                            <Picker.Item label="Todos" value="Todos"></Picker.Item>
                            
                        </Picker>
                    </View> 
                </View>
            </View>

            <FlatList data={filteredExpenses} renderItem={({item})=>{
            return(<CardExpenses emissor={item.emissor} logo={`data:image/png;base64,${props.foto}`} data={item.data} pago={item.pago} descricao={item.descricao} valor={item.valor}></CardExpenses>);
            }} keyExtractor={(item) => item.id.toString()}></FlatList>

                <>
                    <Text style={{fontWeight:500, fontSize:15}}>Despesas do mês de Maio de 2023:</Text>
                    <View style={{}}>
                        <Text style={{color:"#da721d",fontWeight:500, fontSize:20}}>{soma}€</Text>
                    </View>    
                </>
            
              
            


        </View>

        <BottomNavBar historico></BottomNavBar>
    </>
  )
};

export default HistoricoDespesas;

const styles=StyleSheet.create({

});