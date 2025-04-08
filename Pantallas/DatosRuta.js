import { SafeAreaView, Text, TextInput, TouchableOpacity, View,StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
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
      Datos:'',
      
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
        <View 
        style={styles.Contenido}>

            <View
            style={styles.Conductor}
            >
                <View
                style={styles.Titulo}
                >
                    <Text
                    style={styles.Titulo.Text}
                    >
                        Conductor
                    </Text>
                </View>

                <View
                style={styles.Contenedor}
                >
                    <View
                    style={styles.Cuadrito}
                    >
                        <Image
                        style={styles.Imagen}
                        source={user}
                        />

                        <View>
                            <Text
                            style={styles.Cuadrito.Text}
                            >
                                daniel eso
                            </Text>
                            <Text
                            style={styles.Cuadrito.Text}
                            >
                                Tel: {}
                            </Text>
                        </View>

                    </View>

                    <View
                    style={styles.Cuadrito}
                    >
                        <Image
                        style={styles.Imagen}
                        source={user}
                        />

                        <View>
                            <Text
                            style={styles.Cuadrito.Text}
                            >
                                daniel eso
                            </Text>
                            <Text
                            style={styles.Cuadrito.Text}
                            >
                                Tel: {}
                            </Text>

                            <Text
                            style={styles.Cuadrito.Text}
                            >
                                Tel: {}
                            </Text>
                        </View>

                    </View>

                </View>

            </View>

            {
                
            }
            <View
            style={styles.Usuario}
            >
                <View
                style={styles.Titulo}
                >
                    <Text
                    style={styles.Titulo.Text}
                    >
                        Usuario 1
                    </Text>
                </View>

                <View
                style={styles.ContenedorU}
                >
                    <View
                    style={styles.CuadritoU}
                    >
                        <Image
                        style={styles.Imagen}
                        source={user}
                        />

                    </View>

                    <View
                    style={styles.CuadritoU}
                    >

                        <View>
                            <Text
                            style={styles.CuadritoU.Text1}
                            >
                                daniel eso
                            </Text>
                            <Text
                            style={styles.CuadritoU.Text}
                            >
                                Tel: {}
                            </Text>

                        </View>

                    </View>

                </View>

            </View>

            <View
            style={styles.Usuario}
            >
                <View
                style={styles.Titulo}
                >
                    <Text
                    style={styles.Titulo.Text}
                    >
                        Usuario 1
                    </Text>
                </View>

                <View
                style={styles.ContenedorU}
                >
                    <View
                    style={styles.CuadritoU}
                    >
                        <Image
                        style={styles.Imagen}
                        source={user}
                        />

                    </View>

                    <View
                    style={styles.CuadritoU}
                    >

                        <View>
                            <Text
                            style={styles.CuadritoU.Text1}
                            >
                                daniel eso
                            </Text>
                            <Text
                            style={styles.CuadritoU.Text}
                            >
                                Tel: {}
                            </Text>

                        </View>

                    </View>

                </View>

            </View>
        
        {/*final de medio */}

        </View>

        <View
        style = {styles.Inferior}
        >
            <Fun.BarraInferior
            this_={this}
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
  var cuadW = ((width*0.9)*0.49);

const styles = StyleSheet.create({

    Pantalla:{
        
        height:'100%',
        backgroundColor: '#D7D4D4',
        
    },
    Contenido:{
        height: Contenido,
        
    },
    Inferior:{
        
        
        height:50,
        
    },
    Conductor:{
        backgroundColor: '#CCC8C8',
        marginTop: 10,
        marginBottom: '3%',
        width: (width * 0.9),
        height: (Contenido * .35),
        marginLeft: (width * 0.05),
        borderRadius: 25,

    },
    Usuario:{
        backgroundColor: '#CCC8C8',
        marginTop: 10,
        marginBottom: '3%',
        width: (width * 0.9),
        height: (Contenido * .25),
        marginLeft: (width * 0.05),
        borderRadius: 25,

    },
    Titulo:{
        width: '100%',
        height: 40,
        Text:{
            fontSize: 25,
            color: '#050271',
            textAlign: 'center',
        },

        
    },
    Cuadrito:{
        width: ((width * 0.9)*0.5),
        Text:{
            fontSize:15,
            color: '#000000',
            textAlign: 'center',
        }
    },
    CuadritoU:{
        width: ((width * 0.9)*0.5),
        alignContent: 'center',
        Text:{
            fontSize:15,
            color: '#000000',
            textAlign: 'center',
        },
        Text1:{
            fontSize:15,
            color: '#000000',
            textAlign: 'center',
            marginTop: ((Contenido * .25)*0.2),
        }
    },
    Imagen: {
        width: (cuadW * 0.5),
        maxWidth: (cuadW * 0.5),
        height: (cuadW * 0.5),
        marginLeft:(cuadW * 0.25),
        borderRadius: 100,
        marginBottom:10,
        marginTop: 10,
        resizeMode: 'stretch',
    },
    Contenedor:{
        flexDirection:'row',
        width: cuadW,
        height: (Contenido * .35),

    },

    ContenedorU:{
        flexDirection:'row',
        width: cuadW,
        height: (Contenido * .25),

    },
    

})