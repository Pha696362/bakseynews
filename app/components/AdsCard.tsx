import * as React from "react";
import { View, StyleSheet, Text,  } from "react-native";
import FastImage from 'react-native-fast-image';
import modules from "../modules";
import AutoHeightImage from "react-native-auto-height-image";
interface Props {
  fileurl: any;
  

}
export default ({ fileurl }: Props) => {
  return (
    <View style={styles.AdsBox}>
      {!fileurl ? (
        <FastImage
          // resizeMode={FastImage.resizeMode.stretch}
          style={styles.Ads}
          source={require("../images/1.png")}
        />
      ) : (
        <AutoHeightImage
          width={modules.VIEW_PORT_WIDTH}
          // style={styles.Ads}
          source={{uri:fileurl}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
  AdsBox: {
    marginVertical:10
  },
  Ads:{
    height: 120,
    width: modules.VIEW_PORT_WIDTH,
      

      
  },
});
