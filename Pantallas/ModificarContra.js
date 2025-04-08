import React, {Component,useEffect} from 'react';
import { View, Text , StyleSheet, SafeAreaView, Image, ScrollView,Dimensions,TouchableOpacity, Alert} from 'react-native';
//import * as Location from 'expo-location';

//Mis imports
import * as Fun from "../Funciones";

//Fotos
import abierto from "../Imagenes/abierto.png";
import cerrado from "../Imagenes/cerrado.png";

export default class Ruta extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        Contra:'',
        Comprobar:'',
    };
  }
 
  render() {

    const DatosCorrectos = ()=>{
        
        if(this.state.Comprobar != '' &&
           this.state.Contraseña != '' ){
            if(this.state.Comprobar === this.state.Contra){
                return true;
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
    
    const Press = ()=>{
        if(DatosCorrectos()){
            const Comprobar = (request)=>{
                if(request === '0' || request === undefined){
                    Alert.alert('Lo sentimos', 'La contraseña no fue actualizada', [
                        
                        {text: 'OK', onPress: () => this.setState({NombreU:''})},
                      ]);
                }else{
                    Fun.Cambiarpantalla(this,'Login');
                }
            }
    
            Fun.Request('https://lunesapp.000webhostapp.com/PHP/ModificarContra.php?'+
            'Id='+this.props.route.params.Id + "&"+
            "Contraseña="+this.state.Contra
            ,
            Comprobar);
        }
    }
    
    
    return (
        <SafeAreaView
        style = {styles.Pantalla}
        >
           <View style={styles.Contenido}>
                
                <Text style={styles.NombreU}>
                    Modificar Contraseña
                </Text>

                <Fun.Contraseña
                Imagen1={cerrado}
                Imagen2={abierto}
                marginBottom={'3%'}
                onChangeText={Contra => this.setState({Contra})}
                placeholderTextColor={'#979797'}
                placeholder={"Nueva Contraseña"}                
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

                
                <TouchableOpacity
                style={styles.Boton}
                onPress={Press}
                >
                    <Text
                    style={styles.Boton.Text}
                    >
                        Modificar
                    </Text>
                </TouchableOpacity> 
          
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
  var Ancho = (Dimensions.get("window").width * 0.50);
  var alto = (Contenido * 0.30);

  const styles = StyleSheet.create({ 
  
      Pantalla:{
          
          height:'100%',
          backgroundColor: '#D7D4D4',
          
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
      Contenido:{
        height:Contenido,
        justifyContent:'center'
      },
      Boton:{
        backgroundColor: '#050271',
        borderRadius: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '10%',
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
    Links:{
        flexDirection:'row',
        width:(alto + 60),
        marginLeft:'auto',
        marginRight: 'auto',
        View:{
            width: ((alto + 60)/2),
            
        }
    },
    Link:{
        textAlign: 'right',
        color: '#050271',
        fondSize: 20,
        
       
    },
    LinkL:{
        textAlign: 'left',
        color: '#050271',
        fondSize: 20,
        
       
    },
    NombreU:{
            color: '#FF6909',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft:'auto',
            marginRight: 'auto',
            marginBottom: 20,
            marginTop: 20,
    },
    SupTitulos:{
            color: '#050271',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft:'auto',
            marginRight: 'auto',
            marginBottom: 10,
    },
    Datos:{
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft:'auto',
        marginRight: 'auto',
        marginBottom: 10,
    }
    
      
  })