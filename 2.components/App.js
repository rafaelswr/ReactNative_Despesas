import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StyleSheet, } from 'react-native';
import FirstPage from './screens/FirstPage';
import Login from './screens/Login';
import Registar from './screens/Registar';
import NewPassword from './screens/NewPassword';
import TabScreens from './screens/TabScreens';


export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstPage'
                        screenOptions={{ cardStyle: {backgroundColor: '#fff'}, headerShown: false}}>
         <Stack.Screen name='FirstPage' component={FirstPage}/>
         <Stack.Screen name='Login' component={Login}/>
         <Stack.Screen name='Registar' component={Registar}/>
         <Stack.Screen name='NewPassword' component={NewPassword}/>
         <Stack.Screen name='TabScreens' component={TabScreens}/>
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
