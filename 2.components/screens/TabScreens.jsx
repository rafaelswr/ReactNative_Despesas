import "react-native-gesture-handler"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "react-native"
import IonIcons from "react-native-vector-icons/Ionicons"

import FirstPage from './FirstPage';
import MinhasDespesas from './MinhasDespesas';
import ProfileScreens from './ProfileScreens';
import HistoricoDespesas from './HistoricoDespesas';


const TabScreens = (props, navigation) => {
  const Tab = createBottomTabNavigator();
  
  return (
      <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={({ route }) => ({
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
                    options={{title: 'User01', 
                              headerStyle: {backgroundColor: '#1A6CC1'},
                              headerTintColor: '#fff',
                    }} />

        <Tab.Screen name="Historico" 
                    component={HistoricoDespesas} 
                    options={{title: 'Historico', 
                              headerStyle: {backgroundColor: '#1A6CC1'},
                              headerTintColor: '#fff',
                    }} />

        <Tab.Screen name="Home" 
                    component={MinhasDespesas} 
                    options={{title: 'Home',
                    headerStyle: {backgroundColor: '#1A6CC1'},
                    headerTintColor: '#fff',
                    }} />

        <Tab.Screen name="Sair" component={FirstPage} />
      </Tab.Navigator>
  );
}

export default TabScreens;
