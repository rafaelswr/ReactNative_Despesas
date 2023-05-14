import { StyleSheet, Text, View } from 'react-native';
import MinhasDespesas from './screens/MinhasDespesas';
import Perfil from './screens/Perfil';
import EditarPerfil from './screens/EditarPerfil';
import NovaDespesa from './screens/NovaDespesa';
import DetalheDespesa from './screens/DetalheDespesa';
import EditarDespesa from './screens/EditarDespesa';
import HistoricoDespesas from './screens/HistoricoDespesas';
import Registar from './screens/Registar';
import Login from './screens/Login';
import FirstPage from './screens/FirstPage';
import AdminCidades from './screens/Admin/AdminCidades';
import AdminUtilizadores from './screens/Admin/AdminUtilizadores';
import MetodosPagamento from './screens/Admin/MetodosPagamento';
import AdminEmissores from './screens/Admin/AdminEmissores';
import NovoEmissor from './screens/Admin/NovoEmissor';
import AdminPage from "./screens/Admin/AdminPage";
import AdminUser from './screens/Admin/AdminUser';
import NewPassword from './screens/NewPassword';

export default function App() {
  return (
    <>
    <AdminUtilizadores></AdminUtilizadores>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
