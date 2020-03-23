
import * as React from "react";
import { View, StyleSheet, Text, TextInput, ScrollView, StatusBar } from "react-native";
import modules from "../../modules";

import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import _styles from "../../_styles";

import { Battambang, BattambangBold } from "../../../function/customFont";
import FastImage from "react-native-fast-image";
import CardSearch from "../../components/CardSearch";
import HeaderMain from "../../components/HeaderMain";


interface Props {
  searchText: string;
  onTextSearch: (text: string) => void;
  searchData: any;
  onPress: (item: any) => void

}

interface State { }

export default ({ searchText, onTextSearch, searchData, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <StatusBar barStyle='light-content' backgroundColor="#1D3C78" />


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
                  source={require("../../images/save.png")}
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

  IMG: {
    alignItems: "center",
    marginTop: 120
  },
  FontTitle: {
    fontSize: modules.FONT_H5,
    ...Battambang,
    color: modules.SUB_TEXT
  },
  title: {
    marginTop: modules.PADDING,
    paddingHorizontal: modules.BODY_HORIZONTAL_12
  },
  container: {
    flex: 1,
    backgroundColor:modules.COLOR_MAIN
    
  
  },
  content: {
    flex: 1,
    backgroundColor: modules.WHITE,
    paddingHorizontal: modules.BODY_HORIZONTAL_18,
    paddingTop: modules.PADDING
  },
  textinput: {
    padding: 0,
    margin: 0,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    backgroundColor: modules.fds_blue_05,
    height: 50,
    borderRadius: modules.RADIUS,
    fontSize: modules.FONT_H5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1
  }
});

