import "react-native-gesture-handler"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "react-native"
import IonIcons from "react-native-vector-icons/Ionicons"

import FirstPage from './FirstPage';
import DespesaScreens from './DespesaScreens';
import ProfileScreens from './ProfileScreens';
import HistoricoDespesas from './HistoricoDespesas';


const TabScreens = (props, navigation) => {
  const Tab = createBottomTabNavigator();
  
  return (
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {backgroundColor: '#fff'},
          cardStyle: {backgroundColor: '#fff'},
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;

            switch (route.name) {
              case "ProfileScreens":
                iconName = focused ? 'person' : 'person';
                break;
              case "Historico":
                iconName = focused ? 'book' : 'book';
                break;
              case "Home":
                iconName = focused ? 'ios-home' : 'ios-home';
                break;
              case "Sair":
                iconName = focused ? 'exit' : 'exit';
                break;
            }

            return <IonIcons name={iconName} size={size} color={color} />
          }
        })}
      >
        <Tab.Screen name="ProfileScreens" 
                    component={ProfileScreens} 
                    /*options={({ route }) => ({ title: route.params.username })} */ 
                    options={{title: 'User01'}} />

        <Tab.Screen name="Historico" 
                    component={HistoricoDespesas} 
                    options={{title: 'Historico'}} />

        <Tab.Screen name="Home" 
                    component={DespesaScreens} 
                    options={{title: 'Home'}} />

        <Tab.Screen name="Sair" component={FirstPage} />
      </Tab.Navigator>
  );
}

export default TabScreens;
