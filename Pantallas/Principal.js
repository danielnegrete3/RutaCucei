import { SafeAreaView, Text, TextInput, TouchableOpacity, View,StyleSheet, Image, ScrollView, Dimensions,Alert } from 'react-native';
import React, { Component, useState } from 'react';

//Mis imports
import * as Fun from "../Funciones";

//Mis imagenes
import user from "../Imagenes/user.png";
import conductor from "../Imagenes/conductor.png";

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { 
      usuario: [styles.Elegido,true],
      conductor: [styles.Touch,false],
      
    };
  }
  
  componentDidMount() {
   
  }

  render() {

    

    const Press = () =>{
        if( this.props.route.conductor == '0'){
            /*comprobacion */
            
            Alert.alert('No eres Conductor aun', '¿Quieres ser conductor?', [ 
                    
                {text: 'Sí', onPress: () => Fun.Cambiarpantalla(this,'NuevoConductor',
                {Nombre_U:this.props.route.params.Nombre_U})},
                {text: 'No', onPress: () => console.log('No Quiso')}
              ]);

        }else{
            
            if(this.state.usuario[1]){

                this.setState({
                    usuario: [styles.Touch,false],
                    conductor: [styles.Elegido,true]
                })

            }else{
                this.setState({
                    usuario: [styles.Elegido,true],
                    conductor: [styles.Touch,false],
                })
            }

        }
        
    }

    return (
      <SafeAreaView
      style = {styles.Pantalla}
      >
        <ScrollView>

        
        <View
        style = {styles.Superior}
        >
            
            <Image 
            style = {styles.Imagen}
             source={{uri:this.props.route.params.Imagen,}}
            />
            
            
            <Text
            style={styles.Text}
            >
             hola {this.props.route.params.Nombre_U}
            </Text>

        </View>


        <View
        style = {styles.Medio}
        >
            <View
            style={styles.Marco}
            >
                <Text
                style={styles.Marco.Text}
                >
                    Modo de uso
                </Text>
                
                <View
                style={styles.Imagenes}
                >
                    <TouchableOpacity
                    style={this.state.usuario[0]}
                    onPress={Press}
                    >
                        <Image
                        source={user}
                        style={styles.Touch.Imagen}
                        />
                        <Text style={styles.Touch.Text}> Usuario </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    
                    style={this.state.conductor[0]}
                    onPress={Press}

                    >
                        <Image
                        source={conductor}
                        style={styles.Touch.Imagen}
                        />
                        <Text style={styles.Touch.Text}> Conductor </Text>
                    </TouchableOpacity>
                </View>

                
            </View>
        </View>
        {/*final de medio */}

    </ScrollView>
        <View
        style = {styles.Inferior}
        >
            <Fun.BarraInferior
            this_={this}
            params={{
                Id: this.props.route.params.Id,
                Conductor:this.props.route.params.Conductor,
                Nombre_U: this.props.route.params.Nombre_U,
                Usuario: this.state.usuario[1],
                Imagen: this.props.route.params.Imagen,
            }}
            />
        </View>

        
        
      </SafeAreaView>
    )
  }
}

var Contenido = (Dimensions.get("window").height - 50);
  var width = Dimensions.get("window").width ;
  var Ancho = (Dimensions.get("window").width * 0.50);
  var alto = (Contenido * 0.30);

const styles = StyleSheet.create({

    Pantalla:{
        
        height:'100%',
        backgroundColor: '#D7D4D4',
        
    },
    Superior:{
        
        height: 400,
               
    },
    Medio:{
        
       height:500
    },
    Inferior:{
        
        
        height:50,
        
    },

    Imagen:{
        
        width:Ancho,
        maxWidth: Ancho,
        height: alto,
        marginLeft:'auto',
        marginRight: 'auto',
        borderRadius: 100,
        marginTop:30,
        marginBottom:30,
        resizeMode: 'stretch',
        
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
            marginLeft: '15%',
            marginRight: '3%',
            marginBottom: '5%',
            textAlign: 'center',
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
    Marco:{
        backgroundColor: '#c8c8c8',
        width: '90%',
        height: '40%',

        maxHeight: '40%',

        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 20,

        Text:{
            fontSize: 14,
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
        },

    },
    Imagenes:{
        flexDirection: 'row',

    },
    Touch:{
        width:'40%',
        maxHeight:'90%',

        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
                
        Imagen:{
            width:'100%',
            height:'90%',
        },
        Text:{
            color:'#000000',
            fondSize: 12,
            textAlign: 'center',
        },
    },
    Elegido:{
        width:'40%',
        maxHeight:'90%',

        borderRadius: 10,

        marginLeft: 'auto',
        marginRight: 'auto',

        backgroundColor: "#e1e1e1",

        Imagen:{
            width:'100%',
            height:'100%',
        },
    },

})