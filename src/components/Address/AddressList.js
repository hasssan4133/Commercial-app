import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
//Función para crear un bucle para listar todas las direcciones
import { map } from "lodash";
import { deleteAddressesApi } from "../../api/address";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";

export default function AddressList(props){
  console.log(props);
    const { addresses, setreloadAddress } = props;
    //Definimos navigation para nevagar a otras páginas. Importado de react navigation.
    const navigation = useNavigation();

    const { auth } = useAuth();
    //Creamos una alerta para que confirmen la acción. En caso de confirmarla, se ejecuta la función que elimina la dirección
    const deleteAddressesAlert = (address) => {
            Alert.alert(
                "Eliminado Dirección",
                `¿Estas seguro de que quieres eliminar la dirección ${address.title}? `,
                [
                    {
                        text: "No"
                    },
                    {
                        text: "Si",
                        onPress: () => deleteAddress(address._id),
                    }
                ],
                { cancelable: false }
            );
    };
    //Definimos la función que llama a la función que comunica con la BD y borra
    const deleteAddress = async (idAddress) => {
        try {
            await deleteAddressesApi(auth, idAddress);
            //Llamamos a esa función que recibimos por props desde addresses.js y que actualiza el listado
            setreloadAddress(true);
        } catch (error){
            console.log(error)
        }
    };

    const goToUpdateAddress = (idAddress) => {
        //Si esta función se ejecuta, llama a navegación para ir a esa página parandole ese parametro. Asi se
        //Pasan los parámetros (No se pueden apsar objetos ni funciones)
                navigation.navigate("add-address", { idAddress });
    }

    return(
        <View style={styles.container}>
            {map(addresses.address, (address) => (
                    //Esto es el bucle. La key de debajo define el ID de la linea que se está ejecutando
                    <View key={address.id} style={styles.address}>
                        <Text style={styles.title}>{address.title}</Text>
                        <Text >{address.name_lastname}</Text>
                        <Text >{address.address}</Text>
                        <View style={styles.blocklinea}>
                            <Text >{address.postal_code}, </Text>
                            <Text >{address.city}, </Text>
                            <Text >{address.state} </Text>
                        </View>
                        <Text >{address.country}</Text>
                        <Text >Número de Teléfono: {address.phone}</Text>
                        <View style={styles.actions}>
                            <Button mode="contained" color={colors.primary}  onPress={() => goToUpdateAddress(address._id)}> Editar </Button>
                        </View>
                    </View>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
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
