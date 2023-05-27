import { createStackNavigator } from "@react-navigation/stack";

import MinhasDespesas from './MinhasDespesas';
import DetalheDespesa from './DetalheDespesa';
import NovaDespesa from './NovaDespesa';
import EditarDespesa from './EditarDespesa';

const DespesaScreens = (props) => {
  const StackDespesa = createStackNavigator();
  
  return (
      <StackDespesa.Navigator initialRouteName='MinhasDespesas'
                              screenOptions={{headerShown: false}}>
         <StackDespesa.Screen name='MinhasDespesas' component={MinhasDespesas}/>
         <StackDespesa.Screen name='DetalheDespesa' component={DetalheDespesa}/>
         <StackDespesa.Screen name='NovaDespesa' component={NovaDespesa}/>
         <StackDespesa.Screen name='EditarDespesa' component={EditarDespesa}/>
       </StackDespesa.Navigator>
  );
}

export default DespesaScreens