import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StatusBarCustom from "../../components/StatusBar";
//Componente que trae los datos del usuario
import { getMeApi } from "../../api/user";
//El imopr tde debajo nos importa los datos del usuario almacenados
import useAuth from "../../hooks/useAuth";
import ScreenLoading from "../../components/ScreenLoading";
//import UserInfo from "../../components/Account/UserInfo";
import Menu from "../../components/Account/Menu";
import colors from "../../styles/colors";

export default function Usuario() {
    const [user, setUser] = useState(null);
    const { auth } = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getMeApi(auth.token);
                setUser(response);
            })()
        }, [])
    );

    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content" />

            {!user ? (
                <ScreenLoading size="large" text="Cargando datos..." color="blue" />
            ) : (
                <>
                    <Search />
                    <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Bienvenido </Text>
                        <Text style={styles.titleName}>
                        {user.name && user.lastname 
                        ? `${user.name} ${user.lastname}` 
                        : user.email}
                        </Text>
                    </View>
                        <Menu />
                    </ScrollView>
                </>
            )}



        </>
    );
}
const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
    },
    titleName: {
        fontSize: 20,
        fontWeight: "bold",
    },
})