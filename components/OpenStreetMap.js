import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_OPENSTREETMAP, Marker, Heatmap, Polyline, Circle, Polygon} from 'react-native-maps';
import {locations} from '../values/data';
import CustomMarker from './CustomMarker';

const OpenStreetMap = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
      <MapView
        provider={PROVIDER_OPENSTREETMAP}
        style={{flex: 1}}
        initialRegion={{
          latitude: 40.434416,
          longitude: 49.911645,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          
          <Polygon coordinates={locations} />
          
        {locations.map(marker => (
          <Marker
            key={marker.latitude}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.title}
           >
            <CustomMarker item={marker}/>
            </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default OpenStreetMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  input: {
    position: 'absolute',
    top: 100,
    borderWidth: 1,
    zIndex: 2,
    width: '80%',
    backgroundColor: 'white',
    marginHorizontal: '10%',
    height: 40,
    paddingLeft: 15,
  },
});
