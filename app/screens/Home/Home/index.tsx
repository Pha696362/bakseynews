import * as React from "react";
import HomeScreen from "./HomeScreen";
import { StatusBar, Share, Linking } from "react-native";
import { inject, observer } from "mobx-react";
import SplashScreen from 'react-native-splash-screen';
interface Props {
  navigation: any;
  content: any;
  category: any;
  bookmark: any;
  messaging: any;
  ads: any;

}

interface State {
  key: string
  bookmark: Boolean
  selectedItem: any

}
@inject('content', 'category', 'ads', 'bookmark', 'messaging')

@observer


export default class HomeContainer extends React.Component<Props, State> {

  onEndReachedCalledDuringMomentum: boolean | undefined;
  constructor(props: Props) {
    super(props);

    this.state = {
      key: '',
      bookmark: false,
      selectedItem: null,
    };
  }
  onStartReached = () => {
    this.onEndReachedCalledDuringMomentum = false
  }

  onEndReached = () => {
    this.props.content.fetchMoreContent(this.state.key);
  }

  async componentDidMount() {
    SplashScreen.hide();
    StatusBar.setBarStyle('light-content');
    await this.props.messaging.setUserToken();
    await this.props.messaging.checkPermission();
    await this.props.messaging.initialNotification();
    this.props.content.fetchContent()
    this.props.category.fetchCategory();
    this.props.ads.fetchAds();
    this.props.content.updateTopView();
  }
  _onDetail = () => {
    this.props.navigation.navigate('Detail')
  }
  _onMore = async () => {

    await this.props.content.fetchMoreContent()
  }

  _onRefresh = async () => {
    await this.props.content.fetchRefreshContent(this.state.key);
  };
  // _onEnd =

  _onContent = (item: any) => {
    this.props.content.fetchDetail(item)
    this.props.navigation.navigate('Detail')
  }
  _changeTab = (ref: any) => {



    const key: string = ref.ref.key
    const newKey = key.replace('.$', '')
    this.setState({ key: newKey })
    this.props.content.fetchContent(newKey)
    console.log('newkey :', newKey);

  }
  _onModal = (item: any) => {
    // console.log("item",item)

    this.setState({ selectedItem: item })
    this.props.bookmark.fetchSave(item.key)
  }
  _onSave = async () => {
    const item = this.state.selectedItem
    this.props.content.fetchDetail(item)
    const { selectedDetail } = this.props.content;
    await this.props.bookmark.addFavorite(selectedDetail);
    await this.props.bookmark.fetchFavorite();

  };
  _onUnSave = async () => {
    const item = this.state.selectedItem
    const { selectedDetail } = this.props.content;
    await this.props.bookmark.deleteFavorite(item.key);
    await this.props.bookmark.fetchFavorite();
  }
  _onShare = async () => {
    // const key = this.props.content.dataSelected.key;
    const key = this.state.selectedItem.key
    try {
      const result = await Share.share({
        message: `https://bakseynews.com/article/${key}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log("object", error);
    }
  };
  _onfb = () => {
    Linking.openURL("https://www.facebook.com/%E1%9E%82%E1%9F%92%E1%9E%9A%E1%9E%BD%E1%9E%9F%E1%9E%B6%E1%9E%9A%E1%9E%81%E1%9F%92%E1%9E%98%E1%9F%82%E1%9E%9A-100598258132780/?__tn__=kC-R&eid=ARCG-5hBUaVY27vkLVp1U9ImLt2FSBDpKQb0tNT97a9KB0_FhJ8iBJ81UqaJyGbiEb0sbjgLFAodJ1Vp&hc_ref=ARToB1zdeZE1QpSwVvnySxicaHCGalhDVHyQRsQoeGj0mtLjr-4xMjhbcjJJgXOn45g&__xts__[0]=68.ARDOZp7rGFTYUr-IV1qWWlsBJBU2n7ZlhX8mYDxLBVe2boIVSKoxo47x7AOL2nD7Vne296MjxfQNgr820SqkJFBiZAs9TubiDZBHoQe1lx978usbslC19ChmH6SOx6bHSUXW7Fh3-jQrc6cCldm-Doqw4Qlwa61xnH_OMeX5mUkSg4kE78yn6RuH-MOMZosDCgggTIvIsDl-VNI7_2vfYVAE3b0EHMybyyBSU1nTDjqVLmMbdptPIccdBTswGB7o-T0Wop1h90TzoLfGfyXcT6VP7bJfpWop")
  };
  render() {
    const { dataContent, loading, loadingMore, dataSpecial } = this.props.content
    const { category } = this.props.category;
    const hotNews = {
      name: 'ព័ត៌មានថ្មីៗ',
      key: ''
    }
    const newcategories = category ? [hotNews, ...category] : [hotNews];
    const { adsDoc } = this.props.ads
    const { saveData } = this.props.bookmark


    return (
      <HomeScreen
        dataSpecial={dataSpecial}
        adsDoc={adsDoc}
        Content={dataContent}
        onPress={this._onContent}
        category={newcategories}
        changeTab={this._changeTab}
        loading={loading}
        onSave={this._onSave}
        onUnSave={this._onUnSave}
        onModal={this._onModal}
        saveData={saveData}
        loadingMore={loadingMore}
        onEndReached={this.onEndReached}
        onStartReached={this.onStartReached}
        onMore={this._onMore}
        onRefresh={this._onRefresh}
        onShare={this._onShare}
        onfb={this._onfb}
      />
    );

  }
}

