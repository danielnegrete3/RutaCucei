import * as React from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline,Overlay } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
//import { GOOGLE_MAPS_KEY } from '@env';


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
  React.useEffect(() => {
    getLocationPermission();
  }, [])

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
    setOrigin(current);
  }

  getLocationPermission();

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
    height: '90%'
  },
  View:{
    width: '10%',
    height: '10%',
    backgroundColor: '#245678'
  }
});