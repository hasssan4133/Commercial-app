import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import Partes from "./Partes";
import CrearCliente from "./CrearCliente";
import EditarCliente from "./EditarCliente";
import CrearProyecto from "./CrearProyecto";
import CrearVersionProyecto from "./CrearVersionProyecto";
import ListarClientes from "./ListarClientes";
import ListarProyectos from "./ListarProyectos";
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
                component={Partes}
                options={{title: "Listado", headerShown: false}}
        />

        <Stack.Screen
                name="crearCliente"
                component={CrearCliente}
                options={{
                    title: "Crear Cliente",
                }}
        />
        <Stack.Screen
                name="editarCliente"
                component={EditarCliente}
                options={{
                    title: "Editar Cliente",
                }}
        />
        <Stack.Screen
                name="crearProyecto"
                component={CrearProyecto}
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
                name="listarClientes"
                component={ListarClientes}
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
