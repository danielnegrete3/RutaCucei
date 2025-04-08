import React, {Component,useEffect} from 'react';
import { View, Text , StyleSheet, SafeAreaView, Image, ScrollView,Dimensions, TouchableOpacity,TextInput} from 'react-native';
//import * as Location from 'expo-location';

//Mis imports
import * as Fun from "../Funciones";

//Fotos
import subir from "../Imagenes/modificarI.png";

export default class Ruta extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Marca:'',
        Color:'',
        Modelo:'',
        Imagen:'',
        Placa:'',
        Nueva:false,
        Marcas:[],
        Modelos:[],
    };
  }

  componentDidMount() {
    const Datos = (request)=>{
            
        if(request === '0' || request === undefined){
            
        }else{
            
            var Datos = JSON.parse(request);
            this.setState({
                Marca:Datos[0].Marca,
                Color:Datos[0].Color,
                Modelo:Datos[0].Modelo,
                Imagen:{uri:Datos[0].Imagen},
                Placa:Datos[0].Placas,
            })

            const Marcas = (request)=>{
            
                if(request === '0' || request === undefined){
                    
                }else{
                    var Datos = JSON.parse(request);
                    this.setState({Marcas: Datos})
                }  
        
            }

            const Modelo = (request)=>{
            
                if(request === '0' || request === undefined){
                    this.setState({Modelos: []});
                }else{
                    console.log("si esta cambiando");
                    var Datos = JSON.parse(request);
                    this.setState({Modelos: Datos});
                }  
        
            }

           this.setState({Marca: Datos[0].Marca});
           Fun.Request('https://lunesapp.000webhostapp.com/PHP/Modelo.php?'+
           "Marca="+Datos[0].Marca, 
           Modelo);
        
           Fun.Request('https://lunesapp.000webhostapp.com/PHP/Marcas.php', 
            Marcas);
        }  

    }

    Fun.Request('https://lunesapp.000webhostapp.com/PHP/SelectConductor.php?'+
    "Id="+this.props.route.params.Conductor, 
    Datos);


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

    const DatosCorrectos = ()=>{
        
        if(this.state.Marca != '' &&
           this.state.Color != '' &&
           this.state.Modelo != '' &&
           this.state.Placa != '' &&
           this.state.Imagen != ''){
            return true;         
           }else{
            Alert.alert('Falta informacion', 'Llena todos los campos', [ 
                    
                {text: 'OK', onPress: () => console.log('ok')},
              ]);
            return false;
           }
    }

    const GuardarURL = (respuesta)=>{

        const Comprobar = (request)=>{

            if(request === '0' || request === undefined){
                Alert.alert('Lo sentimos', 'No se ha Modificado el Conductor, vuelve a intentar', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
            }else{
                
                Fun.Cambiarpantalla(this,'Principal', this.props.route.params);
            }  
    
        }
        console.log('https://lunesapp.000webhostapp.com/PHP/ModificarConductor.php?'+
        'Id='+this.props.route.params.Conductor+'&'+
        'Color='+this.state.Color+'&'+
        'Modelo='+this.state.Modelo+'&'+
        'Marca='+this.state.Marca+'&'+
        'Imagen=https://lunesapp.000webhostapp.com/PHP/Imagenes/'+respuesta+'&'+
        'Placas='+this.state.Placa);
        // http y funcion para comprobar y subir archivos
        Fun.Request('https://lunesapp.000webhostapp.com/PHP/ModificarConductor.php?'+
        'Id='+this.props.route.params.Conductor+'&'+
        'Color='+this.state.Color+'&'+
        'Modelo='+this.state.Modelo+'&'+
        'Marca='+this.state.Marca+'&'+
        'Imagen=https://lunesapp.000webhostapp.com/PHP/Imagenes/'+respuesta+'&'+
        'Placas='+this.state.Placa
        , 
        Comprobar);
        
    }



    const Press = ()=>{
        if(DatosCorrectos()){
            //subir imagen al servidor y mandar datos
             Fun.subirImagenServidor(this.state.Imagen.uri,GuardarURL); 
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
           <View 
           style = {styles.Contenido}>
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

                <Fun.InputDesplegable                
                placeholder= "Marca"
                onChangeText={Marca => Cambiar(Marca)}
                arreglo={this.state.Marcas}
                Visibility={true}
                defaultValue={this.state.Marca}
                />

                <Fun.InputDesplegable                
                placeholder= "Modelo"
                onChangeText={Modelo => this.setState({Modelo})}
                arreglo={this.state.Modelos}
                Visibility={true}
                defaultValue={this.state.Modelo}
                />

                <TextInput
                style = {styles.Input}
                placeholderTextColor ={'#979797'}
                placeholder= "Placa"
                onChangeText={Placa => this.setState({Placa})}
                defaultValue={this.state.Placa}
                ></TextInput>

                <TextInput
                style = {styles.Input}
                placeholderTextColor ={'#979797'}
                placeholder= "Color"
                onChangeText={Color => this.setState({Color})}
                defaultValue={this.state.Color}
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

  const styles = StyleSheet.create({ 
  
      Pantalla:{
          
          height:'100%',
          backgroundColor: '#D7D4D4',
          
      },
      Contenido:{
        height:Contenido,
      },
      
      Inferior:{
          
          
          height:50,
          
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
    },
    Link:{
        textAlign: 'right',
        color: '#050271',
        fondSize: 20,
        marginRight: '10%',
       
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
        color: '#000000',
    },
    touch:{
        width: width,
        height: (Contenido * 0.40),
        marginBottom: '10%',
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
      
  })