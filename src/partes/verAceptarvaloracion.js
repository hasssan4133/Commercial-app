import React, { useCallback, useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getValoracionesPendientesAceptarapi } from "../api/partes";
import useAuth from "../hooks/useAuth";
import size from "lodash";
import { Button } from "react-native-paper";
//Función para crear un bucle para listar todas las direcciones
import { map } from "lodash";
import colors from "../styles/colors";
import { Alert } from "react-native";
//Importamos para tratar las imagenes
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerModal } from '../components22/image-picker-modal';


export default function VerAceptarvaloracion(props){
    const [partes, setPartes] = useState(null);
    //Debajo definimos ese estado para acctualizar el listado de direcciones al eliminar.
    const [reloadPartes, setreloadPartes] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();
    const {route: { params }}   = props;
    console.log("Recibido: "+params.idAddress);
    useFocusEffect(
        useCallback(
            () => {
                setPartes(null);
                (async() => {
                    const response = await getValoracionesPendientesAceptarapi(auth.token,params.idAddress);
                    console.log("Los props son: "+response);
                    setPartes(response);
                    setreloadPartes(false);
                })();
            }, [reloadPartes],
        )
    )
    //Aqui nos traemos lo que antes estaba excluido
    //Declaramos variable que antes se pasaba por props
    const addresses = partes;
       //Creamos una alerta para que confirmen la acción. En caso de confirmarla, se ejecuta la función que elimina la dirección
       const deleteAddressesAlert = (address) => {
        Alert.alert(
            "Rechazar Valoración",
            `¿Estas seguro de que quieres rechazar la valoración del ${address.marca} ${address.modelo} con matrícula ${address.matricula}? `,
            [
                {
                    text: "No"
                },
                {
                    text: "Si",
                    onPress: () => rechazaValora(address.id),
                }
            ],
            { cancelable: false }
        );
    };
    //Definimos la función que llama a la función que comunica con la BD y borra
    const rechazaValora = async (idAddress) => {
            navigation.navigate("rechaza-valoracion", { idAddress });
            //Llamamos a esa función que recibimos por props desde addresses.js y que actualiza el listado
            //setreloadAddress(true);
    };

    const aceptarValoracion = (idAddress) => {
        //Si esta función se ejecuta, llama a navegación para ir a esa página parandole ese parametro. Asi se
        //Pasan los parámetros (No se pueden apsar objetos ni funciones)
                navigation.navigate("acepta-valoracion", { idAddress });
    }
    const veraceptarValoracion = (idAddress) => {
        //Si esta función se ejecuta, llama a navegación para ir a esa página parandole ese parametro. Asi se
        //Pasan los parámetros (No se pueden apsar objetos ni funciones)
                navigation.navigate("veracepta-valoracion", { idAddress });
    }
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.tittle}>Valoraciones del trabajo</Text>

            {!partes ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : size(partes) == 0 ? (
                <Text style={styles.noAddressText}>Crea tu primer Parte</Text>
            ) : (
                //Añadimos el listado de direcciones importado arriba
                <View style={styles.container}>
            {map(addresses.address, (address) => (
                    //Esto es el bucle. La key de debajo define el ID de la linea que se está ejecutando
                    <View key={address.id} style={styles.address}>
                        <Text style={styles.title}>{address.tipo}</Text>
                        <Text style={{padding:5}}>Importe de la valoración:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text>{address.importe_total} €</Text>
                        </View>
                        <Text style={{padding:5}}>Observaciones de la valoración:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text>{address.observaciones}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button mode="contained" color={colors.primary}  onPress={() => aceptarValoracion(address.id)}> Aceptar </Button>
                            <Button mode="contained" color={colors.danger}  onPress={() => deleteAddressesAlert(address.id)}> Rechazar </Button>
                        </View>
                    </View>
            ))}
        </View>

            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    tittle: {
        fontSize: 20,
    },
    addAddressText: {
        fontSize: 16,
    },
    noAddressText: {
        fontSize: 16,
        marginTop: 10,
        textAlign: "center",
    },
    addAddress: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    loading: {
        marginTop: 20,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5,
    },
    blocklinea: {
        flexDirection: "row",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
})
