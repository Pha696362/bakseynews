import * as React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import modules from "../../modules";
import { SafeAreaView } from "react-navigation";

import { BattambangBold } from "../../../function/customFont";
import HeaderDetail from "../../components/HeaderDetail";
import HeaderMain from "../../components/HeaderMain";


interface Props {
  ContactSelect: any

}

interface State { }

export default ({ ContactSelect }: Props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView/>
      <StatusBar barStyle={'dark-content'}/>

    
      <HeaderMain img={require("../../images/logo.png")}  title="Infor" />


      <View style={styles.content}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.info}>
            © រក្សា​សិទ្ធិ​គ្រប់​យ៉ាង​ដោយ​:
           </Text>
          <View style={styles.flextext}>

            {ContactSelect.length>0 ? <Text style={styles.text}>
              {ContactSelect[0].name}
            </Text> : null}

          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.info}>
            អាសយដ្ឋាន:
           </Text>
          <View style={styles.flextext}>

            {ContactSelect.length>0  ? <Text style={styles.text}>
              {ContactSelect[0].address}
            </Text> : null}

          </View>

        </View >


        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.info, styles.paddingLeft]}>
            អ៊ីមែល:
           </Text>
          <View style={styles.flextext}>
            {ContactSelect.length>0  ? <Text style={styles.text}>
              {ContactSelect[0].email}
            </Text> : null}
          </View>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.info, styles.paddingLeft]}>

            ទូរស័ព្ទ:
           </Text>
          <View style={styles.flextext}>
            {ContactSelect.length>0  ? <Text style={styles.text}>
              {ContactSelect[0].phonenumber}
            </Text> : null}
          </View>
        </View>

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:modules.COLOR_MAIN

  },
  content: {
    flex: 1,
    backgroundColor:modules.BACKGROUND_PRIMARY
  },
  info: {
    paddingHorizontal: 12,
    fontSize: modules.FONT_H6, ...BattambangBold,
    marginTop: 20,


  },
  text1: {
    // paddingHorizontal: ,
    fontSize: modules.FONT_H3, ...BattambangBold,
    marginTop: 20, margin: 10


  },
  text: {
    // paddingHorizontal: ,
    fontSize: modules.FONT_H6, ...BattambangBold,
    marginTop: 22, margin: 10


  },
  address: {
    paddingHorizontal: 14,
    fontSize: 20,
    ...BattambangBold

  },
  addressText: {
    padding: 10,
    fontSize: 18,
    ...BattambangBold

  },
  flextext: {
    flex: 1,

  },
  paddingLeft: {
    paddingLeft: 45
  }


});
