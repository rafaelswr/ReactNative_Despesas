import React,{useState} from "react"
import {View, Text,ScrollView,StyleSheet, TextInput} from "react-native"
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import datas from "../services/data.json";

const NovaDespesa = (props) => {

  const [currentFilter, setCurrentFilter] = useState("Meo, Altice");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(null);
  const [value, setValue] = useState("17.99");
  const [metodoPagamento, setMetodoPagamento] = useState("multibanco");
  const [isSelected, setSelection] = useState(false);
  const [entidade, setEntidade] = useState("");
  const [referencia, setReferencia] = useState("");

  return (
    <>
      <TopNavBar leftIconName="arrow-back-outline" title="Adicionar Despesa" rightIconName="checkmark-outline"></TopNavBar>
      <ScrollView style={{flex:1, margin:15}}>
            
            <View style={{height:92}}>
              <Text style={{fontSize:17, fontWeight:500}}>Emissor</Text>
              <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                  <Picker style={{borderColor:"red", width:360, borderWidth:1}} mode="dropdown" 
                  selectedValue={currentFilter} onValueChange={(value)=>setCurrentFilter(value)}>
                         {datas.issuers.map(issuer => (
                        <Picker.Item key={issuer.id} label={issuer.nome} value={issuer.nome} />
                     ))}    
                  </Picker>
              </View> 
            </View>

            <View style={{height:92}}>
              <Text style={{fontSize:17, fontWeight:500}}>Descrição da Despesa</Text>
              <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
                  maxLength={50} value={descricao}  onChangeText={setDescricao} placeholder="Ex: Eletricidade" 
                  style={styles.textInputContainer}></TextInput> 
            </View>

            <View style={{height:92}}>
                <Text style={{fontSize:17, fontWeight:500}}>Data de Pagamento</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{flex:0.8}}>
                        <TextInput  value={data} onChangeText={setData} dataDetectorTypes="calendarEvent" style={styles.textInputContainer}></TextInput>
                    </View>
                    <Ionicons style={{ paddingLeft:5}} size={30} name="calendar-outline"></Ionicons>
                </View>
            </View>
            <View style={{height:92}}>
                <Text style={{fontSize:17, fontWeight:500}}>Valor</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{flex:0.3}}>
                        <TextInput keyboardType="number-pad" value={value} onChangeText={setValue} dataDetectorTypes="calendarEvent" style={styles.textInputContainer}></TextInput>
                    </View>
                    <Ionicons style={{ paddingLeft:5}} size={30} name="logo-euro"></Ionicons>
                </View>
            </View>
            <View style={{height:70, marginBottom:15,}}>
                <Text style={{fontSize:17, fontWeight:500,paddingBottom:10}}>Estado</Text>
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
              <Text style={{fontSize:17, fontWeight:500}}>Tipo de Pagamento</Text>
              <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                  <Picker style={{borderColor:"red", width:360, borderWidth:1}} mode="dropdown" 
                  selectedValue={metodoPagamento} onValueChange={(value)=>setMetodoPagamento(value)}>
                      {datas.metodosPagamento.map(item => (
                        <Picker.Item key={item} label={item} value={item} />
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
                    <Text style={{fontSize:20,fontWeight:"bold"}}>Valor: {value}</Text>
                </View>
            </View>
            
            }
      </ScrollView> 
      <BottomNavBar></BottomNavBar>
    </>
  )
};

export default NovaDespesa;

const styles = StyleSheet.create({
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