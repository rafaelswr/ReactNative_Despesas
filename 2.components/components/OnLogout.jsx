import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import geralStyles from '../styles/geralStyles';
import MyButtons from './MyButtons';

const OnLogout = (props) => {
    const [showModal, setShowModal] = useState(props.show);
   
    
    const ModalPress = ()=>{
        return (
              <Modal visible={showModal} animationType="fade" transparent={true}>
                <View style={geralStyles.modal}>
                    <View style={geralStyles.modalContainer}>
                     <Text style={geralStyles.modalText}>Tem a certeza que deseja Terminar Sessão?</Text>
                      <View style={{flexDirection:"row"}}>
                        <View style={{flex:1}}>
                            <MyButtons onPress={()=>{props.navigation.navigate('Login')}} title="Sim" color="#1a6dc0"></MyButtons>
                        </View>
                        <View style={{flex:1}}>
                            <MyButtons onPress={()=>{props.navigation.popToTop();setShowModal(false);}}  title="Não" color="#989696"></MyButtons>
                        </View>
                     </View>
                    </View>
                </View>
            </Modal>
          );
      }
    
    return (
      <View>
        {showModal && <ModalPress></ModalPress>}
      </View>
    );
  };
  
  export default OnLogout;

