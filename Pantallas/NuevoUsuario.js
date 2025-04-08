import { SafeAreaView, Text, TextInput, TouchableOpacity, View,StyleSheet, Image, ScrollView,Alert } from 'react-native';
import React, { Component, useState } from 'react';

//Mis imports
import * as Fun from "../Funciones";

//Mis imagenes
import Logo from "../Imagenes/Loguito.png";
import abierto from "../Imagenes/abierto.png";
import cerrado from "../Imagenes/cerrado.png";
import carga from "../Imagenes/Carga.png";


export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      Nombre:this.props.route.params.Nombre,
      Apellido:this.props.route.params.Apellido,
      NombreU:'',
      Telefono:'',
      Contraseña: '',
      Comprobar:'',
      Codigo:this.props.route.params.Codigo,
      NuevoUsuario:true,
      Imagen:carga,
      
    };
  }

  render() {

    const DatosCorrectos = ()=>{
        
        if(this.state.Nombre != '' &&
           this.state.Apellido != '' &&
           this.state.NombreU != '' &&
           this.state.Telefono != '' &&
           this.state.Comprobar != '' &&
           this.state.Contraseña != '' &&
           this.state.Imagen != carga){
            if(this.state.Comprobar === this.state.Contraseña){
                if(this.state.NuevoUsuario){
                    return true;
                }else{
                    return false;
                }
            }else{
                Alert.alert('Contraseñas diferentes', 'Compruebe que ha escrito correctamente las contraseñas', [ 
                    {text: 'OK', onPress: () => console.log('ok')},
                  ]);
                return false;
            }            
           }else{
            Alert.alert('Falta informacion', 'Llena todos los campos', [ 
                    
                {text: 'OK', onPress: () => console.log('ok')},
              ]);
            return false;
           }
    }

    const GuardarURL = (respuesta)=>{
        console.log(respuesta);
        // http y funcion para comprobar y subir archivos
        Fun.Request('https://lunesapp.000webhostapp.com/PHP/InsertUsuario.php?'+
        'Nombres='+this.state.Nombre+'&'+
        'Apellidos='+this.state.Apellido+'&'+
        'Nombre_U='+this.state.NombreU+'&'+
        'Telefono='+this.state.Telefono+'&'+
        'Contraseña='+this.state.Contraseña+'&'+
        'codigo='+this.state.Codigo+'&'+
        'Conductor='+ 0 +'&'+
        'Imagen=https://lunesapp.000webhostapp.com/PHP/Imagenes/'+respuesta
        , 
        Comprobar);
    }

    const GuardarURLC = (respuesta)=>{

        // http y funcion para comprobar y subir archivos
        Fun.Request('https://lunesapp.000webhostapp.com/PHP/InsertUsuario.php?'+
        'Nombres='+this.state.Nombre+'&'+
        'Apellidos='+this.state.Apellido+'&'+
        'Nombre_U='+this.state.NombreU+'&'+
        'Telefono='+this.state.Telefono+'&'+
        'Contraseña='+this.state.Contraseña+'&'+
        'codigo='+this.state.Codigo+'&'+
        'Conductor='+0+'&'+
        'Imagen=https://lunesapp.000webhostapp.com/PHP/Imagenes/'+respuesta
        , 
        ComprobarConductor);
    }



    const Comprobar = (request)=>{
            
        if(request === '0' || request === undefined){
            Alert.alert('Lo sentimos', 'No se ha creado el usuario, vuelve a intentar', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }else{
            
            Fun.Cambiarpantalla(this,'Login');
        }  

    }

    const ComprobarConductor = (request)=>{

        if(request === '0' || request === undefined){
            Alert.alert('Lo sentimos', 'No se ha creado el usuario, vuelve a intentar', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }else{
            
            Fun.Cambiarpantalla(this,'NuevoConductor',{Nombre_U: this.state.NombreU});
        }  

    }

    const Press = async() =>{


        const Comprobar = (request)=>{
            if(request === '1' || request === undefined){
                Alert.alert('Lo sentimos', 'Ese nombre de Usuario ya Existe', [
                    
                    {text: 'OK'},
                  ]);
            }else{
                
                if(DatosCorrectos()){
                    //subir imagen al servidor
                    Fun.subirImagenServidor(this.state.Imagen.uri,GuardarURL);
                }
            }
        }

        Fun.Request('https://lunesapp.000webhostapp.com/PHP/ExisteUsuario.php?'+
        'Nombre_U='+this.state.NombreU
        ,
        Comprobar);

    }

    const SerConductor = async() =>
    {

        const Comprobar = (request)=>{
            if(request === '1' || request === undefined){
                Alert.alert('Lo sentimos', 'Ese nombre de Usuario ya Existe', [
                    
                    {text: 'OK'},
                  ]);
            }else{
                
                if(DatosCorrectos()){
                    //subir imagen al servidor
                    Fun.subirImagenServidor(this.state.Imagen.uri,GuardarURLC);
        
                }
            }
        }

        Fun.Request('https://lunesapp.000webhostapp.com/PHP/ExisteUsuario.php?'+
        'Nombre_U='+this.state.NombreU
        ,
        Comprobar);


        
        
    }

    const Cargar = (uri) =>
    {        
        //console.log(uri.assets[0]);
        this.setState({Imagen:uri.assets[0]}); 
    }


    return (
      <SafeAreaView
      style = {styles.Pantalla}
      >
        <ScrollView>

        
        <View
        style = {styles.Superior}
        >
            <View
            style = {styles.Logo}
            >
                <Image
                style = {styles.Logo.Imagen}
                source = {Logo}
                ></Image>
            </View>
            
            <Text
            style={styles.Text}
            >
            Nuevo Usuario
            </Text>

        </View>


        <View
        style = {styles.Medio}
        >
            <View
            style={styles.Formulario}
            >
                <TextInput
                style = {styles.Input}
                placeholderTextColor ={'#979797'}
                placeholder= "Nombre"
                onChangeText={Nombre => this.setState({Nombre})}
                defaultValue={this.state.Nombre}
                ></TextInput>

                <TextInput
                style = {styles.Input}
                placeholderTextColor ={'#979797'}
                placeholder= "Apellido"
                onChangeText={Apellido => this.setState({Apellido})}
                defaultValue={this.state.Apellido}
                ></TextInput>

                {/*datos e imagen distintos */}

                <View
                style={styles.Distintos}
                >
                    <View>
                        <TextInput
                            style = {styles.Distintos.Input}
                            placeholderTextColor ={'#979797'}
                            placeholder= "Nombre de usuario"
                            onChangeText={NombreU => this.setState({NombreU})} 
                        ></TextInput>
                        <TextInput
                            style = {styles.Distintos.Input}
                            placeholderTextColor ={'#979797'}
                            placeholder= "Telefono"
                            onChangeText={Telefono => this.setState({Telefono})}
                        ></TextInput>
                    </View>

                    <View
                    style = {styles.Distintos.Imagen}
                    >
                        <Text
                        style={styles.Distintos.Text}
                        >
                            Imagen del
                        </Text>
                        <Text
                        style={styles.Distintos.Text}
                        >
                            Usuario
                        </Text>
                        <TouchableOpacity
                            style={styles.Cargar}
                            onPress={()=>Fun.subirImagen(Cargar)}
                            >
                                <Image
                                source={this.state.Imagen}
                                defaultSource={carga}
                                style = {styles.Cargar.Imagen}
                                />

                    </TouchableOpacity> 

                    </View>

                </View>

                {/* fin de datos e imagen distintos */}
                
                <Fun.Contraseña
                Imagen1={cerrado}
                Imagen2={abierto}
                marginBottom={'1%'}
                onChangeText={Contraseña => this.setState({Contraseña})}
                placeholderTextColor={'#979797'}
                placeholder={"Contraseña"}
                
                
                />     

                <Fun.Contraseña
                Imagen1={cerrado}
                Imagen2={abierto}
                marginBottom={'3%'}
                onChangeText={Comprobar => this.setState({Comprobar})}
                placeholderTextColor={'#979797'}
                placeholder={"Comprobar Contraseña"}
                fontSize={20}
                
                />     
                
                <Text
                style={styles.Link}
                onPress={SerConductor}
                >
                    Quieres ser
                </Text>
                <Text
                style={styles.Link}
                onPress={SerConductor}
                >
                     conductor?
                </Text>
 
                <TouchableOpacity
                style={styles.Boton}
                onPress={Press}
                >
                    <Text
                    style={styles.Boton.Text}
                    >
                        Crear
                    </Text>
                </TouchableOpacity>                

            </View> 
            {/* Fin de Formulario */}
        </View>
        

        <View
        style = {styles.Inferior}
        >

        </View>

        
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({

    Pantalla:{
        flex:1,
        backgroundColor: '#D7D4D4',
        
    },
    Superior:{
        
        height: 200,
               
    },
    Medio:{
        flex: 5,
        
    },
    Inferior:{
        flex: 1,
        height:25,
    },

    Logo:{
        width:'20%',
        minHeight: '40%',
       maxWidth:'20%',
       maxHeight:'40%',
       
        marginLeft: 'auto',
        marginRight: 'auto',

        marginTop:'5%',

        Imagen:{
        width: '100%',
        maxHeight: '100%',
        resizeMode: 'stretch',
       
        },
    },
    Text:{
        textAlign:'center',
        color:'#FF6909',
        fontSize: 25,
        marginTop:'3%',
        marginLeft:'10%',
        marginRight:'10%',
        fontWeight: 'bold',
        
    },
    Formulario:{

    },
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
    
    Link:{
        textAlign: 'right',
        color: '#050271',
        fondSize: 20,
        marginRight: '10%',
       
    },
    Boton:{
        backgroundColor: '#050271',
        borderRadius: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '60%',
        minHeight: 80,
        alignContent: 'center',

        marginTop: '5%',

        Text: {
            color: '#FF6909',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom:'auto',
            marginTop: 'auto',
            
        },
    },
    Distintos:{
        flexDirection:'row',

        Input:{
            width: '90%',
            minHeight: 55,
            fontSize: 20,
            borderWidth: 2,
            borderColor:'#797979',
            backgroundColor:'#ffffff',
            marginLeft: '15%',
            marginRight: '3%',
            marginBottom: '5%',
            textAlign: 'center',
            color: '#000000'
        },

        Imagen:{
            width: '35%',
            justifyContent: 'center',
            marginRight: '5%',
        },

        Text:{
            fontSize: 14,
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        
    },
    Cargar:{
        width:'60%',
        height: 80,

        marginRight: 'auto',
        marginLeft: 'auto',
        Imagen:{
            width:'100%',
            height:'100%',
            resizeMode: 'stretch',
        },
    },

})