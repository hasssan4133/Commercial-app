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
            <List.Subheader>Visitas</List.Subheader>
            <List.Item
                title="Crear Visita a cliente"
                description="Crear una visita a un cliente"
                left={(props) => <List.Icon {...props} icon="account-plus-outline" />}
                onPress={() => navigation.navigate("crearvisitacliente")}
            />
            <List.Item
                title="Crear Visita a cliente potencial"
                description="Crear una visita a un cliente potencial"
                left={(props) => <List.Icon {...props} icon="account-plus-outline" />}
                onPress={() => navigation.navigate("crearvisitaclientepotencial")}
            />
            <List.Item
                title="Listas Visitas Pendientes"
                description="Listado visitas pendientes de hacer"
                left={(props) => <List.Icon {...props} icon="human" />}
                onPress={() => navigation.navigate("listarvisitasptes")}
            />
            <List.Item
                title="Listas Visitas Hechas"
                description="Listado visitas pendientes de hacer"
                left={(props) => <List.Icon {...props} icon="account-heart" />}
                onPress={() => navigation.navigate("ListarVisitashechas")}
            />
            <List.Item
                title="Listado de todas las visitas"
                description="Listado de todas las visitas"
                left={(props) => <List.Icon {...props} icon="account" />}
                onPress={() => navigation.navigate("ListarVisitas")}
            />

        </List.Section>
    </>
    )
}

const styles = StyleSheet.create({});
