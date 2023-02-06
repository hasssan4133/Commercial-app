import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Usuario from "../screens/Usuario/Usuario";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import AccountStack from "./AccountStack";
import NavegaPartes from "../partes/NavegaPartes";
import NavegaClientes from "../clientespotenciales/NavegaClientes";
import { createMultiStyleIconSet } from "react-native-vector-icons";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation(){
        return (
                <NavigationContainer>
                    <Tab.Navigator
                        barStyle={styles.navigation} screenOptions={({ route }) => ({
                            tabBarIcon: (routeStatus) => {
                                return setIcon(route, routeStatus);
                            }
                        })}>
                        <Tab.Screen
                            name="home"
                            component={Home}
                            options={{
                                title: "Visitas",
                            }}
                        />
                        <Tab.Screen
                            name="Partes"
                            component={NavegaPartes}
                            options={{
                                title: "Clientes",
                            }}
                        />
                         <Tab.Screen
                            name="cart"
                            component={NavegaClientes}
                            options={{
                                title: "Potenciales",
                            }}
                        />
                        <Tab.Screen
                            name="account"
                            component={AccountStack}
                            options={{
                                title: "Mi Cuenta",
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
        )
}

function setIcon(route, routeStatus) {
    let iconName = "";
    switch (route.name){
            case "home":
                iconName = "table"
                break;
            case "Partes":
                iconName = "user"
                break;
            case "cart":
                iconName = "wechat"
                break;
            case "account":
                iconName = "address-book"
                break;
            default:
                break;
    }
    return <AwesomeIcon name={iconName} style={styles.icon} />
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.bgDark,
    },
    icon:{
        fontSize: 20,
        color: colors.fontLight,
    }
})
