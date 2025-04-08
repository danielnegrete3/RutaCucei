import React, {Component,useEffect} from 'react';
import { View, Text , StyleSheet, SafeAreaView, Image, ScrollView,Dimensions,TextInput,TouchableOpacity,Alert} from 'react-native';
//import * as Location from 'expo-location';

//Mis imports
import * as Fun from "../Funciones";

//Fotos
import abierto from "../Imagenes/abierto.png";
import cerrado from "../Imagenes/cerrado.png";
import subir from "../Imagenes/modificarI.png";

export default class Ruta extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Nombre_U:'',
        Nombres:'',
        Apellidos: '',
        Telefono: '',
        Imagen:'',
        Nueva:false,
        Datos:[]
    };
  }

  componentDidMount() {
    const Comprobar = (request)=>{
            
        if(request === '0' || request === undefined){
            
        }else{
            
            var Datos = JSON.parse(request);
            this.setState({
                Nombre_U:Datos[0].Nombre_U,
                Nombres:Datos[0].Nombres,
                Apellidos:Datos[0].Apellidos,
                Telefono:Datos[0].Telefono,
                Imagen:{uri:Datos[0].Imagen},
                Datos:Datos[0]
            })
        }  

    }
   Fun.Request('https://lunesapp.000webhostapp.com/PHP/SelectUsuario.php?'+
        "Id="+this.props.route.params.Id, 
        Comprobar);
  }
 
  render() {

    const DatosCorrectos = ()=>{
        
        if(this.state.Nombre_U != '' &&
           this.state.Nombres != '' &&
           this.state.Apellidos != '' &&
           this.state.Telefono != ''){
            return true;            
           }else{
            Alert.alert('Falta informacion', 'Borraste informacion de algun campo', [ 
                    
                {text: 'OK', onPress: () => console.log('ok')},
              ]);
            return false;
           }
    }
    
    const Press = ()=>{

        const Comprobar = (request)=>{
            if(request === '0' || request === undefined){
                Alert.alert('Lo sentimos', 'No se han modificado los datos', [
                    
                    {text: 'OK', onPress: () => this.setState({NombreU:''})},
                  ]);
            }else{
                Fun.Cambiarpantalla(this,'Login');
            }
        }

        const CambioDeImagen = (Respuesta)=>{
            console.log(Respuesta);
            // http y funcion para comprobar y subir archivos
            Fun.Request('https://lunesapp.000webhostapp.com/PHP/ModificarUsuario.php?'+
            'Id=' + this.props.route.params.Id + '&'+
            'Nombres='+this.state.Nombres+'&'+
            'Apellidos='+this.state.Apellidos+'&'+
            'Nombre_U='+this.state.Nombre_U+'&'+
            'Telefono='+this.state.Telefono+'&'+
            'Imagen=https://lunesapp.000webhostapp.com/PHP/Imagenes/'+Respuesta
            , 
            Comprobar);
        }

        if(DatosCorrectos()){
            if (!this.state.Nueva){
                
                // http y funcion para comprobar y subir archivos
                Fun.Request('https://lunesapp.000webhostapp.com/PHP/ModificarUsuario.php?'+
                'Id=' + this.props.route.params.Id + '&'+
                'Nombres='+this.state.Nombres+'&'+
                'Apellidos='+this.state.Apellidos+'&'+
                'Nombre_U='+this.state.Nombre_U+'&'+
                'Telefono='+this.state.Telefono+'&'+
                'Imagen='+this.state.Datos.Imagen
                , 
                Comprobar);
            }else{
                //subir imagen al servidor
                Fun.subirImagenServidor(this.state.Imagen.uri,CambioDeImagen);
            }
        }
    }

    const PresImage =()=>{
        const Cargar = (uri) =>
        {        
            //console.log(uri.assets[0]);
            this.setState({Imagen:uri.assets[0]}); 
            if(this.state.Imagen !== this.state.Datos.Imagen){
                this.setState({Nueva:true}); 
            } 
        }
        
        Fun.subirImagen(Cargar);
    }

    return (
        <SafeAreaView
        style = {styles.Pantalla}
        >
           <ScrollView style={styles.Contenido}>
                <View
                    style={styles.touch}
                >
                    <TouchableOpacity 
                    style={styles.touch.press}
                    onPress={PresImage}
                    >
                        
                        <Image 
                        style = {styles.Imagen}
                        source={this.state.Imagen}
                        />
                        {
                            !this.state.Nueva && (
                                <Image 
                                style = {styles.Imagen.com} 
                                source={subir}
                                />
                            )
                        }
                        
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.NombreU}>
                    Hola {this.state.Datos.Nombre_U}
                </Text>

                <TextInput
                style = {styles.Input}
                placeholderTextColor ={'#979797'}
                placeholder= "Nombres"
                onChangeText={Nombres => this.setState({Nombres})}
                defaultValue={this.state.Nombres}
                ></TextInput>

                <TextInput
                style = {styles.Input}
                placeholderTextColor ={'#979797'}
                placeholder= "Apellidos"
                onChangeText={Apellidos => this.setState({Apellidos})}
                defaultValue={this.state.Apellidos}
                ></TextInput>

                <TextInput
                style = {styles.Input}
                placeholderTextColor ={'#979797'}
                placeholder= "Nombre de Usuario"
                onChangeText={Nombre_U => this.setState({Nombre_U})}
                defaultValue={this.state.Nombre_U}
                ></TextInput>

                <TextInput
                style = {styles.Input}
                placeholderTextColor ={'#979797'}
                placeholder= "Telefono"
                onChangeText={Telefono => this.setState({Telefono})}
                defaultValue={this.state.Telefono}
                ></TextInput>
                
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
  
            </ScrollView>
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
        
        com:{
          position:'absolute',
          left: ((Ancho/2)-50),
          top: (Contenido * 0.12),
          resizeMode: 'stretch',
          width: (Dimensions.get("window").width * 0.25),
          height: (Contenido * 0.15),
        },
        
      },
      touch:{
        width: width,
        height: (Contenido * 0.40),
        press:{
            width:Ancho,
            maxWidth: Ancho,
            height: alto,
            marginLeft:'auto',
            marginRight: 'auto',
            borderRadius: 100,
            marginTop:30,
            marginBottom:30,
            resizeMode: 'stretch',
        }
      },
      Contenido:{
        height:Contenido
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
      
  })