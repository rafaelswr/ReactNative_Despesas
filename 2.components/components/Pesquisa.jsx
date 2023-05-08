import React from "react";
import {View, TextInput} from "react-native";
import geralStyles from "../styles/geralStyles.jsx";

const Pesquisa = (props) => {
  return (
    <View>
        <TextInput numberOfLines={1} autoComplete="off" autoCorrect={false}
        maxLength={50} value={props.search} onChangeText={props.onSearch} placeholder="Pesquisar" 
            style={geralStyles.searchStyles}/>
    </View>
  )
};

export default Pesquisa;