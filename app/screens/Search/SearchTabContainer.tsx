import * as React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import SearchTabScreen from "./SearchTabScreen";
import { inject, observer } from "mobx-react";

interface Props {
  searchContent: any;
  content:any;
  navigation:any;
}
interface State {
  searchText: string;
}

@inject("searchContent",'content')
@observer
export default class SearchTabContainer extends React.Component<Props, State> {
  private timeout: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }
  componentDidMount(){
    StatusBar.setBarStyle('light-content');

  }

  _onTextSearch = (text: string) => {
    this.setState({ searchText: text }, () => {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.searchContent.fetchSearchContent(this.state.searchText);
      }, 500);
    });
  };
  _onSearch = (item: any) => {
    this.props.content.fetchDetail(item)
    this.props.navigation.navigate('Detail')
}
  render() {
    const { searchData } = this.props.searchContent;
    return (
      <SearchTabScreen
        onPress={this._onSearch}
        searchText={this.state.searchText}
        onTextSearch={this._onTextSearch}
        searchData={searchData}
      />
    );
  }
}
