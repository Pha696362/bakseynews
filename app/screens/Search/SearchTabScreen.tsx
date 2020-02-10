import * as React from "react";
import { View, StyleSheet, Text, TextInput ,ScrollView} from "react-native";
import modules from "../../modules";
import HeaderMain from "../../components/HeaderMain";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import _styles from "../../_styles";
import { fontGSans, BattambangBold } from "../../../function/customFont";
import CardSearch from "../../components/CardSearch";
import FastImage from "react-native-fast-image";

interface Props {
  searchText: string;
  onTextSearch: (text: string) => void;
  searchData: any;
  onPress: (item: any) => void


}

interface State {}

export default ({searchText, onTextSearch, searchData, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderMain title="Search" />
     

      <View style={styles.content}>

        <TextInput
          autoCapitalize="none"
          autoFocus={true}
          style={styles.textinput}
          placeholder="Search you content here...!"
          value={searchText}
          onChangeText={text => onTextSearch(text)}
        />

      
        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {searchData.length > 0 ? (
            searchData.map((i: any, index: any) => {
              return <CardSearch onDetail={() => onPress(i)} key={index} img={i.fileurl} title={i.name} />;
            })
          ) : (
              <View style={styles.IMG}>
                <FastImage
                  style={{ height: 200, width: 200 }}
                  source={require("../../images/search.jpg")}
                />
                <Text style={{ ...BattambangBold }}>មិនមានទិន្នន័យ</Text>
              </View>
            )}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  FontTitle: {
    fontSize: modules.FONT_H5,
    ...fontGSans,
    color:modules.SUB_TEXT
  },
  title: {
    marginTop: modules.PADDING
  },
  container: {
    flex: 1,
    backgroundColor: modules.COLOR_MAIN
  },
  content: {
    flex: 1,
    backgroundColor:'#fff',
    paddingHorizontal: modules.BODY_HORIZONTAL_18,
    paddingTop: modules.PADDING
  },
  textinput: {
    padding: 0,
    margin: 0,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: modules.RADIUS,
    fontSize: modules.FONT_H5
  },
  IMG: {
    alignItems: "center",
    marginTop: 120
  },
});
