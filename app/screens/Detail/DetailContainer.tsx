import * as React from 'react';
import { View, StyleSheet, StatusBar, Share } from 'react-native';
import DetailScreen from './DetailScreen';
import { inject, observer } from 'mobx-react';

interface Props {
  navigation: any;
  content: any,
  bookmark: any
}

interface State {
  selectedItem: any
  saveData: boolean

}
@inject('content', 'bookmark')
@observer

export default class DetailContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      saveData: false,
      selectedItem: null,

    };
  }
  async  componentDidMount() {
    <StatusBar barStyle="dark-content" />
    const { selectedDetail } = await this.props.content;
    this.props.content.updateTopView(selectedDetail.key)
    await this.props.bookmark.fetchSave(selectedDetail.key)
    const { saveData } = this.props.bookmark
    this.setState({ saveData: saveData })
  }
  _onClickBack = () => {
    this.props.navigation.goBack()

  }

  _onSave = async () => {
    const { selectedDetail } = await this.props.content;
    await this.props.bookmark.addFavorite(selectedDetail);
    await this.props.bookmark.fetchFavorite();
    this.setState({ saveData: !this.state.saveData })

  };
  _onUnSave = async () => {
    const { selectedDetail } = await this.props.content;
    await this.props.bookmark.deleteFavorite(selectedDetail.key);
    await this.props.bookmark.fetchFavorite();
    this.setState({ saveData: !this.state.saveData })
  };
 
  _onShare = async () => {

    const { selectedDetail } = this.props.content
    try {
      const result = await Share.share({
        message: `https://bakseynews.com/article/${selectedDetail.key}`

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

  public render() {
    const { selectedDetail } = this.props.content


    return (

      <DetailScreen
        onClickBack={() => this.props.navigation.goBack()}
        selectedContent={selectedDetail}
        saveData={this.state.saveData}
        onSave={this._onSave}
        onUnSave={this._onUnSave}
        onShare={this._onShare}


      />
    );
  }
}
