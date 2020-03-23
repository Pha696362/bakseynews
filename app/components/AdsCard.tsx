// import * as React from "react";
// import { View, StyleSheet, Text,  } from "react-native";
// import FastImage from 'react-native-fast-image';
// import modules from "../modules";
// import AutoHeightImage from "react-native-auto-height-image";
// interface Props {
//   fileurl: any;
  

// }
// export default ({ fileurl }: Props) => {
//   return (
//     <View style={styles.AdsBox}>
//       {!fileurl ? (
//         <FastImage
//           // resizeMode={FastImage.resizeMode.stretch}
//           style={styles.Ads}
//           source={require("../images/1.png")}
//         />
//       ) : (
//         <AutoHeightImage
//           width={modules.VIEW_PORT_WIDTH}
//           // style={styles.Ads}
//           source={{uri:fileurl}}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
  
//   AdsBox: {
//     marginVertical:10
//   },
//   Ads:{
//     height: 120,
//     width: modules.VIEW_PORT_WIDTH,
      

      
//   },
// });





import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import modules from "../modules";
interface Props {
  fileurl: any;
  onClickAds:any;
}
export default ({ fileurl,onClickAds }: Props) => {
  return (
    <TouchableOpacity onPress={onClickAds} style={styles.AdsBox}>
      {!fileurl ? (
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.Ads}
          source={require("../images/1.png")}
        />
      ) : (
        <FastImage 
        // resizeMode={FastImage.resizeMode.contain}
        style={styles.Ads} source={{ uri: fileurl }} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Ads: {
    width: modules.VIEW_PORT_WIDTH - (modules.BODY_HORIZONTAL_12*2),
    height: 70,
    borderRadius: modules.BODY_HORIZONTAL_12 / 2
  },
  AdsBox: {
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    overflow: "hidden",
    alignItems:'center',
    marginTop:10
  }
});