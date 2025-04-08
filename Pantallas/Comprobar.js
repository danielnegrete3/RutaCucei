import { SafeAreaView, Text, TextInput, TouchableOpacity, View,StyleSheet, Image ,Alert} from 'react-native';
import React, { Component, useState } from 'react';

//Mis imports
import * as Fun from "../Funciones";

//Mis imagenes
import Logo from "../Imagenes/Loguito.png";
import abierto from "../Imagenes/abierto.png";
import cerrado from "../Imagenes/cerrado.png";


export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      Codigo: '',
      nip: '',
      Ojo: cerrado,
      vista: true,
    };
  }

  

  render() {


    const Press = () =>{
        const nombre = (Completo,codigo)=>{
            var separadas = Completo.split(' ');
            var nombre= separadas[0]+ ' ' + separadas[1];
            var apellidos = '';
            var size = separadas.length;
            for(let x=2; x < size ;x++ ){
                if(x < size-1){
                    apellidos += separadas[x] + ' ';
                }else{
                    apellidos += separadas[x];
                }
            }
            return ({Nombre: nombre, Apellido: apellidos,Codigo:codigo})
        }

        const funcion = (request)=>{
            if(request === '0' || request === undefined){
                Alert.alert('Lo sentimos', 'Codigo o usuario incorrectos', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
            }else{
                let Datos = request.split(',');
                console.log(Datos);
                
                Fun.Cambiarpantalla(this,'NuevoUsuario',nombre(Datos[2],Datos[1]));
            }  
        } 

        Fun.Request(
            'http://148.202.152.33/ws_claseaut.php?codigo=' +
            this.state.Codigo +
            '&nip=' +
            this.state.nip,
            funcion
        )
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
            
            <Text
            style={styles.Text}
            >
            La aplicación se reserva el uso a la comunidad universitaria  de CUCEI
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
                placeholder= "Codigo"
                onChangeText={Codigo => this.setState({Codigo})}
                ></TextInput>
                
                <Fun.Contraseña
                Imagen1={cerrado}
                Imagen2={abierto}
                marginBottom={'5%'}
                onChangeText={nip => this.setState({nip})}
                placeholderTextColor={'#979797'}
                placeholder={"Nip"}
                
                />                
 
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
        height:250
        
               
    },
    Medio:{
        flex: 4,
        
    },
    Inferior:{
        flex: 1,
    },

    Logo:{
        width:'25%',
        minHeight:'40%',
       maxWidth:'25%',
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
        color:'#000000',
        fontSize: 15,
        marginTop:'10%',
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
        color:'#000000',
    },
    Contra:{
        flexDirection: 'row',
        width:'100%',

        Input:{
            borderWidth: 2,
            borderColor:'#797979',
            backgroundColor: '#ffffff',
            fontSize: 25,
            width: '60%',
            minHeight: 55,
            marginLeft: '10%',
            display: 'flex',
            marginTop: '2.5%',
            marginBottom: '5%',
            textAlign: 'center',
            
        },

        Cuadro:{
            
            width:'20%',
            
            borderWidth: 2,
            
            borderColor:'#797979',
            backgroundColor:'#ffffff',

            marginTop:'2.5%',
            marginRight:'10%',
            marginBottom: '5%',

            maxWidth: '20%',
            maxHeight: 60,
        },

        Ojo:{
            width: '100%',
            height:'100%',
            resizeMode: 'stretch',
        }
    },
    Boton:{
        backgroundColor: '#050271',
        borderRadius: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '60%',
        minHeight: 80,
        alignContent: 'center',

        marginTop: '10%',

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