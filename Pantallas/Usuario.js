import React, {Component,useEffect} from 'react';
import { View, Text , StyleSheet, SafeAreaView, Image, ScrollView,Dimensions,TouchableOpacity, Alert} from 'react-native';
//import * as Location from 'expo-location';

//Mis imports
import * as Fun from "../Funciones";

export default class Ruta extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Datos:'',
    };
  }

  componentDidMount() {
    const Comprobar = (request)=>{
            
        if(request === '0' || request === undefined){
            
        }else{
            
            var Datos = JSON.parse(request);
            this.setState({Datos: Datos[0]})
        }  

    }
   Fun.Request('https://lunesapp.000webhostapp.com/PHP/SelectUsuario.php?'+
        "Id="+this.props.route.params.Id, 
        Comprobar);
  }
 
  render() {
    const Conductor = ()=>{
        
        if(this.props.route.params.Conductor === '0'){
            Alert.alert('No eres Conductor aun', '¿Quieres ser conductor?', [ 
                    
                {text: 'Sí', onPress: () => Fun.Cambiarpantalla(this,'NuevoConductor',
                {Nombre_U:this.state.Datos.Nombre_U})},
                {text: 'No', onPress: () => console.log('No Quiso')}
              ]);
        }else{
            Fun.Cambiarpantalla(this,'Conductor',this.props.route.params);
        }
    }

    const Contra = ()=>{
        Fun.Cambiarpantalla(this,'ModificarContra',this.props.route.params);
    }

    const Press = () =>{
        Fun.Cambiarpantalla(this,'ModificarU',this.props.route.params);
    }
    
    
    return (
        <SafeAreaView
        style = {styles.Pantalla}
        >
           <View style={styles.Contenido}>
                <Image 
                style = {styles.Imagen}
                source={{uri:this.state.Datos.Imagen,}}
                />
                <Text style={styles.NombreU}>
                    Hola {this.state.Datos.Nombre_U}
                </Text>
                <Text style={styles.SupTitulos}>
                    Nombre
                </Text>
                <Text style={styles.Datos}>
                    {this.state.Datos.Nombres+' '+this.state.Datos.Apellidos}
                </Text>
                <Text style={styles.SupTitulos}>
                    Telefono
                </Text>
                <Text style={styles.Datos}>
                    {this.state.Datos.Telefono}
                </Text>
                <Text style={styles.SupTitulos}>
                    Codigo
                </Text>
                <Text style={styles.Datos}>
                    {this.state.Datos.codigo}
                </Text>

                <View style={styles.Links}>
                    <View style={styles.Links.View}>
                        <Text
                        style={styles.LinkL}
                        onPress={Conductor}
                        >
                            Datos
                        </Text>
                        <Text
                        style={styles.LinkL}
                        onPress={Conductor}
                        >
                            Conductor
                        </Text>
                    </View>
                    <View style={styles.Links.View}>
                        <Text
                        style={styles.Link}
                        onPress={Contra}
                        >
                            Cambiar
                        </Text>
                        <Text
                        style={styles.Link}
                        onPress={Contra}
                        >
                            Contraseña
                        </Text>
                    </View>
                    
                </View>
                
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
  
            </View>
            {/*final de medio */}
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
    }
    
      
  })