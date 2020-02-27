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
  data: any
}

interface State { }

export default ({ onPress, data, onSave }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.CardContainer}>
      <View style={styles.groupImg}>
        <FastImage style={styles.Image} source={{ uri: data.fileurl }} />
      </View>
      <Text numberOfLines={1} style={styles.TitleFont}>{data.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({

  CardContainer: {
    marginTop: modules.BIG_SPACE + 2,
  },
  groupImg: {

    height: modules.VIEW_PORT_HEIGHT / 8,
    paddingHorizontal: modules.SPACE,
    marginTop: modules.PADDING / 2,
  },
  Image: {
    width: "100%",
    height: '100%',
    borderRadius: modules.BIG_SPACE,
  },
  TitleFont: {
    width: modules.VIEW_PORT_WIDTH / 3.5,
    paddingHorizontal: modules.SPACE,
    fontSize:12
  },
});
