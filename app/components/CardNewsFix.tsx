import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import { _formatDateTime } from '../services/datetime.service';
import FastImage from 'react-native-fast-image';
import DetailWebView from './DetailWebView';
import ICon from "react-native-vector-icons/Entypo";
import Eye from "react-native-vector-icons/SimpleLineIcons";
import modules from '../modules';
import { BattambangBold } from '../../function/customFont';
import { removeTag } from '../services/formattext.service'



export interface Props {
    onPress: () => void
    data: any,
    onSave?: any
    // onShare?:any
}


interface State { }

export default ({ data, onPress, onSave ,}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={[styles.container]}>
                <Text numberOfLines={1} style={styles.text}>{data.name}</Text>

            </View>

            <View style={[styles.subContainer]}>
                <View style={styles.containText}>
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={3}>{removeTag(`${data.editname}`)}</Text>
                    </View>
                    <FastImage style={styles.img1} source={{ uri: String(data.fileurl) }} />

                </View>

            </View>


            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text>{data.create_date
                        ? _formatDateTime(data.create_date.seconds)
                        : ""}</Text>

                    <Eye style={styles.eye} name='eye' />
                    <Text style={styles.fontText}>{data.top_view}</Text>
                </View>

                <TouchableOpacity onPress={onSave}>
                    <ICon style={{fontSize:18}} name="dots-three-horizontal" />
                </TouchableOpacity>
            </View>


        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    eye:{
        color: modules.SUB_TEXT, 
        fontSize: 16,marginHorizontal:4, marginLeft:8 
    },
    card: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        // marginHorizontal: 12,
        marginVertical: 5
    },
    icon: {
        marginHorizontal: 4
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },
    subContainer: {
        paddingTop: 12,
        // backgroundColor: '#2b2b',
        flexDirection: 'row',
        flex: 1
    },
    containText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        // alignItems: 'center',
    },
    groupImage: {
    },
    groupText: {
        flex: 1,
        justifyContent: "space-between"
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 100,

    },
    img1: {
        height: 80,
        width: 70,
        borderRadius: 8,
        marginLeft: 12,
    },
    text: {
        fontSize: 14,
        ...BattambangBold,
        opacity: 1,
        marginBottom: 12,
        color: '#000'

    },
    text1: {
        fontSize: 13,
        fontWeight: '500',
        

    },
    text2: {
        fontSize: 13,
        opacity: 0.8
    },
    dateTime: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    row1: {
        flexDirection: 'row',
        alignItems: "center"
    },
    Icon:
    {
        flexDirection: "row", alignItems: 'center'
    },
    fontText: {
        fontSize: modules.FONT_H5 - 4,
        color: modules.SUB_TITLE,


    },
});


