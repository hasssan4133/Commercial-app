import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StatusBarCustom from "../components/StatusBar";
//Componente que trae los datos del usuario
import { getPartesapi } from "../api/partes";
//El imopr tde debajo nos importa los datos del usuario almacenados
import useAuth from "../hooks/useAuth";
import ScreenLoading from "../components/ScreenLoading";
import Menu from "./Menu";
import colors from "../styles/colors";
export default function Principal() {
    const [user, setUser] = useState(null);
    const { auth } = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async() => {
                //console.log(auth);
                const response = await getPartesapi(auth.token);

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
                    <ScrollView>

                        <Menu />
                    </ScrollView>
                </>
            )}



        </>
    );
}
