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
      Marca:'',
      Color:'',
      Modelo:'',
      Imagen:carga,
      Placa:'',
      Marcas:[],
      Modelos:[]
    };
  }

  componentDidMount() {
    const Comprobar = (request)=>{
            
        if(request === '0' || request === undefined){
            
        }else{
            var Datos = JSON.parse(request);
            this.setState({Marcas: Datos})
        }  

    }

   Fun.Request('https://lunesapp.000webhostapp.com/PHP/Marcas.php', 
        Comprobar);

}

  render() {

    const Cambiar = (Marca) =>{
        const Comprobar = (request)=>{
            
            if(request === '0' || request === undefined){
                this.setState({Modelos: []});
            }else{
                console.log("si esta cambiando");
                var Datos = JSON.parse(request);
                this.setState({Modelos: Datos});
            }  
    
        }
       this.setState({Marca:Marca});
       Fun.Request('https://lunesapp.000webhostapp.com/PHP/Modelo.php?'+
       "Marca="+Marca, 
            Comprobar);
    }

    const GuardarURL = (respuesta)=>{
        console.log('https://lunesapp.000webhostapp.com/PHP/NuevoConductor.php?'+
        'Nombre_U='+this.props.route.params.Nombre_U+'&'+
        'Color='+this.state.Color+'&'+
        'Modelo='+this.state.Modelo+'&'+
        'Marca='+this.state.Marca+'&'+
        'Imagen=https://lunesapp.000webhostapp.com/PHP/Imagenes/'+respuesta+'&'+
        'Placas='+this.state.Placa);
        // http y funcion para comprobar y subir archivos
        Fun.Request('https://lunesapp.000webhostapp.com/PHP/NuevoConductor.php?'+
        'Nombre_U='+this.props.route.params.Nombre_U+'&'+
        'Color='+this.state.Color+'&'+
        'Modelo='+this.state.Modelo+'&'+
        'Marca='+this.state.Marca+'&'+
        'Imagen=https://lunesapp.000webhostapp.com/PHP/Imagenes/'+respuesta+'&'+
        'Placas='+this.state.Placa
        , 
        Comprobar);
        
    }

    const DatosCorrectos = ()=>{
        
        if(this.state.Marca != '' &&
           this.state.Color != '' &&
           this.state.Modelo != '' &&
           this.state.Placa != '' &&
           this.state.Imagen != carga){
            return true;         
           }else{
            Alert.alert('Falta informacion', 'Llena todos los campos', [ 
                    
                {text: 'OK', onPress: () => console.log('ok')},
              ]);
            return false;
           }
    }

    const Comprobar = (request)=>{

        if(request === '0' || request === undefined){
            Alert.alert('Lo sentimos', 'No se ha creado el Conductor, vuelve a intentar', [
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

    const Press = () =>{
        if(DatosCorrectos()){
            //subir imagen al servidor y mandar datos
             Fun.subirImagenServidor(this.state.Imagen.uri,GuardarURL); 
        }
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
        <View>

        
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
            Nuevo Conductor
            </Text>

        </View>


        <View
        style = {styles.Medio}
        >
            <View
            style={styles.Formulario}
            >
                

                {/*datos e imagen distintos */}

                <View
                style={styles.Distintos}
                >
                    <View>
                        <TextInput
                            style = {styles.Distintos.Input}
                            placeholderTextColor ={'#979797'}
                            placeholder= "Placa"
                            onChangeText={Placa => this.setState({Placa})}
                        ></TextInput>
                        <TextInput
                            style = {styles.Distintos.Input}
                            placeholderTextColor ={'#979797'}
                            placeholder= "Color del carro"
                            onChangeText={Color => this.setState({Color})}
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
                            Carro
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
                
                <Fun.InputDesplegable                
                placeholder= "Marca"
                onChangeText={Marca => Cambiar(Marca)}
                arreglo={this.state.Marcas}
                Visibility={true}
                />

                <Fun.InputDesplegable                
                placeholder= "Modelo"
                onChangeText={Modelo => this.setState({Modelo})}
                arreglo={this.state.Modelos}
                Visibility={true}
                />
                
                 
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
        flex: 1,
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
            marginBottom: '3%',
            textAlign: 'center',
            color: '#000000',
            
        },
    
        InputC:{
            borderWidth: 2,
            borderColor:'#797979',
            backgroundColor: '#ffffff',
            fontSize: 20,
            width: '60%',
            minHeight: 55,
            marginLeft: '10%',
            display: 'flex',
            marginTop: '2.5%',
            marginBottom: '3%',
            textAlign: 'center',
            color: '#000000',
            
        },

        Cuadro:{
            
            width:'20%',
            
            borderWidth: 2,
            
            borderColor:'#797979',
            backgroundColor:'#ffffff',

            marginTop:'2.5%',
            marginRight:'10%',
            marginBottom: '3%',

            maxWidth: '20%',
            maxHeight: 60,
        },

        Ojo:{
            width: '100%',
            height:'100%',
            resizeMode: 'stretch',
        }
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
            marginLeft: '19%',
            marginRight: '3%',
            marginBottom: '5%',
            textAlign: 'center',
            color: '#000000',
        },

        Imagen:{
            width: '35%',
            justifyContent: 'center',
            marginRight: 'auto',
            marginLeft: 'auto',
        },

        Text:{
            fontSize: 14,
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: -3,
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