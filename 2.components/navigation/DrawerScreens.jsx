import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';

import AdminEmissores from '../screens/Admin/AdminEmissores';
import AdminCidades from '../screens/Admin/AdminCidades';
import MetodosPagamento from '../screens/Admin/MetodosPagamento';
import AdminUtilizadores from '../screens/Admin/AdminUtilizadores';
import AdminPage from '../screens/Admin/AdminPage';
import NovoEmissor from "../screens/Admin/NovoEmissor";



const DrawerScreens = () => {
  const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator gestureEnabled={false} screenOptions={{swipeEnabled:true, drawerType:"front", keyboardDismissMode:"on-drag", headerShown:false}}>
            <Drawer.Screen name="AdminEmissores" component={AdminEmissores} options={{drawerLabel:"Emissores"}} />
            <Drawer.Screen name="AdminCidades" component={AdminCidades} options={{drawerLabel:"Cidades"}}/>
            <Drawer.Screen name="AdminPage" component={AdminPage} options={{drawerLabel:"Administrador"}}/>
            <Drawer.Screen name="MetodosPagamento" component={MetodosPagamento}  options={{drawerLabel:"Métodos Pagamento"}}/>
            <Drawer.Screen name="AdminUtilizadores" component={AdminUtilizadores}  options={{drawerLabel:"Utilizadores"}} />
            <Drawer.Screen name="NovoEmissor" component={NovoEmissor} options={{drawerLabel:"Novo Emissor"}} ></Drawer.Screen>
           </Drawer.Navigator> 
  );
}

export default DrawerScreens;
