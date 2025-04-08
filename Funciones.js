import { SafeAreaView, Text, TextInput, TouchableOpacity, View,StyleSheet, Image, Alert, ScrollView } from 'react-native';
import {Avatar} from 'react-native-elements';
import React, { Component, useState } from 'react';
import {assign, map, size}  from 'lodash';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//Imagenes
import user from "./Imagenes/user.png";
import ruta from "./Imagenes/R_Black.png";
import casa from "./Imagenes/House.png";


          /*Funciones de la aplicacion */
export const Cambiarpantalla = (this_,Pantalla,Datos={}) => 
{
    //pasar parametros en el segundo parametro
    this_.props.navigation.navigate(
        Pantalla, 
        Datos
    );
  };

export const Request = (http, funcion)=>
{
    var xhttp = new XMLHttpRequest();
    let Regreso = "0";
      xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          //Asignando la variable que regresa el servidor
          Regreso = xhttp.responseText;
          funcion(Regreso);
        }
      };
      xhttp.open(
        'GET',
        http,
        true,
      );
    xhttp.send();      
}



//image picker 
export const subirImagen = (funcion) =>
{
  

    const opciones = {
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 100,
      selectionLimit:1,

  }

  const guardar = async(camara)=>{
    //camara
    if (camara){
      const result = await launchCamera(opciones);

      if(result.errorCode === 'permission'){
        requestCameraPermission();
      }

      if(!result.didCancel){
        
        funcion(result);
      }

    }
    else {
      const result = await launchImageLibrary(opciones);

      if(result.errorCode === 'permission'){
        requestCameraPermission();
      }

      if(!result.didCancel){
        funcion(result);
      }

    }
    
  }

  botones = [
    {
      text: 'Galeria',
      onPress: () =>  guardar(false),
    },
    {
      text: 'Camara',
      onPress: () =>  guardar(true)
    },
  ];

  Alert.alert('Cual quieres utilizar?', '', botones);


}

//por si necesitamos permisos 
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Ruta Cucei Permisos",
        message:
          "Esta funcion requiere que le otorgues permisos de la camara para poder ejecutarse ",
        buttonNeutral: "Preguntame despues",
        buttonNegative: "Cancelar",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export const subirImagenServidor = async(uri,funcion) =>
{
  const response = await fetch(uri);
  const blob = await response.blob();
  //console.log("Blob:" + blob);
  var render = new FileReader();
  

  render.onload = () =>{

    var InsertAPI = 'https://lunesapp.000webhostapp.com/PHP/Subir-Imagen.php#39';
    //console.log("Render result: "+render.result);

    var Data = {img:render.result};

    var headers = {
      'Accept':'aplication/json',
      'Content-Type':'application.json'
    };

    var RequestInit = {
      method:'POST',
      headers: headers,
      body: JSON.stringify(Data),
    }

    fetch(InsertAPI,RequestInit).then((response)=>response.text()).then((response)=>{
      console.log("server: " + response);
      var listo=false;
      var respuesta='';

      for(var x=0;x<response.length;x++){
        //console.log(response[x]);
        if(response[x]==='}'){
          break;
        }
        if(listo){
          respuesta+=response[x];
        }
        if(response[x]==='{'){
          listo=true;
        }
      }

      //el echo del servidor en un string
      console.log(respuesta);
      //Aqui abajo pones la funcion con lo que quieras hacer
      funcion(respuesta);
      
    })
    .catch(err=>{
      console.log(err);
    });
  }

  render.readAsDataURL(blob);
} 

export const Hash= (Dato)=>{
  

}

export const deHash= (Dato, hash)=>{
  

}

const ToNumber=(str)=>{
  var numero=[], tama = str.length;
  for(var x = 0 ; x<  tama; x++){
    console.log(str[x].charCodeAt(0));
    numero.push(str[x].charCodeAt(0));
  }
  return numero;
}

const toString = (arr)=>{
  var str='';
  for(var x = 0 ; x<  arr.length; x++){
    console.log(String.fromCharCode(arr[x]));
    str+= String.fromCharCode(arr[x]);
  }
  return str;
}

export async function getLocationPermission() {
  if (true) {
    Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          console.log("error");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}

}

        /* Etiquertas propias */

//barra inferior 

export const BarraInferior = ({this_,params=''})=>{
  const styles = StyleSheet.create({
    Barra:{
      width: '100%',
      height: '100%',
      backgroundColor: '#C8C8C8',
      borderTopColor:'#a8a8a8',
      borderTopWidth:2,
      flexDirection:'row',
    },
    Touch:{
      maxWidth: '30%',
      maxHeight: '100%',
      marginRight:'auto',
      marginLeft: 'auto',
    },
    Imagen:{
      maxWidth: '70%',
      maxHeight: '100%',
      resizeMode: 'stretch',
    }
  })

  const principal = () =>
  {
    if(params === ''){
      Cambiarpantalla(this_,"Principal",this_.props.route.params);
    }else{
      Cambiarpantalla(this_,"Principal",params);
    }
  }
  const mapa = () =>
  {
    if(params === ''){
      Cambiarpantalla(this_,"Ruta",this_.props.route.params);
    }else{
      Cambiarpantalla(this_,"Ruta",params);
    }
    
  }
  const usuario = () =>
  {

    if(params === ''){
      Cambiarpantalla(this_,"Usuario",this_.props.route.params);
    }else{
      Cambiarpantalla(this_,"Usuario",params);
    }    
  }


  return(
    <View
    style={styles.Barra}
    >
      <TouchableOpacity
      style={styles.Touch}
      onPress={principal}
      >
        <Image
        style = {styles.Imagen}
        source={casa}
        />
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.Touch}
      onPress={mapa}
      >
        <Image
        style = {styles.Imagen}
        source={ruta}
        />
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.Touch}
      onPress={usuario}
      >
        <Image
        style = {styles.Imagen}
        source={user}
        />
      </TouchableOpacity>

    </View>
  );
}
//fin barra inferior


//Etiqueta de contraseña
export const Contraseña = ({Imagen1,Imagen2,marginBottom,onChangeText,placeholderTextColor, placeholder , fontSize=25})=>
{

  const [state, setState] = useState({
    Imagen:Imagen1,
    vista:true,
  });

  
  const Visualizar = () =>{
    if(state.vista){
        setState({
            Imagen:Imagen2,
            vista: false,
        });
    }else{
        setState({
          Imagen:Imagen1,
            vista: true,
        });
    }
  }

  const styles = StyleSheet.create({
    Contra:{
      flexDirection: 'row',
      width:'100%',
  
      Input:{
          borderWidth: 2,
          borderColor:'#797979',
          backgroundColor: '#ffffff',
          fontSize: fontSize,
          width: '60%',
          minHeight: 55,
          marginLeft: '10%',
          display: 'flex',
          marginTop: '2.5%',
          marginBottom: marginBottom,
          textAlign: 'center',
          color: '#000000',
          
      },
  
      Cuadro:{
          
          width:'20%',
          
          borderWidth: 2,
          
          borderColor:'#797979',
          backgroundColor: '#ffffff',
  
          marginTop:'2.5%',
          marginRight:'10%',
          marginBottom: marginBottom,
  
          maxWidth: '20%',
          maxHeight: 60,
      },
  
      Ojo:{
          width: '100%',
          height:'100%',
          resizeMode: 'stretch',
      }
  },
  });

  return(
    <View
      style={styles.Contra}
                >
        <TextInput
          style = {styles.Contra.Input}
          placeholderTextColor ={placeholderTextColor}
          secureTextEntry={state.vista}
          placeholder= {placeholder}
          onChangeText= {onChangeText}
        ></TextInput>

          <TouchableOpacity
          style={styles.Contra.Cuadro}
          onPress={Visualizar}
          >                        
            <Image
              source={state.Imagen}
              style={styles.Contra.Ojo}
            />               
                        
      </TouchableOpacity>

    </View> 
  );

  

}

//final de contraseña

// Input desplegable

export const InputDesplegable=({
  onChangeText, placeholder, arreglo, Visibility, defaultValue=''
})=>{

  const [selecto, setSelecto] = useState('');
  const [dentro, setDentro] = useState(false);

  const styles = StyleSheet.create({
    Input:{
        width: '80%',
        minHeight: 55,
        fontSize: 25,
        borderWidth: 2,
        borderColor:'#797979',
        backgroundColor:'#ffffff',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '3%',
        textAlign: 'center',
        color: '#000000',
    },
    scroll:{
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      maxHeight: 130,
      marginTop: '-3%',

      borderLeftWidth: 2,
      borderLeftColor:'#797979',
      borderRightWidth:2,
      borderRightColor:'#797979',
      borderBottomWidth:2,
      borderBottomColor:'#797979',

      backgroundColor: '#ffffff',

      marginBottom: '3%',
      
    },
    TouchableOpacity:{
      width: '100%',
      height:45,
      borderBottomWidth:1,
      borderBottomColor:'#000000',
      
    },
    Text:{
      fontSize: 25,
      color: '#000000',
      textAlign: 'center',
    },

  });

//ciclo donde se guardan todas las etiquetas se debe usar un arregglo
  let Etiquetas = []
  
  for(let x=0;x<size(arreglo);x++){
    Etiquetas.push(
      <TouchableOpacity
      style={styles.TouchableOpacity}
      
      onPress={()=>{
        setDentro(false);
        onChangeText(arreglo[x]);
        setSelecto(arreglo[x]);
      }}
      
      >
        <Text 
        style={styles.Text}>
          {arreglo[x]}
          </Text>
      </TouchableOpacity>
    )
  }

  //aqui se almacena el cuadro si es que si hay etiquetas
  let Cuadro = [];

  if(size(Etiquetas) > 0 && Visibility){
    Cuadro.push(
      <ScrollView 
      style={styles.scroll}
      onMomentumScrollBegin={()=>setDentro(true)}
      >
      {Etiquetas}
      </ScrollView> 
    )
  }

  if (defaultValue === ''){
    var final = [
      <View
    >
    <TextInput
      style = {styles.Input}
      placeholderTextColor ={'#979797'} 
      placeholder= {placeholder}
      onChangeText={text =>{onChangeText(text);setSelecto(text);}}
      onPressIn ={()=>setDentro(true)}
      defaultValue={selecto}
    ></TextInput>
    {dentro && Cuadro}
    </View>
    ]
  }else{
    var final = [
      <View
    >
    <TextInput
      style = {styles.Input}
      placeholderTextColor ={'#979797'} 
      placeholder= {placeholder}
      onChangeText={text =>{onChangeText(text);}}
      onPressIn ={()=>setDentro(true)}
      defaultValue={defaultValue}
    ></TextInput>
    {dentro && Cuadro}
    </View>
    ]
  }


  return( final);

}

//Reloj


///Final de reloj


export const SelectDrop=({
  onChangeText, placeholder, arreglo, Visibility, defaultValue=''
})=>{

  //const [selecto, setSelecto] = useState('');
  const [dentro, setDentro] = useState(false);

  const styles = StyleSheet.create({
    Input:{
        width: '80%',
        minHeight: 55,
        fontSize: 25,
        borderWidth: 2,
        borderColor:'#797979',
        backgroundColor:'#ffffff',
        marginTop: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '2%',
        textAlign: 'center',
        color: '#000000',
    },
    scroll:{
      
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      maxHeight: 130,
      marginTop: '-3%',

      borderLeftWidth: 2,
      borderLeftColor:'#797979',
      borderRightWidth:2,
      borderRightColor:'#797979',
      borderBottomWidth:2,
      borderBottomColor:'#797979',

      backgroundColor: '#ffffff',

      marginBottom: '3%',
      
    },
    TouchableOpacity:{
      width: '100%',
      height:45,
      borderBottomWidth:1,
      borderBottomColor:'#000000',
      
    },
    Text:{
      fontSize: 25,
      color: '#000000',
      textAlign: 'center',
    },

  });

//ciclo donde se guardan todas las etiquetas se debe usar un arregglo
  let Etiquetas = []
  
  for(let x=0;x<size(arreglo);x++){
    Etiquetas.push(
      <TouchableOpacity
      style={styles.TouchableOpacity}
      
      onPress={()=>{
        setDentro(false);
        onChangeText(arreglo[x]);
        //setSelecto(arreglo[x]);
      }}
      
      >
        <Text 
        style={styles.Text}>
          {arreglo[x]}
          </Text>
      </TouchableOpacity>
    )
  }

  //aqui se almacena el cuadro si es que si hay etiquetas
  let Cuadro = [];

  if(size(Etiquetas) > 0 && Visibility){
    Cuadro.push(
      <ScrollView 
      style={styles.scroll}
      onMomentumScrollBegin={()=>setDentro(true)}
      >
      {Etiquetas}
      </ScrollView> 
    )
  }

 
    var final = [
      <View
    >
    <TouchableOpacity
      style = {styles.Input}
      placeholderTextColor ={'#050271'} 
      onPressIn ={()=>setDentro(true)}
    >
      <Text style={{color:'#050271', fontSize: 25 , textAlign : 'center',marginTop:'auto',marginBottom:'auto'}}>{defaultValue}</Text>
    </TouchableOpacity>
    {dentro && Cuadro}  
    </View>
    ]


  return( final);

}

export const GoogleSearch = () =>{

  return (
    <GooglePlacesAutocomplete
                placeholder="Buscar"
                minLength={6}
                placeholderTextColor="#979797"
                query={{
                    key: '',
                    language: 'es'
                }}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false
                }}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        position: 'absolute',
                        top: Platform.select({ ios: 60, android: 40 }),
                        width: '100%'
                    },
                    textInputContainer: {
                        marginHorizontal: 10,
                        flex: 1,
                        backgroundColor: 'transparent',
                        height: 54,
                        borderTopWidth: 0,
                        borderBottomWidth: 0

                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        padding: 0,
                        borderRadius: 9,
                        elevation: 5, // Shadow android
                        shadowColor: palette.dark.main, // Shadow ios
                        shadowOpacity: 0.1, // Shadow ios
                        shadowOffset: { x: 0, y: 0 }, // Shadow ios
                        shadowRadius: 15,  // Shadow ios
                        borderWidth: 1,
                        borderColor: palette.grayScale.gray100,
                        fontSize: 18
                    },
                    listView: {
                        marginHorizontal: 20,
                        borderWidth: 1,
                        borderColor: palette.grayScale.gray100,
                        backgroundColor: palette.primary.contrastText,
                        elevation: 5,
                        shadowColor: palette.dark.main, // Shadow ios
                        shadowOpacity: 0.1, // Shadow ios
                        shadowOffset: { x: 0, y: 0 }, // Shadow ios
                        shadowRadius: 15,  // Shadow ios
                        marginTop: 15
                    },
                    description: {
                        fontSize: 15
                    },
                    row: {
                        padding: 18,
                        height: 58
                    }
                }}

            />

  )

}