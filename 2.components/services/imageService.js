import react,{ useState } from 'react';
import {Modal, Text, View, TouchableWithoutFeedback} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MyButtons from '../components/MyButtons';
import geralStyles from '../styles/geralStyles';

export function useImagePicker() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImageAsync = async (option) => {
        let result;
        switch (option) {
            case 'camera': {
                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    quality: 1,
                });
                break;
            }
            case 'library': {
                result = await ImagePicker.launchImageLibraryAsync({
                    quality: 1,
                    allowsEditing: true,
                });
                break;
            }
        }

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('Nenhuma imagem inserida!');
            setSelectedImage(null);
        }
    }

    const openModal = () => setModalVisible(true);
    
    const closeModal = () => setModalVisible(false);
    
    const removePhoto = () => setSelectedImage(null);

    const ModalPress = ()=>{
        return (
            <Modal  visible={modalVisible} animationType="fade" transparent={true}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={geralStyles.modal}>
                    
                    <View style={geralStyles.modalContainerToPhotos}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1}}>
                            <MyButtons onPress={()=>{closeModal(); return pickImageAsync("camera");}} title="Câmara" color="#1a6dc0"></MyButtons>
                        </View>
                        <View style={{flex:1}}>
                            <MyButtons onPress={()=>{closeModal(); return pickImageAsync("library");}}  title="Galeria" color="#49a60f"></MyButtons>
                        </View>
                    </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
    
    return { selectedImage, modalVisible,removePhoto, openModal, ModalPress };
}


