import React,{useState} from "react"
import {View, Text,TextInput,StyleSheet, ScrollView} from "react-native"
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import datas from "../services/data.json";
import geralStyles from "../styles/geralStyles";


const EditarDespesa = (props) => {

    const itemDespesa = props.route.params.despesa; 

    console.log(itemDespesa.metodoPagamento);
    const [currentFilter, setCurrentFilter] = useState(itemDespesa.emissor);
    const [descricao, setDescricao] = useState(itemDespesa.descricao);
    const [data, setData] = useState(itemDespesa.data);
    const [valor, setValor] = useState(itemDespesa.valor.toString());
    const [metodoPagamento, setMetodoPagamento] = useState(itemDespesa.metodoPagamento);
    const [isSelected, setSelection] = useState(itemDespesa.pago);
    const [entidade, setEntidade] = useState(itemDespesa.metodoPagamento =="multibanco" ? itemDespesa.entidade: null);
    const [referencia, setReferencia] = useState(itemDespesa.metodoPagamento =="multibanco"? itemDespesa.referencia:null);
  
 


  return (
    <>
        <TopNavBar leftIconName="arrow-back-outline" 
                   onPressLeft={() => {props.navigation.goBack();}}
                   title="Editar Despesa" 
                   rightIconName="checkmark-outline"></TopNavBar>
        <ScrollView style={{flex:1,margin:10}}>
            <View style={{height:92}}>
              <Text style={{fontSize:17, fontWeight:500}}>Emissor</Text>
              <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                  <Picker style={{borderColor:"red", width:360, borderWidth:1}} mode="dropdown" 
                  selectedValue={itemDespesa.emissor} onValueChange={(value)=>setCurrentFilter(value)}>
                     
                     {datas.issuers.map(issuer => (
                        <Picker.Item key={issuer.id} label={issuer.nome} value={issuer.nome} />
                     ))}         
                  </Picker>
              </View> 
            </View>

            <View style={{height:92}}>
              <Text style={geralStyles.headerInputs}>Descrição da Despesa</Text>
              <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                  maxLength={50} value={descricao}  onChangeText={setDescricao} placeholder="Ex: Eletricidade" 
                  style={styles.textInputContainer}></TextInput> 
            </View>

            <View style={{height:92}}>
                <Text style={geralStyles.headerInputs}>Data de Pagamento</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{flex:1}}>
                        <TextInput  value={data} onChangeText={setData} placeholder="aaaa/mm/dd" dataDetectorTypes="calendarEvent" style={styles.textInputContainer}></TextInput>
                    </View>
                    <Ionicons style={{ paddingLeft:5}} size={30} name="calendar-outline"></Ionicons>
                </View>
            </View>
            <View style={{height:92}}>
                <Text style={geralStyles.headerInputs}>Valor</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{flex:0.3}}>
                        <TextInput value={valor} onChangeText={(value)=>setValor(value)} style={styles.textInputContainer}></TextInput>
                    </View>
                    <Ionicons style={{ paddingLeft:5}} size={30} name="logo-euro"></Ionicons>
                </View>
            </View>
            <View style={{height:70, marginBottom:15,}}>
                <Text style={[geralStyles.headerInputs,{paddingBottom:10}]}>Estado</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{flex:0.2}}>
                    <Checkbox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                            />
                    </View>
                    <Text style={{fontSize:20, fontWeight:500}}>Pago</Text>
                </View>
            </View>
            
            <View style={{height:92}}>
              <Text style={geralStyles.headerInputs}>Tipo de Pagamento</Text>
              <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                  <Picker style={{borderColor:"red", width:360, borderWidth:1}} mode="dropdown" 
                  selectedValue={metodoPagamento} onValueChange={(value)=>setMetodoPagamento(value)}>
                        
                        {datas.metodosPagamento.map(metodo => (
                        
                            <Picker.Item key={metodo} label={metodo} value={metodo} />
                        ))}      
                  </Picker>
              </View> 
            </View>
            {metodoPagamento=="multibanco" && 
            <View style={{backgroundColor:"#edecec", marginTop:10}}>
                <View style={{flex:1, flexDirection:"row"}}>
                    <View style={{flex:0.4,padding:10,}}>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>Entidade</Text>
                        <TextInput keyboardType="number-pad" value={entidade} onChangeText={setEntidade} dataDetectorTypes="calendarEvent" style={styles.textInputMultibanco}></TextInput>
                    </View>
                    <View style={{flex:0.6,padding:10,}}>
                    <Text style={{fontWeight:"bold",textAlign:"center",fontSize:20}}>Referência</Text>
                        <TextInput keyboardType="number-pad" value={referencia} onChangeText={setReferencia} dataDetectorTypes="calendarEvent" style={styles.textInputMultibanco}></TextInput>
                    </View>
                
                </View>
                
                <View style={{padding:10}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>Valor: {valor}</Text>
                </View>
            </View>}

        </ScrollView>
    </>
  )
};

export default EditarDespesa;

const styles=StyleSheet.create({
    textInputContainer:{
        paddingLeft:10,
        borderRadius:8, 
        borderColor:"#cacaca",
        borderWidth:1,
        height:50, 
        shadowColor: '#56000c',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor:"white",
        fontSize:17,
    },
    textInputMultibanco:{
        paddingLeft:10,       
        borderColor:"#cacaca",
        borderWidth:1,
        height:40, 
        shadowColor: '#56000c',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor:"#cacaca",
        fontSize:15,
    }
});
