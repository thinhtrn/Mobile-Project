import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Modal, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import * as Location from 'expo-location';
import moment from 'moment';
//import GetWeather from './Weather';

export default function MainScreen() {
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isError, setIsError] = useState(false);
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
        /**
        const response = await fetch(API);
        const result = await response.json();
        if (response.ok) {
            setData(result);
        } else {
            setErrorMessage("Error");
        }
         */
        fetch(API)
            .then(res => res.json())
            .then(json => {
                setData(json);
                setIsError(false);
            })
            .catch((err) => {
                setIsError(true);
                console.error(err);
                setData([]);
            })
            .finally(() => setIsLoading(false))
    }
    /** 
    if(data){
        let props = {
            data
        }
        return (
            <SafeAreaView style={styles.container}>
                <Modal visible={isError} animationType='fade' transparent={true}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Data loading error. Please try again.</Text>
                        </View>
                    </View>
                </Modal>
                {isLoading ? <>
                    <ActivityIndicator size='large' color='#00ccbb'></ActivityIndicator>
                    <Text>Fetching the weather ...</Text>
                </> :
                    <View>
                        <Text>DATA FROM API: {data.timezone}</Text>
                        <GetWeather {...props} />
                    </View>
                }
            </SafeAreaView>
        )
    };
    */

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
                <Text style={styles.dateText}>
                    {moment.unix(item.dt).format('dddd')}
                </Text>
                <Text style={styles.type}>
                    {item.weather[0].description}
                </Text>
                <Text style={styles.temp}>
                    {(Math.round(item.temp.max) - 273.15).toFixed(0)}°C
                </Text>
            </View>
        </View>
    )

    const { daily } = data;
    const FLATLIST_DATA = daily;

    return (
        <SafeAreaView style={styles.container}>
            <Modal visible={isError} animationType='fade' transparent={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Data loading error. Please try again.</Text>
                    </View>
                </View>
            </Modal>
            {isLoading ? <>
                <ActivityIndicator size='large' color='#00ccbb'></ActivityIndicator>
                <Text>Fetching the weather ...</Text>
            </> :
                <View>
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
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        width: 60,
        height: 60,
    },
});
