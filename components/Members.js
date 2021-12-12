import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function MembersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Tan Loi Ngo - 101094358{"\n"}
                Minh Thanh Duong - 101281722{"\n"}
                Hoang Thinh Tran - 101133062{"\n"}
                Thi Kim Thao Tran - 101156327{"\n"}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 25,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        paddingTop: 35,
        alignItems: "center",
    },
    text: {
        fontSize: 20
    }
})