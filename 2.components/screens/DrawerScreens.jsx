import "react-native-gesture-handler"
import { createDrawerNavigator } from '@react-navigation/drawer';

import MinhasDespesas from './MinhasDespesas';
import AdminEmissores from './Admin/AdminEmissores';
import AdminCidades from './Admin/AdminCidades';
import MetodosPagamento from './Admin/MetodosPagamento';
import AdminUtilizadores from './Admin/AdminUtilizadores';
import AdminPage from './Admin/AdminPage';


const DrawerScreens = (props, navigation) => {
  const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={MinhasDespesas} />
        <Drawer.Screen name="AdminEmissores" component={AdminEmissores} />
        <Drawer.Screen name="AdminCidades" component={AdminCidades} />
        <Drawer.Screen name="AMetodosPagamento" component={MetodosPagamento} />
        <Drawer.Screen name="AdminUtilizadores" component={AdminUtilizadores} />
        <Drawer.Screen name="AdminPage" component={AdminPage} />
   </Drawer.Navigator>
  );
}

export default DrawerScreens;
