import React,{useState} from "react"
import {View, Text,ScrollView,Image,Modal,StyleSheet,TouchableOpacity, TextInput} from "react-native"
import TopNavBar from "../components/TopNavBar";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import datas from "../services/data.json";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useImagePicker } from "../services/imageService";

const NovaDespesa = (props) => {

    const {selectedImage, modalVisible, openModal, removePhoto, ModalPress} = useImagePicker();

    const [currentFilter, setCurrentFilter] = useState("-");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState(null);
    const [value, setValue] = useState("");
    const [metodoPagamento, setMetodoPagamento] = useState("Multibanco");
    const [isSelected, setSelection] = useState(false);
    const [entidade, setEntidade] = useState("");
    const [referencia, setReferencia] = useState("");
    
     //data
    const [date, setDate] = useState(null);
    const [dateString, setDateString] = useState("");
    const [showPicker, setShowPicker] = useState(false);


    const handleDate = (event,date) => {
        setShowPicker(false);
        if (date) {
          const dateString = date.toISOString().split("T")[0];
          setDateString(dateString);
        }
      };
    
  return (
    <>
      <TopNavBar leftIconName="arrow-back-outline" 
                onPressLeft={_=>props.navigation.navigate('Home')}
                 title="Adicionar Despesa" rightIconName="checkmark-outline"></TopNavBar>
      <ScrollView style={{flex:1, margin:15}}>
            
            <View style={{height:92}}>
              <Text style={{fontSize:17, fontWeight:500}}>Emissor</Text>
              <View style={{borderWidth:1 ,borderColor:"#bdbdbd", borderRadius:10,}}>
                  <Picker style={{borderColor:"red", width:360, borderWidth:1}} mode="dropdown" 
                  selectedValue={currentFilter} onValueChange={(value)=>setCurrentFilter(value)}>
                    <Picker.Item label="-" value="-"></Picker.Item>
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

            <View style={{paddingLeft:5, flex:1}}>
                  <View  style={{flexDirection:"row", justifyContent:"flex-start",alignItems:"center"}}>
                    <Text style={{fontSize:17, fontWeight:500}}>Data de Nascimento</Text>
                    <TouchableOpacity onPress={_=>setShowPicker(true)} style={{marginHorizontal:10}} >
                      <Ionicons style={{ paddingLeft:5}} size={40} name="calendar"></Ionicons>
                    </TouchableOpacity>
                  </View>
                
                    {showPicker && (
                      <>
                          <DateTimePicker
                            mode="date"
                            value={date || new Date()}
                            onChange={handleDate}
                            maximumDate={new Date()}
                          />
                      </>
                    )}     

                    {
                      dateString!="" &&
                      (
                        <View style={[styles.textInputContainer,{width:100,paddingRight:10,marginBottom:15,justifyContent:"center",alignItems:"center"}]}>
                          <Text style={{alignSelf:"center"}}>{dateString}</Text>                          
                        </View>
                      )

                    }
                 
            </View>


            <View style={{flexDirection:"row", marginVertical:5}}>

                <View style={{flexDirection:"column", flex:0.5}}>
                            
                    <View style={{height:80,flex:0.6}}>
                        <Text style={{fontSize:17, fontWeight:500}}>Valor</Text>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{flex:1}}>
                                <TextInput keyboardType="number-pad" value={value} onChangeText={setValue} dataDetectorTypes="calendarEvent" style={styles.textInputContainer}></TextInput>
                            </View>
                            <Ionicons style={{ paddingLeft:5}} size={30} name="logo-euro"></Ionicons>
                        </View>
                    </View>
                    <View style={{ flex:0.4,paddingVertical:10, marginBottom:0, paddingHorizontal:5}}>
                    <Text style={{fontSize:17, fontWeight:500,}}>Fatura</Text>
                        <TouchableOpacity style={{backgroundColor:"#2d4dce",marginTop:10, padding:10}} onPress={()=>openModal()}>
                            <Text style={{alignSelf:"center",fontSize:17, color:"white"}}>Inserir ou tirar foto</Text>
                        </TouchableOpacity>
                    
                    </View>
                
                </View>

                {selectedImage && 
                <View style={{ flex:0.5, flexDirection:"column"}}>
                    <View style={{justifyContent:"center",alignItems:"center",flex:0.7,}}>
                        <TouchableOpacity onPress={()=>{}}>
                            <Image source={{ uri: selectedImage }} style={{flex:1,width: 150, height: 100, alignSelf:"center"}} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{marginHorizontal:20}}>
                        <TouchableOpacity style={{backgroundColor:"white"}} onPress={()=>{removePhoto()}}>
                            <Ionicons name="close-outline" style={{color:"red", alignSelf:"center",fontWeight:"bold"}} size={40}></Ionicons>
                        </TouchableOpacity> 
                    </View>
                </View>     
                }

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
                    <Picker.Item label="-" value="-"></Picker.Item>
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
                        <TextInput maxLength={5} keyboardType="number-pad" value={entidade} onChangeText={setEntidade} dataDetectorTypes="calendarEvent" style={styles.textInputMultibanco}></TextInput>

                    </View>
                    <View style={{flex:0.6,padding:10,}}>
                    <Text style={{fontWeight:"bold",textAlign:"center",fontSize:20}}>Referência</Text>
                        <TextInput maxLength={9} keyboardType="number-pad" value={referencia} onChangeText={setReferencia} dataDetectorTypes="calendarEvent" style={styles.textInputMultibanco}></TextInput>
                    </View>
                
                </View>
                
                <View style={{padding:10}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>Valor: {value}</Text>
                </View>
            </View>
            
            }
            
      </ScrollView> 
        {
            modalVisible && <ModalPress></ModalPress>
        }
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 5,
      },
      optionText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      imageContainer: {
        marginTop: 20,
        alignItems: 'center',
      },
      image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
      },

});