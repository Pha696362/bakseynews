import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import modules from "../modules";
import Eye from "react-native-vector-icons/SimpleLineIcons";
import ICon from "react-native-vector-icons/Feather";
import _styles from "../_styles";
import { Battambang, BattambangBold } from "../../function/customFont";
import { _formatDateTime, _formatShortDate } from "../services/datetime.service";
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
      <FastImage style={styles.Image} source={{ uri: data.fileurl }} />
      <View style={styles.text}>

        <Text numberOfLines={3} style={styles.TitleFont}>
          {data.name}
        </Text>
      </View>

      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <Text>
            ថ្ងៃទី{" "}
            {data.create_date
              ? _formatShortDate(data.create_date.seconds)
              : ""}
          </Text>


          <Eye style={[{ color: modules.SUB_TEXT, fontSize: 16, marginHorizontal: 4, marginLeft: 8 }]} name='eye' />
          <Text style={styles.fontText}>{data.top_view}</Text>
        </View>

        <TouchableOpacity onPress={onSave}>
          <More style={{ fontSize: 20 }} name="dots-three-horizontal" />
        </TouchableOpacity>
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
    fontSize: modules.FONT_H6,
    ...BattambangBold,
    color: '#000'
  },
  CategoryFont: {
    fontSize: modules.FONT_H6,
    ...Battambang,
    color: modules.SUB_TEXT,
    marginVertical: modules.SPACE
  },
  CardContainer: {

    width: modules.VIEW_PORT_WIDTH,
    backgroundColor: modules.WHITE,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    marginVertical: 5

  },
  Image: {
    width: "100%",
    height: modules.VIEW_PORT_HEIGHT / 4,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: modules.SPACE
  },
  text: {
    paddingVertical: modules.SPACE * 2,
    backgroundColor: modules.WHITE
  },
  fontText: {
    fontSize: 14,
    ...Battambang,
    color: modules.SUB_TEXT
  }
});
