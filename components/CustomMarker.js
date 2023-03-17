import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomMarker = ({item}) => {
  return (
    <>
    <Text>{item.title}</Text>
    <View style={styles.roundMarker}>
        
      <Image style={styles.roundImage} source={{uri:item.markerImage}}/>
    </View>
    </>
  )
}

export default CustomMarker

const styles = StyleSheet.create({
    roundMarker:{
        width:30,
        height:30,
        backgroundColor:'white',
        borderRadius:25
    },
    roundImage:{
        width:30,
        height:30,
        borderRadius:25,
        resizeMode:'contain'

    }
})