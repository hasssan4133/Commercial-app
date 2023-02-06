import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Aquí llamamos al usuario, desde donde se carga el menú que se muestre.
import Usuario from "../screens/Usuario/Usuario";
import colors from "../styles/colors";
//Aqui llamamos a los archivos
import ChangeUsername from "../screens/Usuario/ChangeUsername";
import ChangePassword from "../screens/Usuario/ChangePassword";
import Addresses from "../screens/Usuario/Addresses";


const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
                cardStyle: {
                    backgroundColor: colors.bgLight,
                }
            }}
        >
            <Stack.Screen
                    name="account"
                    component={Usuario}
                    options={{title: "Cuenta", headerShown: false}}
            />
            <Stack.Screen
                    name="change-username"
                    component={ChangeUsername}
                    options={{
                        title: "Cambiar Usuario",
                    }}
            />
            <Stack.Screen
                    name="change-password"
                    component={ChangePassword}
                    options={{
                        title: "Cambiar Password",
                    }}
            />


        </Stack.Navigator>
    )
}
