import React, { useCallback, useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Picker,
    Linking,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getFacturasapi } from "../api/facturas";
import useAuth from "../hooks/useAuth";
import size from "lodash";
//Importamos para tratar las imagenes
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerModal } from '../components22/image-picker-modal';
import { formStyles } from "../styles";
import { Button } from "react-native-paper";
//Función para crear un bucle para listar todas las direcciones
import { map } from "lodash";
import { deleteAddressesApi } from "../api/address";
import colors from "../styles/colors";
import Toast from "react-native-root-toast";

export default function Facturas() {
      //useestate para definir el filtro
      const [selectFiltro, setSelectFiltro] = useState(0);
      const [partes, setPartes] = useState(null);
      //Debajo definimos ese estado para acctualizar el listado de direcciones al eliminar.
      const [reloadPartes, setreloadPartes] = useState(false);
      const { auth } = useAuth();
      useFocusEffect(
          useCallback(
              () => {
                  setPartes(null);
                  (async() => {
                      const response = await getFacturasapi(auth.token);
                      console.log("El fallo es: "+response);
                      setPartes(response);
                      setreloadPartes(false);
                  })();
              }, [reloadPartes],
          )
      )
      //
      //A partir de aqui nos traemos aqui el listado de partes
      //Definimos las variables que pasábamos por props
      //
      const [idParte, setidParte] = useState(0);
      const navigation = useNavigation();
    const goToUpdateAddress = (idAddress) => {
        //Si esta función se ejecuta, llama a navegación para ir a esa página parandole ese parametro. Asi se
        //Pasan los parámetros (No se pueden apsar objetos ni funciones)
                navigation.navigate("add-address", { idAddress });
    }
    const addresses = partes;
    //Ponemos la url
    //Usamos un useEstate para que solo al pulsar se carga
    const [abrirURL, setAbrirurl] = useState(0);
    const URLFactura = "https://workplace.gregasa.com/pdf/factura_movil.php?num=";
    const sumarAur = "&token=";
    const handlePress = async (idFact) => {
        if (abrirURL !== '0') {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            Linking.openURL(URLFactura+idFact+sumarAur+auth.token);
            console.log(URLFactura+idFact+sumarAur+auth.token);
        }
    }

    return (
        <ScrollView style={styles.container}>
        <Text style={styles.tittle}>Mis Facturas</Text>




        {!partes ? (
            <ActivityIndicator size="large" style={styles.loading} />
        ) : size(partes) == 0 ? (
            <View style={styles.addAddress}>
            <Text style={styles.addAddressText}>Aun no tienes Facturas</Text>
        </View>
        ) : (
            //Añadimos el listado de direcciones importado arriba
    <View style={styles.container}>

        {map(addresses.address, (address) => (
                //Esto es el bucle. La key de debajo define el ID de la linea que se está ejecutando
                <View key={address.id} style={styles.address}>
                    <Text style={styles.title}>{address.matricula}</Text>
                    <Text >{address.marca} {address.modelo}</Text>
                    <View style={styles.blocklinea}>
                        <Text >{addresses.address.cliente} </Text>
                    </View>
                    <Text>Importe:</Text>
                    <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                        <Text >{address.importe_total} €</Text>
                    </View>
                    <View style={styles.actions}>
                        <Button
                            mode="contained"
                            color={colors.primary}
                            setidParte={(address.id)}
                            idParte={address.id}
                            //onPress={handlePress(address.id); setAbrirurl()}
                            onPress={(text) => { handlePress(address.id); setAbrirurl(address.id); } }
                        >Descargar Factura
                        </Button>
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
