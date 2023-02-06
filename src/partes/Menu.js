import React from "react";
import { StyleSheet, Alert } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

export default function Menu(){
    const navigation = useNavigation();
    const { logout } = useAuth();

    return(
     <>
        <List.Section>
            <List.Subheader>Clientes</List.Subheader>
            <List.Item
                title="Crear"
                description="Crear Cliente"
                left={(props) => <List.Icon {...props} icon="account-plus-outline" />}
                onPress={() => navigation.navigate("crearCliente")}
            />
            <List.Item
                title="Crear Proyecto"
                description="Crear Proyecto"
                left={(props) => <List.Icon {...props} icon="archive" />}
                onPress={() => navigation.navigate("crearProyecto")}
            />
            <List.Item
                title="Listar Clientes"
                description="Listado de clientes"
                left={(props) => <List.Icon {...props} icon="account" />}
                onPress={() => navigation.navigate("listarClientes")}
            />
            <List.Item
                title="Listar Proyectos"
                description="Listado de proyectos"
                left={(props) => <List.Icon {...props} icon="laptop" />}
                onPress={() => navigation.navigate("listarProyectos")}
            />
            <List.Item
                title="Listar visitas"
                description="Listado de visitas"
                left={(props) => <List.Icon {...props} icon="human" />}
                onPress={() => navigation.navigate("partesvalaceptadas")}
            />


        </List.Section>


    </>
    )
}

const styles = StyleSheet.create({});
