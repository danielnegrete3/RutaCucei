import { SafeAreaView, Text, TextInput, TouchableOpacity, View,StyleSheet, Image ,Alert} from 'react-native';
import React, { Component } from 'react';

//Mis imports
import * as Fun from "../Funciones";

//Mis imagenes
import Logo from "../Imagenes/CuCeI_logo.png";
import abierto from "../Imagenes/abierto.png";
import cerrado from "../Imagenes/cerrado.png";


export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      Usuario: '',
      Contraseña: '',
    };
  }

  render() {

    const comprobar=(request)=>{
        if(request === '0' || request === undefined){
            Alert.alert('Lo sentimos', 'Usuario incorrecto', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }else{
            let Datos = JSON.parse(request);

            if(this.state.Contraseña === Datos[0].Contraseña){
                console.log(Datos[0].Imagen);
                
                Fun.Cambiarpantalla(this,'Principal',{Nombre_U:this.state.Usuario,
                Conductor:Datos[0].Conductor , Id:Datos[0].Id, Imagen:Datos[0].Imagen });
            }else{
                Alert.alert('Lo sentimos', 'Contraseña incorrecta', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
            }
            
            
        }
    }

    const Press = () =>{
        
        Fun.Request("https://lunesapp.000webhostapp.com/PHP/Login.php?"+
        "Nombre_U="+ this.state.Usuario
        ,comprobar)
    }

    return (
      <SafeAreaView
      style = {styles.Pantalla}
      >
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
                placeholder= "Usuario"
                onChangeText={Usuario => this.setState({Usuario})}
                ></TextInput>

                <Fun.Contraseña
                Imagen1={cerrado}
                Imagen2={abierto}
                marginBottom={'5%'}
                onChangeText={Contraseña => this.setState({Contraseña})}
                placeholderTextColor={'#979797'}
                placeholder={"Contraseña"}
                
                />
                
                {/*Fin de contraseña*/}
                
                <Text
                style={styles.Link}
                onPress={()=> Fun.Cambiarpantalla(this,'Comprobar')}
                >
                    Nuevo usuario?
                </Text>
 
                <TouchableOpacity
                style={styles.Boton}
                onPress={Press}
                >
                    <Text
                    style={styles.Boton.Text}
                    >
                        Ingresar
                    </Text>
                </TouchableOpacity>                

            </View> 
            {/* Fin de Formulario */}
        </View>
        

        <View
        style = {styles.Inferior}
        >

        </View>

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
        
        height:250,
               
    },
    Medio:{
        flex: 4,
        
    },
    Inferior:{
        flex: 1,
    },

    Logo:{
        width:'80%',
        minHeight: '80%',
       maxWidth:'80%',
       maxHeight:'80%',
       
        marginLeft: 'auto',
        marginRight: 'auto',

        Imagen:{
        width: '100%',
        maxHeight: '100%',
        resizeMode: 'stretch',
       
        },
    },
    Formulario:{

    },
    Input:{
        width: '80%',
        minHeight: 55,
        fontSize: 25,
        borderWidth: 2,
        borderColor:'#797979',
        backgroundColor: '#ffffff',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '5%',
        textAlign: 'center',
        color: '#000000'
    },
    
    Link:{
        textAlign: 'right',
        color: '#050271',
        fondSize: 20,
        marginRight: '5%',
        marginBottom:'5%',
       
    },
    Boton:{
        backgroundColor: '#050271',
        borderRadius: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '60%',
        minHeight: 80,
        alignContent: 'center',

        Text: {
            color: '#FF6909',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom:'auto',
            marginTop: 'auto',
            
        },
    },

})