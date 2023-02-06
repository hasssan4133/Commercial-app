import React, { useCallback, useState } from "react";
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
import { getAddressesApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
//Imporrtamos pantalla de direcciones
import AddressList from "../../components/Address/AddressList";
import size from "lodash";

export default function Addresses(){
    const [addresses, setAddresses] = useState(null);
    //Debajo definimos ese estado para acctualizar el listado de direcciones al eliminar.
    const [reloadAddress, setreloadAddress] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(
            () => {
                setAddresses(null);
                (async() => {
                    const response = await getAddressesApi(auth.token);
                    setAddresses(response);
                    setreloadAddress(false);
                })();
            }, [reloadAddress],
        )
    )

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.tittle}>Mis Direcciones</Text>

            {!addresses ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : size(addresses) == 0 ? (
                <Text style={styles.noAddressText}>Crea tu primera dirección</Text>
            ) : (
                //Añadimos el listado de direcciones importado arriba
                <AddressList
                    addresses={addresses}
                    setreloadAddress={setreloadAddress}
                />
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
})
