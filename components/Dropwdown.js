import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { locations } from '../values/data';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const Dropwdown = ({handleChange}) => {

    const getFormattedArray=()=>{
        let arr=[]
        locations.map(item=>{
            item={...item,label:item.title,value:item.title}
            
            arr.push(item)
        })

       

        return arr
    }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(getFormattedArray());

  const [selectedItem,setSelectedItems]=useState(null)

  const onChangeValue=(value)=>{
    console.log(value);
    let location=null
    locations.forEach(item=>{
        if(item.title===value){
            location=item
        }
    })

   
    handleChange(location)

  }

  
  return (
    <View>
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={onChangeValue}
    />
    </View>
  );
};

export default Dropwdown;

const styles = StyleSheet.create({});
