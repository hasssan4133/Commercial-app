import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import CrearClientepotencial from "./CrearClientepotencial";
import EditarClientepotencial from "./EditarClientepotencial";
import CrearProyectopotencial from "./CrearProyectopotencial";
import ListarClientespotencial from "./ListarClientespotencial";
import Principal from "./Principal";
import CrearVersionProyecto from "../partes/CrearVersionProyecto";
import ListarProyectos from "../partes/ListarProyectos";
const Stack = createStackNavigator();

export default function NavegaPartes() {
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
                component={Principal}
                options={{title: "Listado", headerShown: false}}
        />

        <Stack.Screen
                name="crearClientepotencial"
                component={CrearClientepotencial}
                options={{
                    title: "Crear Cliente",
                }}
        />
        <Stack.Screen
                name="editarClientepotencial"
                component={EditarClientepotencial}
                options={{
                    title: "Editar Cliente",
                }}
        />
        <Stack.Screen
                name="crearProyectopotencial"
                component={CrearProyectopotencial}
                options={{
                    title: "Crear Proyecto",
                }}
        />
        <Stack.Screen
                name="crearVersionProyecto"
                component={CrearVersionProyecto}
                options={{
                    title: "Crear Version Proyecto",
                }}
        />
        <Stack.Screen
                name="listarClientespotencial"
                component={ListarClientespotencial}
                options={{
                    title: "Listar Clientes",
                }}
        />
        <Stack.Screen
                name="listarProyectos"
                component={ListarProyectos}
                options={{
                    title: "Listar Proyectos",
                }}
        />
    </Stack.Navigator>
)
}
