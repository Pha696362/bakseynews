
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/FontAwesome";
import _styles from "../_styles";
import modules from "../modules";
import DetailContainer from "../screens/Detail/DetailContainer";
import SearchTabContainer from "../screens/Search/SearchTabContainer";
import SaveTabContainer from "../screens/Save/SaveTabContainer";
import SettingTabContainer from "../screens/Setting/SettingTabContainer";
import HomeContainer from "../screens/Home/Home";





const TabNavigation = createBottomTabNavigator(
  {
    HomeTab: HomeContainer,
    Search: SearchTabContainer,
    Save: SaveTabContainer,
    Setting: SettingTabContainer
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ defaultHandler }) => {
        defaultHandler();
      },
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName: any;
        // let labelName: any;
        if (routeName === "HomeTab") {
          iconName = "server";

        } else if (routeName === "Search") {
          iconName = "search";

        } else if (routeName === "Save") {
          iconName = "bookmark";

        }else if (routeName === "Setting") {
          iconName = "Menu";
          // labelName = "SETTING";
        }
        return (
          <View style={_styles.iconTabContainer}>
            {
              iconName =="Menu" 
              ?
              <Icons
              name={"info-circle"}
              size={focused ? 24 : 24}
              color={`${tintColor}`}
              
            />
              :
              <Icon
              name={iconName}
              size={focused ? 24 : 24}
              color={`${tintColor}`}
            />}
            
          
          </View>
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: '#1D3C78',
      inactiveTintColor:modules.SUB_TEXT,
      showLabel: false,
      style: {
        elevation: 0,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F5",
        backgroundColor: "#fff",
        height: 50,
        paddingTop: 5,
        marginBottom:10
      }
    }
  }
);
const APP = createStackNavigator(
  { 
    
    MainTab: TabNavigation,
    Detail: DetailContainer 
  },
    
  {
    headerMode: "none"
  },


);
export default createAppContainer(APP);
