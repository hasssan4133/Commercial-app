import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StatusBarCustom from "../../components/StatusBar";
//Componente que trae los datos del usuario
import { getMeApi } from "../../api/user";
import { List } from "react-native-paper";
//El imopr tde debajo nos importa los datos del usuario almacenados
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
//import UserInfo from "../../components/Account/UserInfo";
import Menu from "../../components/Account/Menu";
import colors from "../../styles/colors";
import { Alert } from "react-native";

export default function Account() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const { auth } = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async() => {
                //console.log(auth);
                const response = await getMeApi(auth.token);

                setUser(response);
            })()
        }, [])
    );
    const { logout } = useAuth();

    const logoutAccount = () => {
            Alert.alert(
                "Cerrar Sesión",
                "¿Estas seguro de que quieres salir de tu cuenta?",
                [
                    {
                        text: "No"
                    },
                    {
                        text: "Si",
                        onPress: logout,
                    }
                ],
                { cancelable: false}
            )
    }
    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content" />

            {!user ? (
                <ScreenLoading size="large" text="Cargando datos..." color="blue" />
            ) : (
                <>
                    <ScrollView>

                    <View style={styles.container}>
                        <Text style={styles.title}>Bienvenido </Text>
                        <Text style={styles.titleName}>
                        {user.name && user.lastname 
                        ? `${user.name} ${user.lastname}` 
                        : user.email}
                        </Text>
                    </View>
                    <List.Section>
     

                        </List.Section>
                        <List.Section>
                        <List.Subheader>App</List.Subheader>
                            <List.Item 
                                title="Cerrar Sesión"
                                description="Cierra esta sesión"
                                left={(props) => <List.Icon {...props} icon="logout" />}
                                onPress={logoutAccount}
                            />
                    </List.Section>
                    </ScrollView>
                </>
            )}
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    despla: {
      marginTop: 30,
    },
    screen: {
      flex: 1,
      backgroundColor: '#f2f2fC',
    },
      container22: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",

    },
    title: {
          fontSize: 20,
          paddingVertical: 20,
          paddingHorizontal: 60,
    },
    btnSuces2: {
          marginBottom: 20,
          marginTop: 16,
    },
    mainBody: {
          flex: 1,
          justifyContent: 'center',
          padding: 20,
    },
    buttonStyle: {
      backgroundColor: '#307ecc',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#307ecc',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    textStyle: {
      backgroundColor: '#fff',
      fontSize: 15,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      textAlign: 'center',
    },
})