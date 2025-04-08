import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Pantallas
import Login from "./Pantallas/Login";
import Comprobar from "./Pantallas/Comprobar";
import NuevoUsuario from "./Pantallas/NuevoUsuario";
import NuevoConductor from "./Pantallas/NuevoConductor";
import Principal from "./Pantallas/Principal";
import Ruta from "./Pantallas/Ruta";
//import Ruta from "./Pantallas/Mapa";
//import Ruta from "./Pantallas/Map2";
import Usuario from "./Pantallas/Usuario";
import Conductor from "./Pantallas/Conductor";
import DatosRuta from "./Pantallas/DatosRuta";
import ModificarC from "./Pantallas/ModificarC";
import ModificarU from "./Pantallas/ModificarU";
import ModificarContra from "./Pantallas/ModificarContra";

import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} 
          options = {{headerShown:false,}} />   

          <Stack.Screen name="Comprobar" component={Comprobar} 
          options = {{headerShown:false,}} />  

          <Stack.Screen name="NuevoUsuario" component={NuevoUsuario} 
          options = {{headerShown:false,}} />  

          <Stack.Screen name="NuevoConductor" component={NuevoConductor} 
          options = {{headerShown:false,}} />   

          <Stack.Screen name="Principal" component={Principal} 
          options = {{headerShown:false,}} />  

          <Stack.Screen name="Ruta" component={Ruta} 
          options = {{headerShown:false,}} /> 

          <Stack.Screen name="Usuario" component={Usuario} 
          options = {{headerShown:false,}} />

          <Stack.Screen name="Conductor" component={Conductor} 
          options = {{headerShown:false,}} />    

          <Stack.Screen name="ModificarC" component={ModificarC} 
          options = {{headerShown:false,}} />  

          <Stack.Screen name="ModificarU" component={ModificarU} 
          options = {{headerShown:false,}} /> 

          <Stack.Screen name="ModificarContra" component={ModificarContra} 
          options = {{headerShown:false,}} /> 

          <Stack.Screen name="DatosRuta" component={DatosRuta} 
          options = {{headerShown:false,}} />  

    

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default App;