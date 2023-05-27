import { createStackNavigator } from "@react-navigation/stack";

import Perfil from './Perfil';
import EditarPerfil from './EditarPerfil';

const ProfileScreens = (props) => {
  const StackProfile = createStackNavigator();
  
  return (
      <StackProfile.Navigator initialRouteName='Perfil'
                              screenOptions={{headerShown: false}}>
         <StackProfile.Screen name='Perfil' component={Perfil} options={{headerShown: false}}/>
         <StackProfile.Screen name='EditarPerfil' component={EditarPerfil}/>
       </StackProfile.Navigator>
  );
}

export default ProfileScreens