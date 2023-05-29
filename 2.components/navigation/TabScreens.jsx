import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text} from "react-native"

import {Ionicons} from "@expo/vector-icons";
import FirstPage from "../screens/FirstPage";
import MinhasDespesas from "../screens/MinhasDespesas";
import HistoricoDespesas from "../screens/HistoricoDespesas";
import ProfileScreens from "../screens/ProfileScreens";
import Perfil from "../screens/Perfil";
import OnLogout from "../components/OnLogout";

const TabScreens = (props, navigation) => {
  const Tab = createBottomTabNavigator();
  
  return (
      <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarShowLabel:false,
          headerShown:false, 
          tabBarStyle: {backgroundColor: '#fff',borderTopWidth:2,borderTopColor:"black",height:55,paddingTop:3},
          cardStyle: {backgroundColor: '#ffffff'},
          tabBarIcon: ({ focused }) => {
            let iconName;
            let textIcon; 

            switch (route.name) {
              case "Perfil":
                iconName = focused ? 'person' : 'person';
                textIcon = "Perfil";
                break;
              case "Historico":
                iconName = focused ? 'book' : 'book';
                textIcon = "Histórico";
                break;
              case "Home":
                iconName = focused ? 'home' : 'home';
                textIcon = "Página Inicial";
                break;
              case "Sair":
                iconName = focused ? 'log-out' : 'log-out';
                textIcon = "Sair";
                break;
            }

            return (
                <View style={{padding:5, justifyContent:"center",alignItems:"center"}}>
                  <Ionicons name={iconName} size={25} color={focused ? "#1b6cc0" : "black"}></Ionicons>
                  <Text style={{color:focused ? "#1b6cc0":"black",fontWeight:"500", fontSize:13, paddingBottom:3}}>{textIcon}</Text>
                </View>
            )
          },
        
        })}>
        <Tab.Screen name="Perfil" component={Perfil}></Tab.Screen>
        <Tab.Screen name="Historico" component={HistoricoDespesas} />
        <Tab.Screen name="Home" component={MinhasDespesas} />
        <Tab.Screen name="Sair">
            {(props) => <OnLogout show={true} {...props}/>}
        </Tab.Screen>

      </Tab.Navigator>
  );
}

export default TabScreens;

