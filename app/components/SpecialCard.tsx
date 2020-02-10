import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import modules from "../modules";
import Eye from "react-native-vector-icons/SimpleLineIcons";
import ICon from "react-native-vector-icons/Feather";
import _styles from "../_styles";
import { Battambang, BattambangBold } from "../../function/customFont";
import { _formatDateTime } from "../services/datetime.service";
import More from "react-native-vector-icons/Entypo";

interface Props {
    onPress: () => void
    onSave?: any
data:any
}

interface State {}

export default ({onPress,data,onSave }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.CardContainer}>
      <FastImage style={styles.Image} source={{ uri: data.fileurl}} />
       <View style={styles.text}>

        <Text numberOfLines={1} style={styles.TitleFont}>
          {data.name}
        </Text>
      </View>
     
  
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  Icon: {
    fontSize: 24,
    paddingLeft: 12
  },
  Info: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: modules.SPACE5,
    justifyContent: "space-between"
  },
  TitleFont: {
    fontSize:12,
    ...BattambangBold,
    color:'#000'
  },
  CategoryFont: {
    fontSize: modules.FONT_H6,
    ...Battambang,
    color: modules.SUB_TEXT,
    marginVertical: modules.SPACE
  },
  CardContainer: {
    width: modules.VIEW_PORT_WIDTH/2-24,
    // backgroundColor: modules.BACKGROUND_PRIMARY,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    marginTop: modules.PADDING/2,  
  },
  Image: {
    width: "100%",
    height: modules.VIEW_PORT_HEIGHT /8,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: modules.SPACE
  },
  text: {
    paddingVertical: modules.SPACE * 2,
    backgroundColor: modules.BACKGROUND_PRIMARY,
    
    
  },
  fontText: {
    fontSize:14,
    ...Battambang,
    color: modules.SUB_TEXT
  }
});
