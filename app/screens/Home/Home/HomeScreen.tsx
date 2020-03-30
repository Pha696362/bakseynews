import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform

} from "react-native";
import _styles from "../../../_styles";
import HeaderMain from "../../../components/HeaderMain";
import modules from "../../../modules";
import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";
import { BattambangBold, FontGSansBold, fontGSans } from "../../../../function/customFont";
import Placeholder from "../../../components/Placeholder";
import AdsCard from "../../../components/AdsCard";
import { addAdsInArray } from "../../../services/mapping.service";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Share from 'react-native-vector-icons/Feather'
import Modal from "react-native-modal";
import CardNewsFix from '../../../components/CardNewsFix'
import { FlatList } from 'react-navigation'
import BigCard from "../../../components/BigCard";
import SpecialCard from "../../../components/SpecialCard";
import FastImage from "react-native-fast-image";
import IconClose from "react-native-vector-icons/Feather";
interface Props {
  data?: Array<any>;
  Content?: any;
  onContent?: any;
  onPress: (item: any) => void
  category?: any
  changeTab?: any
  adsDoc: any;
  onSave?: any
  onUnSave: () => void
  onModal: (item: any) => void
  saveData: boolean
  onShare: any
  loading: any
  loadingMore: boolean
  onEndReached: any
  onStartReached: any
  onRefresh: () => void

  dataContent?: any
  onfb: any
  dataSpecial: any;
  DuringMomentum: any
  onclickAds: any
  isModalVisible: any
  goUpdate: any
  appVersion:any
  onCloseModal:any
  toggleModal:any
}
export default ({ isModalVisible,
  onclickAds,
  DuringMomentum,
  onfb,
  onEndReached,
  loadingMore,
  loading, onRefresh,
  onUnSave, onSave, Content, 
  onModal, onPress, category, 
  changeTab, adsDoc, saveData, onShare, 
  dataSpecial,
  appVersion, 
  goUpdate,
  onCloseModal,
 }: Props) => {
  const dataContent: any = addAdsInArray(Content, adsDoc, 5);

  const [visable, setVisable] = useState(false);


  return (
    <View style={[_styles.flx1, styles.MainContainer]}>
      <StatusBar barStyle='light-content' backgroundColor="#1D3C78" />
      <SafeAreaView />
      <HeaderMain img={require("../../../images/logo.png")} title='Baksey News' onRightClick={onfb} icon="social-facebook" />
      <View style={styles.container}>

        <ScrollableTabView
          initialPage={0}
          tabBarInactiveTextColor={'#000'}
          tabBarActiveTextColor={'#1a73e8'}
          tabBarTextStyle={styles.ScrollableTab}
          onChangeTab={changeTab}
          tabBarUnderlineStyle={styles.underlineStyle}
          renderTabBar={() =>
            <ScrollableTabBar style={{ borderBottomWidth: 0, }} />}
        >
          {
            category.map((m: any, index: any) => {
              return (
                <View style={styles.view} key={m.key} tabLabel={m.name} >

                  <Modal
                    animationIn="fadeInUp"
                    animationOut="fadeOutDown"
                    style={styles.modalContainer}
                    onBackdropPress={() => setVisable(!visable)}
                    isVisible={visable}
                  >
                    <View style={styles.content}>
                      <View style={styles.center}>
                        <View style={styles.bodysave}>

                        </View>
                      </View>
                      <View style={styles.savestyles}>
                        {
                          saveData ?
                            <TouchableOpacity style={styles.body} onPress={() => { onUnSave(), setVisable(!visable) }}>
                              <Icon style={styles.icon} name='bookmark' />
                              <View >
                                <Text style={styles.text}>
                                  Unsave post
                             </Text>
                                <Text style={styles.Desc} >
                                  Remove this content to your bookmarks.
                            </Text>
                              </View>

                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.body} onPress={() => { onSave(), setVisable(!visable) }}>
                              <Icon style={styles.icon} name='bookmark-outline' />
                              <View >
                                <Text style={styles.text}>
                                  Save post
                             </Text>
                                <Text style={styles.Desc} >
                                  Add this content to your bookmarks.
                            </Text>
                              </View>

                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={[styles.body, { borderBottomColor: '#fff' }]} onPress={() => { onShare() }}>
                          <Share style={styles.icon1} name='share' />

                          <View>
                            <Text style={styles.text}>
                              Share this conten to social network
                           </Text>

                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                  </Modal>

                  {loading ? <Placeholder /> :
                    <FlatList
                      data={dataContent}
                      showsVerticalScrollIndicator={false}
                      // ListHeaderComponent={renderBigCard(dataSpecial, onPress, onModal)}
                      ListFooterComponent={renderFooter(loadingMore)}
                      refreshing={loading ? true : false}
                      onEndReached={onEndReached}
                      onRefresh={onRefresh}
                      onEndReachedThreshold={0.01}
                      onMomentumScrollBegin={() => {
                        DuringMomentum(false);
                      }}
                      onMomentumScrollEnd={() => {
                        DuringMomentum(true);
                      }}
                      keyExtractor={(i, index) => index.toString()}
                      renderItem={({ item }: any) => {
                        const { isAdd, isBig } = item;
                        if (isAdd) {
                          return (
                            <AdsCard
                              onClickAds={() => onclickAds(item.link)}
                              fileurl={item.fileurl}
                            />
                          );
                        }

                        else if (isBig) {
                          return (
                            <BigCard
                              key={item.key}
                              data={item}
                              onPress={() => onPress(item)}
                              onSave={() => {
                                onModal(item)
                                setVisable(!visable)
                              }}
                            />
                          );

                        }

                        else {
                          return (
                            <CardNewsFix
                              key={item.key}
                              data={item}
                              onPress={() => onPress(item)}
                              onSave={() => {
                                onModal(item)
                                setVisable(!visable)
                              }}
                            />
                          );

                        }
                      }}

                    />
                  }


                </View>
              )
            })
          }
        </ScrollableTabView>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            height:
              Platform.OS === "ios"
                ? modules.VIEW_PORT_HEIGHT / 3
                : modules.VIEW_PORT_HEIGHT / 2.5,
            borderRadius: 12,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              padding: modules.BODY_HORIZONTAL_24
            }}
          >
            <View
              style={{
                padding: modules.BODY_HORIZONTAL_12 / 2,
                backgroundColor:'#fff',
                borderRadius: 12,
                margin: 12
              }}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.logo}
                source={require("../../../images/logo.png")}
              />
            </View>
            <Text
              style={{
                fontSize: modules.FONT_H5,
                ...FontGSansBold,
                flex: 2
              }}
            >
              Update are Available
              </Text>
            <Text
              style={{
                fontSize: modules.FONT_P,
                ...fontGSans,
                color: modules.SUB_TEXT,
                flex: 1
              }}
            >
            </Text>
            <TouchableOpacity
              onPress={() =>
                goUpdate(
                  Platform.OS === "ios"
                    ? appVersion.link_ios
                    : appVersion.link_android
                )
              }
              style={{
                alignItems: "center",
                padding: modules.BODY_HORIZONTAL_12,
                paddingHorizontal: modules.BODY_HORIZONTAL_12,
                paddingVertical: modules.BODY_HORIZONTAL / 2,
                backgroundColor: modules.COLOR_MAIN,
                marginHorizontal: modules.BODY_HORIZONTAL_24,
                borderRadius: modules.SPACE5
              }}
            >
              <Text
                style={{
                  fontSize: modules.FONT_H5,
                  ...FontGSansBold,
                  color: modules.WHITE
                }}
              >
                Update Now
                </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ position: "absolute" }}
            onPress={onCloseModal}
          >
            <IconClose
              style={{
                paddingHorizontal: modules.BODY_HORIZONTAL / 2,
                paddingVertical: modules.SPACE5,
                color: "red",
                fontSize: 24
              }}
              name="minus-circle"
            />
          </TouchableOpacity>
        </View>
      </Modal>
      </View>

    </View>
  );
};
const renderFooter = (loadingMore: boolean) => {
  if (loadingMore) return <ActivityIndicator color={'black'} size={'large'} />
  return <View style={{ height: 80 }} />
}
const renderBigCard = (item: any, onPress: any, onModal: any) => {
 
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}>
        {item.map((item: any) => {
          return (
            <SpecialCard
              key={item.key}
              data={item}
              onPress={() => onPress(item)}
              onSave={() => {
                onModal(item)
              }}
            />
          )
        })}
     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 200
  },
  TabLabel: {
    ...BattambangBold,
    fontSize: 15,
    marginTop: modules.PADDING - 3
  },
  Scrolrable: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: modules.BACKGROUND_PRIMARY
  },
  MainContainer: {
    backgroundColor: modules.COLOR_MAIN,

  },
  tabView: {
    backgroundColor: "rgba(0,0,0,0.01)"
  },
  card: {
    borderWidth: 1,
    backgroundColor: modules.COLOR_MAIN,
    borderColor: "rgba(0,0,0,0.1)",
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: "#ccc",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },

  underlineStyle: {
    height: 3,
    backgroundColor: '#1a73e8',
    marginTop: modules.SPACE,
    // marginBottom: modules.BIG_SPACE,

  },

  ScrollableTab: {
    fontSize: modules.FONT_H5,
    // marginTop: modules.SPACE,
    marginTop: modules.PADDING / 2,
    marginBottom: modules.BIG_SPACE,
    ...BattambangBold,
    fontWeight: 'normal',
  },
 
  specialContainer: {
 
    paddingHorizontal: 10,

  },
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  content: {
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
  icon1: {
    fontSize: 24,
    margin: 16
  },
  text: {
    color: modules.SUB_TEXT,
    fontSize: 16,
  },
  Desc: {
    fontSize: 12,
    color: modules.SUB_TEXT,

  },
  view: {
    fontSize: 15,
    marginTop: modules.PADDING ,
    backgroundColor: modules.fds_blue_05,
    // borderWidth:2

  }
});
