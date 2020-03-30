import * as React from "react";
import HomeScreen from "./HomeScreen";
import { StatusBar, Share, Linking, Platform } from "react-native";
import { inject, observer } from "mobx-react";
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';

interface Props {
  navigation: any;
  content: any;
  category: any;
  bookmark: any;
  messaging: any;
  ads: any;
  advertiseType: any;
  appVersion: any;


}
interface State {
  key: string
  bookmark: Boolean
  selectedItem: any
  DuringMomentum: boolean,
  isModalVisible: boolean;
  visible: boolean;

}
@inject('appVersion','content', 'category', 'ads', 'bookmark', 'messaging', 'advertiseType')

@observer

export default class HomeContainer extends React.Component<Props, State> {

  onEndReachedCalledDuringMomentum: boolean | undefined;
  constructor(props: Props) {
    super(props);

    this.state = {
      key: '',
      bookmark: false,
      selectedItem: null,
      DuringMomentum: false,
      isModalVisible: false,
      visible: true,


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
    this.props.messaging.initialNotification(this.props.navigation);
    this.props.content.fetchContent()
    this.props.category.fetchCategory();
    this.props.ads.fetchAds();
    this.props.content.updateTopView();
    this.props.content.fetchLink();
    await this.props.appVersion.fetchAppVersion();
    const osVersion = DeviceInfo.getVersion();
    const { appVersion } = this.props.appVersion
    if (appVersion) {
      const app = Platform.OS == "ios" ? appVersion.version_ios : appVersion.version_android
      if (osVersion != app) {
        this.setState({ isModalVisible: true })
      }
    }
  }

  _onDetail = () => {
    this.props.navigation.navigate('Detail')
    this.props.content.selectedDetail();
  }
  _onContent = (item: any) => {
    this.props.content.fetchDetail(item)
    this.props.navigation.navigate('Detail')
  }
  _onEnd = () => {
    Platform.OS == "ios"
      ? this.state.DuringMomentum == false
        ? (this.props.content.fetchMoreContent(),
          this.setState({ DuringMomentum: true }))
        : null
      : this.props.content.fetchMoreContent();
  };

  _onRefresh = () => {
    this.props.content.fetchContent();
  };
  _changeTab = (ref: any) => {
    const key: string = ref.ref.key
    const newKey = key.replace('.$', '')
    this.setState({ key: newKey })
    this.props.content.fetchContent(newKey)

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


  _onfb = () => {
    Linking.openURL("https://familynews7-a1cf6.firebaseapp.com/page/QrqPt4iaZ5yIxhXjlXX7")
  };


  _onShare = async () => {
    const shareLink = this.props.content.link
    const key = this.props.content.selectedDetail.key
    try {
      const result = await Share.share({
        message: `${shareLink[0].link}/${key}`
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
  _onclickAds = (dataAds: any) => {
    this.props.advertiseType.selectedAds(dataAds);
    Linking.openURL(`${dataAds}`);
  };

  _onCloseModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  _goUpdate = (data: any) => {
    this.props.appVersion.versionFirebase(data);
    Linking.openURL(`${data}`);
    // console.log('data', data)

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
    const { appVersion} = this.props.appVersion;


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
        // onMore={this._onMore}
        onclickAds={this._onclickAds}
        onRefresh={this._onRefresh}
        onShare={this._onShare}
        onfb={this._onfb}
        goUpdate={this._goUpdate}
        toggleModal={this._toggleModal}
        onCloseModal={this._onCloseModal}
        appVersion={appVersion}
        isModalVisible={this.state.isModalVisible}
        DuringMomentum={(value: any) =>
          this.setState({ DuringMomentum: value })
        }
      />
    );

  }
}

