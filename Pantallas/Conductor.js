import React, {Component,useEffect} from 'react';
import { View, Text , StyleSheet, SafeAreaView, Image, ScrollView,Dimensions, TouchableOpacity} from 'react-native';
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
   Fun.Request('https://lunesapp.000webhostapp.com/PHP/SelectConductor.php?'+
        "Id="+this.props.route.params.Conductor, 
        Comprobar);
  }
 
  render() {
    const Press = ()=>{Fun.Cambiarpantalla(this,'ModificarC',this.props.route.params);}     
    
    return (
        <SafeAreaView
        style = {styles.Pantalla}
        >
           <ScrollView style={styles.Contenido}>
                <Image 
                style = {styles.Imagen}
                source={{uri:this.state.Datos.Imagen,}}
                />
                <Text style={styles.NombreU}>
                    hola {this.props.route.params.Nombre_U}
                </Text>
                <Text style={styles.SupTitulos}>
                    Marca
                </Text>
                <Text style={styles.Datos}>
                    {this.state.Datos.Marca}
                </Text>
                <Text style={styles.SupTitulos}>
                    Modelo
                </Text>
                <Text style={styles.Datos}>
                    {this.state.Datos.Modelo}
                </Text>
                <Text style={styles.SupTitulos}>
                    Placa
                </Text>
                <Text style={styles.Datos}>
                    {this.state.Datos.Placas}
                </Text>
                <Text style={styles.SupTitulos}>
                    Color
                </Text>
                <Text style={styles.Datos}>
                    {this.state.Datos.Color}
                </Text>
                
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