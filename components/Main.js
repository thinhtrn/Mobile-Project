import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Modal, ActivityIndicator, FlatList, Image } from 'react-native';
import * as Location from 'expo-location';
import moment from 'moment';

export default function MainScreen() {
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        () => {
            getData();
        }, []
    )
    const getData = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords
        const API_KEY = "57fecd145c163c87033d596f19305141";
        const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${API_KEY}`
        fetch(API)
            .then(res => res.json())
            .then(json => {
                setData(json);
            })
            .catch((err) => {
                console.error(err);
                setData([]);
            })
            .finally(() => setIsLoading(false))
    }
    const renderItem = ({ item }) => (
        <Row
            item={item}
        />
    );

    const IMAGE = "http://openweathermap.org/img/wn/";
    const Row = ({ item }) => (
        <View style={styles.rowContainer}>
            <View style={styles.rowChild}>
                <Image
                    style={styles.icon}
                    source={{
                        uri: `${IMAGE}${item.weather[0].icon}.png`,
                    }}
                />
            </View>
            <View style={styles.rowChildMiddle}>
                <Text style={styles.textDay}>
                    {moment.unix(item.dt).format('dddd')}
                </Text>
                <Text style={styles.textDes}>
                    {item.weather[0].description}
                </Text>
            </View>
            <View style={styles.rowChild}>
                <Text style={styles.textTemp}>
                    {(Math.round(item.temp.max) - 273.15).toFixed(0)}°C
                </Text>
            </View>
        </View>
    )

    const { daily } = data;
    const FLATLIST_DATA = daily;

    return (
        <SafeAreaView>
            {isLoading ? <>
                <ActivityIndicator size='large' color='#00ccbb'></ActivityIndicator>
                <Text>Fetching the weather ...</Text>
            </> :
                <View>
                    <View style={styles.locationContainer}>
                        <Text style={styles.textLocation}>{data.timezone}</Text>
                    </View>
                    <FlatList
                        data={FLATLIST_DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.dt}
                    />
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        flexDirection: 'row',
    },
    rowChild: {
        backgroundColor: '#B5EBD5',
        padding: 25,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    rowChildMiddle: {
        backgroundColor: '#B5EBD5',
        padding: 25,
        flex: 2.5,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    icon: {
        width: 80,
        height: 80,
    },
    locationContainer: {
        alignItems: "center",
        marginBottom:-15,
        marginTop: 5
    },
    textLocation: {
        fontSize:15,
        color: "#44886D"
    },
    textDay: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#004D2E",
    },
    textDes: {
        fontSize: 16,
        color: "#44886D",
        textTransform: 'capitalize'
    },
    textTemp: {
        fontSize: 21,
        fontWeight: "bold",
        color: "#44886D"
    },
});
