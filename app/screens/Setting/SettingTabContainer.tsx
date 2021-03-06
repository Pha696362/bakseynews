// import * as React from "react";
// import { View, StyleSheet, Text, StatusBar } from "react-native";
// import SettingTabScreen from "./SettingTabScreen";
// import { inject, observer } from "mobx-react";


// interface Props {
//   contact: any
// }
// interface State { }
// @inject('contact')
// @observer
// export default class SettingTabContainer extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {};
//   }
//   async componentDidMount() {
//     await this.props.contact.fetchContact()
//     // const { contact } = await this.props.contact;
//     StatusBar.setBarStyle('dark-content');




  
//   }

//   public render() {
//     const { contact } = this.props.contact
    
//     return <SettingTabScreen
//       ContactSelect={contact}

//     />;
//   }
// }

import * as React from "react";
import { View, StyleSheet, Text, StatusBar, Linking, Platform } from "react-native";
import SettingTabScreen from "./SettingTabScreen";
import { inject, observer } from "mobx-react";


interface Props {
  contact: any

}
interface State { }
@inject('contact')
@observer
export default class SettingTabContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    await this.props.contact.fetchContact()
    // const { contact } = await this.props.contact;
    StatusBar.setBarStyle('dark-content');
  
  }
  _onClick=()=>{
    Linking.openURL("https://www.facebook.com/phsarbeauty/")
  }
  _onSetting=()=>{
    if(Platform.OS === 'ios'){
      Linking.canOpenURL('app-settings:/Notifications').then(supported => {

        console.log(`Settings url works`)
        Linking.openURL('app-settings:')
    }).catch(error => {
        console.log(`An error has occured: ${error}`)
    })
    } else {
      Linking.openSettings()
    }
   
  }
 _onMakeCall = (number: any) => {
    // const url = `${Platform.OS === "ios" ? "telprompt:" : "tel:"}0${Number(
    //   number
    // )}`;
    // Linking.openURL(url);
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:0${number}`; }
    Linking.openURL(phoneNumber);
  };
  public render() {
    const { contact } = this.props.contact
    
    return <SettingTabScreen
      ContactSelect={contact}
      onfb={this._onClick}
      onBell={this._onSetting}
      onMakeCall={this._onMakeCall}

    />;
  }
}