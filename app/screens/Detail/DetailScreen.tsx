import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity ,StatusBar} from "react-native";
import Modal from 'react-native-modal';
import modules from "../../modules";
import { SafeAreaView, ScrollView } from "react-navigation";
import FastImage from "react-native-fast-image";
// import More from 'react-native-vector-icons/Entypo';
import More from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-vector-icons/Feather'

import HeaderDetail from "../../components/HeaderDetail";
import DetailWebView from "../../components/DetailWebView";
import { Battambang, BattambangBold } from "../../../function/customFont";
import { _formatDateTime } from "../../services/datetime.service";
import Icons from 'react-native-vector-icons/Ionicons'
// import Icon from "react-native-vector-icons/Entypo";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useState } from "react";
interface Props {
  onClickBack: () => void;
  selectedContent: any;
  onSave: any
  onUnSave: any
  saveData: boolean;
  onShare: any
  onPress?: (item: any) => void
}

interface State { }
export default ({ onClickBack, selectedContent, saveData, onUnSave, onSave, onPress, onShare }: Props) => {
  const [visable, setVisable] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={styles.headerDetail}>
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={onClickBack}>
          <Icons style={styles.arrow} name='ios-arrow-back' />
          <Text style={{fontSize:14,...BattambangBold,color:'white'}}>{selectedContent.category.name}</Text>
        </TouchableOpacity>
       
        <View style={styles.TouchableOpacity}>
          {
            saveData ?
              <TouchableOpacity onPress={() => onUnSave()}>
                <More name="bookmark" style={[styles.More_Icon, { marginHorizontal: 18 }]} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => onSave()}>
                <More name="bookmark-border" style={[styles.More_Icon, { marginHorizontal: 18 }]} />
              </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => { onShare() }}>
            <Share name="share" style={styles.Share} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.ImgCover}
          source={{
            uri: selectedContent.fileurl

          }}
        />
        <View style={styles.TextArea}>
          <Text style={styles.text}>
            {selectedContent.name}
          </Text>

          <Text style={styles.Date}>{selectedContent.create_date
            ? _formatDateTime(selectedContent.create_date.seconds)
            : ""}</Text>

        </View>
        <View style={styles.WebView}>

          <DetailWebView html={selectedContent.editname} />
        </View>
      </ScrollView>



    </View>
  );
};
const styles = StyleSheet.create({
  TouchableOpacity: {
    flexDirection: 'row',
    padding: 5
  },
  arrow: {
    fontSize: 30,
    color:'white',
    padding: 10,
  },
  WebView: {
    marginTop: 12
  },
  BorderLine: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 3,
    width: modules.VIEW_PORT_WIDTH / 4,
    marginTop: modules.PADDING
  },
  Date: {
    fontSize: modules.FONT_P,
    marginTop: modules.SPACE5,
    color: modules.SUB_TEXT
  },
  Writer: {
    fontSize: modules.FONT_P,
    marginTop: modules.SPACE5,
    ...Battambang
  },
  TextArea: {
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    paddingTop: modules.PADDING,
    backgroundColor:'#fff'



  },
  text: {
    fontSize: modules.FONT_H5,
    color: '#000',
    ...BattambangBold,

  },
  container: {
    flex: 1,
    backgroundColor:modules.COLOR_MAIN
  },
  content: {
    flex: 1,
    backgroundColor: modules.WHITE
  },
  ImgCover: {
    width: modules.VIEW_PORT_WIDTH,
    height: modules.VIEW_PORT_HEIGHT / 3
  },
  More_Icon: {
    fontSize: 24,
    padding: 6,
    color:'white'

  },
  Share: {
    fontSize: 20,
    padding: 6,
    color:'white'


  },
  headerDetail: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:modules.COLOR_MAIN,
    height: 50
  },
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',


  },
  modal: {
    width: modules.VIEW_PORT_WIDTH,
    height: modules.VIEW_PORT_HEIGHT / 4.5,


  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodysave: {
    height: 5,
    width: 60,
    borderRadius: 5,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    margin: 6


  },
  savestyles: {
    flex: 1,
    backgroundColor: '#ffffff',



  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgba(0,0,0,0.1)'




  },
  icon: {
    fontSize: 30,
    margin: 16
  },

  text1: {
    color: modules.SUB_TEXT,
    fontSize: 16,


  },
  Desc: {
    fontSize: 12,
    color: modules.SUB_TEXT,

  }

});
