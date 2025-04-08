import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service'; 
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';



export default function App() {

  const [origin, setOrigin] = React.useState({
    latitude: 20.659841286238446,
    longitude:  -103.27604065273911,
  });

  const [destination, setDestination] = React.useState({
    latitude: 20.6567483,
    longitude: -103.3253103,
  });
  const [parada,setParada] = React.useState({ 
    latitude: 20.656460072076015,
    longitude: -103.30258006663564,
  });
  const [parada2,setParada2] = React.useState({
    latitude: 20.671956939109975,
    longitude: -103.32935947010846,
  });

async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    console.log(current);
    ubicacionActual(current);
  }
  const ubicacionActual = (direccion) =>{
    this.setState({origen: direccion});
  }


  React.useEffect(() => {
    
    getLocationPermission();
   
  }, [])


  


/*  console.log("holi")
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }
*/
const regresar =()=>{
  this.props.navigation.navigate('Login');
}

  return (

    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      >
        <Marker 
          draggable
          coordinate={origin}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker 
          draggable
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        <Marker 
          draggable
          coordinate={parada}
          onDragEnd={(direction) => setParada(direction.nativeEvent.coordinate)}
        />
        <Marker 
          draggable
          coordinate={parada2}
          onDragEnd={(direction) => setParada2(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections
          origin={origin}
          waypoints={[origin,parada]&&[parada,parada2]}
          destination={destination}
          apikey={''}
          strokeColor="black"
          strokeWidth={6}
        />
        {/* <Polyline
          coordinates={[ origin, destination ]}
          strokeColor="pink"
          strokeWidth={8}
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '90%',
    height: '80%'
  },
  BotonContinuar:{
    width: 250,
    height:70,
    alignSelf:'center',
    marginTop:60,
    padding: 10,
    backgroundColor: 'black',
    borderRadius:10,
  },
  textoBotonContinuar:{
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
  },
});