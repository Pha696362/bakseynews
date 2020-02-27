
import * as React from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
import modules from '../../modules';
import { SafeAreaView } from 'react-navigation';
import CardHeader from '../../components/CardHeader';


interface Props {
    title: any
    img: string
    ContactSelect: any
}

interface State {
}

export default ({ title, img,ContactSelect }: Props) => {
    return (
        <SafeAreaView>
            <CardHeader/>
        
        <View style={styles.Group}>
            <View style={styles.GroupAccount}>
                <View style={styles.groupIcon}>
                    <Icon style={styles.icon} name="account-circle" />
                </View>
                <View style={styles.GroupText}>
                {ContactSelect.length>0 ? 
                  <Text style={styles.TextName}> 
                  {ContactSelect[0].name}
                  </Text>:null}
                    <Text style={styles.text}>BakseyNews.</Text>
                </View>
            </View>
            <View style={styles.GroupAccount}>
                <View style={[styles.groupIcon, { backgroundColor: '#007acc' }]}>
                    <Icon style={styles.icon} name="phone" />
                </View>
                <View style={styles.GroupText}>
                    <Text style={styles.TextName}>Phone Number</Text>
                    {ContactSelect.length>0 ? 
                    <Text style={styles.text}>
                        {ContactSelect[0].phonenumber}
                    </Text>:null}
                </View>
            </View>
            <View style={styles.GroupAccount}>
                <View style={[styles.groupIcon, { backgroundColor: '#00995c' }]}>
                    <Icon style={styles.icon} name="email" />
                </View>
                <View style={styles.GroupText}>
                    <Text style={styles.TextName}>Email</Text>
                    {ContactSelect.length>0 ? 
                    <Text style={styles.text}>
                    {ContactSelect[0].email}
                    </Text>:null}
                </View>
            </View>
            <View style={styles.GroupAccount}>
                <View style={[styles.groupIcon, { backgroundColor: '#cc0000' }]}>
                    <Icon style={styles.icon} name="place" />
                </View>
                <View style={styles.GroupText}>
                    <Text style={styles.TextName}>Location</Text>
                    {ContactSelect.length>0 ? 
                    <Text style={styles.text1}>
                    {ContactSelect[0].address}
                    </Text>:null}
                </View>
            </View>

        </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    TextInfor: {
        fontSize: modules.FONT_H2 + 2,
        fontWeight: '500'
    },
    Group: {
        marginTop: modules.PADDING - 10,
        paddingHorizontal: modules.PADDING + 2,
        borderRadius: modules.RADIUS + 4
    },
    GroupAccount: {
        marginTop: modules.PADDING,
        padding: modules.PADDING + 3,
        backgroundColor: modules.WHITE,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: modules.SPACE - 3,
        borderRadius: modules.BIG_SPACE,
        borderColor: modules.BORDER,
    },
    img: {
        height: modules.MARGIN * 2,
        width: modules.MARGIN * 2,
    },
    GroupText: {
        paddingHorizontal: modules.PADDING + 5
    },
    TextName: {
        fontSize: modules.FONT_H3 - 2,
        fontWeight: '400',
        color: '#111',
    },
    text: {
        fontSize: modules.FONT_H6,
        fontWeight: '300',
        marginTop: 5,
        color: modules.TEXT_NOTE,
    },
    text1: {
        fontSize:14,
        fontWeight: '300',
        marginTop: 5,
        color: modules.TEXT_NOTE,
    },
    groupIcon: {
        backgroundColor: modules.ENGLISH,
        height: modules.PADDING * 3.6,
        width: modules.PADDING * 3.6,
        borderRadius: modules.PADDING * 3.6 / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        color: modules.WHITE,
        fontSize: modules.FONT_H1,
    },
});

