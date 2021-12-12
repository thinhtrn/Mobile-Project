import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { FlatList, SafeAreaView } from "react-native";

export default function GetWeather({ data }) {
    const { daily } = data;
    //const { name } = city;
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const DATA = daily;

    const Row = ({ item }) => (
        <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.rowChild}>
                <View style={styles.rightView}>
                    <Text>FLATLIST: {item.dt}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    const renderItem = ({ item }) => (
        <Row
            item={item}
        />
    );
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowChild: {
        backgroundColor: '#00ccbb',
        padding: 20,
        marginHorizontal: 8,
        marginVertical: 8,
    },
    rightView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDegree: {
        fontSize: 20,
    },
})