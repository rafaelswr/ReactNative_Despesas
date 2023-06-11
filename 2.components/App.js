import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {View, Text, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, } from 'react-native';
import FirstPage from './screens/FirstPage';
import Login from './screens/Login';
import Registar from './screens/Registar';
import NewPassword from './screens/NewPassword';
import TabScreens from './navigation/TabScreens';
import MinhasDespesas from "./screens/MinhasDespesas";
import EditarPerfil from "./screens/EditarPerfil";
import DetalheDespesa from "./screens/DetalheDespesa";
import EditarDespesa from "./screens/EditarDespesa";
import AdminEmissores from "./screens/Admin/AdminEmissores";
import MetodosPagamento from "./screens/Admin/MetodosPagamento";
import AdminCidades from "./screens/Admin/AdminCidades";
import AdminPage from "./screens/Admin/AdminPage";
import AdminUser from "./screens/Admin/AdminUser";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Perfil from "./screens/Perfil";
import HistoricoDespesas from "./screens/HistoricoDespesas";
import OnLogout from "./components/OnLogout";
import NovaDespesa from "./screens/NovaDespesa";
import NovoEmissor from "./screens/Admin/NovoEmissor";
import AdminUtilizadores from "./screens/Admin/AdminUtilizadores";
import DrawerScreens from "./navigation/DrawerScreens";
import EditarEmissor from "./screens/Admin/EditarEmissor";

/*
const AppNavigation = ({ isAdmin, isAuthenticated}) => {
 
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='FirstPage'
                        screenOptions={{ cardStyle: {backgroundColor: "#fff"}, headerShown:false}}>
          <Stack.Screen name='FirstPage' component={FirstPage}/>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
         <Stack.Screen name='NewPassword' component={NewPassword}/>
         <Stack.Screen name="MinhasDespesas" component={MinhasDespesas} />
          <Stack.Screen name="DetalheDespesa" component={DetalheDespesa} />
          <Stack.Screen name="EditarDespesa" component={EditarDespesa} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          <Stack.Screen name="Registar" component={Registar} />
          <Stack.Screen name="NovaDespesa" component={NovaDespesa} />
          <Stack.Screen name="AdminUser" component={AdminUser} />
          <Stack.Screen name="AdminUtilizadores" component={AdminUtilizadores} />
          
          <Stack.Screen name="HistoricoDespesas" component={HistoricoDespesas} />
          {
            !isAdmin ?
            <Stack.Screen name='TabScreens' component={TabScreens}/>    
            : 
            <Stack.Screen name='DrawerScreens' component={DrawerScreens}/>
          }
       </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  const isAdmin = true; 
  //const isAuthenticated = true; 
  return <AppNavigation isAdmin={isAdmin} />;
};

export default App;

*/


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AdminStack = () => (
  <Stack.Navigator screenOptions={{ cardStyle: {backgroundColor: "#fff"}, headerShown:false}}>
    <Stack.Screen name="NovoEmissor" component={NovoEmissor}/>
    <Stack.Screen name="EditarEmissor" component={EditarEmissor}/>
  </Stack.Navigator>
);

const UserStack = () => (
  <Stack.Navigator screenOptions={{ cardStyle: {backgroundColor: "#fff"}, headerShown:false}}>
    <Stack.Screen name="HistoricoDespesas" component={HistoricoDespesas} />
    <Stack.Screen name="DetalheDespesa" component={DetalheDespesa} />
    <Stack.Screen name="EditarDespesa" component={EditarDespesa} />
    <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
    <Stack.Screen name="NovaDespesa" component={NovaDespesa}></Stack.Screen>

  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ cardStyle: {backgroundColor: "#fff"}, headerShown:false}}>
    <Stack.Screen name="FirstPage" component={FirstPage} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Registar" component={Registar} />
    
  </Stack.Navigator>
);

const AppNavigation = ({ isAdmin, isAuthenticated}) => {
  return (
    <NavigationContainer independent={true}>

     {isAuthenticated ? (
        isAdmin ? (
          <Drawer.Navigator gestureEnabled={false} 
              screenOptions={{
                drawerStyle:{backgroundColor:"#7cb9f4"},
                drawerLabelStyle:{fontSize:16},
                drawerInactiveTintColor:"black",
                swipeEnabled:true,
                drawerType:"front",
                keyboardDismissMode:"on-drag",
                headerShown:false, 
            
              }}>
            <Drawer.Screen name="AdminStack" component={AdminStack} options={{drawerItemStyle: { height: 0 }}}/>
           <Drawer.Screen name="Cidades" component={AdminCidades}/>
                      <Drawer.Screen name="Emissores" component={AdminEmissores} />
           <Drawer.Screen name="AdminPage" component={AdminPage} options={{title:"Página Administrador"}}/>
            <Drawer.Screen name="MetodosPagamento" component={MetodosPagamento} options={{title:"Métodos Pagamento"}} />
            <Drawer.Screen name="Utilizadores" component={AdminUtilizadores} />
            <Drawer.Screen name="Sair" component={AdminUtilizadores}/>
          </Drawer.Navigator>
        ) : (
          <Tab.Navigator id="Tab"
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
          <Tab.Screen name="UserStack" component={UserStack} options={{ tabBarButton: () => null, tabBarVisible: false}}/> 
          <Tab.Screen name="Perfil" component={Perfil}></Tab.Screen>
          <Tab.Screen name="Historico" component={HistoricoDespesas} />
          <Tab.Screen name="Home" component={MinhasDespesas} />
          <Tab.Screen name="Sair">
              {(props) => <OnLogout show={true} {...props}/>}
          </Tab.Screen>
        </Tab.Navigator>
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  const isAdmin = false;  
  const isAuthenticated = false; 

  return <AppNavigation isAdmin={isAdmin} isAuthenticated={isAuthenticated} />;
};

export default App;


/*

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='FirstPage'
                        screenOptions={{ cardStyle: {backgroundColor: "#fff"}, headerShown:false}}>
          <Stack.Screen name='FirstPage' component={FirstPage}/>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="MinhasDespesas" component={MinhasDespesas}></Stack.Screen> 
          <Stack.Screen name="EditarPerfil" component={EditarPerfil}></Stack.Screen>
          <Stack.Screen name='NewPassword' component={NewPassword}/>
          <Stack.Screen name='EditarDespesa' component={EditarDespesa}/>
          <Stack.Screen name='DetalheDespesa' component={DetalheDespesa}/>
          <Stack.Screen name='TabScreens' component={TabScreens}/>
          <Stack.Screen name="DrawerScreens" component={DrawerScreens}></Stack.Screen>
       </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgrondColor: '#fff'
  },
});
 */