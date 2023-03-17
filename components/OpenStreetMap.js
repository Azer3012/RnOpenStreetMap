import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {
  PROVIDER_OPENSTREETMAP,
  Marker,
  Heatmap,
  Polyline,
  Circle,
  Polygon,
} from 'react-native-maps';
import {locations} from '../values/data';
import CustomMarker from './CustomMarker';
import Modal from 'react-native-modal';

const OpenStreetMap = () => {
  const [text, setText] = useState();
  const [places, setPlaces] = useState([]);
  const mapRef = React.useRef(null);

  const [coordinate, setCordinate] = useState({
    latitude: 40.434416,
    longitude: 49.911645,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const fetchPlaces = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${text}&countrycodes=az&city=Baku&format=json`,
    );
    const data = await response.json();
    setPlaces(data);
    console.log(data);
  };

  const handleChange = region => {
    console.log(region);
    setCordinate({
      ...coordinate,
      latitude: region.latitude,
      longitude: region.longitude,
    
    });
   
    mapRef.current.animateToRegion({...coordinate,zoom: 200,}, 500);
    setPlaces([])
    setText('')
  };
  console.log(coordinate);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput onChangeText={setText} style={styles.input} />
        <TouchableOpacity onPress={fetchPlaces} style={styles.btn}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchList}>
        <FlatList
          data={places}
          renderItem={({item}) => (
            <Text
              onPress={() =>
                handleChange({latitude: item.lat, longitude: item.lon})
              }>
              {item.display_name}
            </Text>
          )}
        />
      </View>

      <MapView
      ref={mapRef}
        provider={PROVIDER_OPENSTREETMAP}
        style={{flex: 1}}
        initialRegion={coordinate}
        // onRegionChange={handleChange}
        >
        <Polygon coordinates={locations} />

        {locations.map(marker => (
          <Marker
            key={marker.latitude}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}>
            <CustomMarker item={marker} />
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
  inputContainer: {
    position: 'absolute',
    top: 100,
    zIndex: 2,
    width: '80%',
    marginHorizontal: '10%',
    flexDirection: 'row',
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 15,
    flex: 1,
    borderColor: '#0A092D',
  },
  btn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#0A092D',
  },
  btnText: {
    color: 'white',
  },
  searchList: {
    backgroundColor: 'white',
    width: '80%',
    marginHorizontal: '10%',
    marginTop: 140,
  },
});
