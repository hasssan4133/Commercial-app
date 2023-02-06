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
import { TextInput, Button, Checkbox, IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getClientes } from "../api/clientes_potenciales";
import { getClientesfiltro } from "../api/clientes";
import useAuth from "../hooks/useAuth";
import size from "lodash";
import * as Yup from "yup";
//Importamos para tratar las imagenes
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerModal } from '../components22/image-picker-modal';
import { formStyles } from "../styles";
import { useFormik } from "formik";
//Función para crear un bucle para listar todas las direcciones
import { map } from "lodash";
import colors from "../styles/colors";
import Toast from "react-native-root-toast";
export default function ListarClientes(props){
    //useestate para definir el filtro
    const [selectFiltro, setSelectFiltro] = useState(0);
    const [partes, setPartes] = useState(null);
    //Debajo definimos ese estado para acctualizar el listado al eliminar.
    const [reloadPartes, setreloadPartes] = useState(false);
    const { auth } = useAuth();
    useFocusEffect(
        useCallback(
            () => {
                setPartes(null);
                (async() => {
                    const response = await getClientes(auth.token);
                    setPartes(response);
                    setreloadPartes(false);
                })();
            }, [reloadPartes],
        )
    )
    const [idParte, setidParte] = useState(0);
    //console.log("Los props son: "+addresses);
    //Definimos navigation para nevagar a otras páginas. Importado de react navigation.
    const navigation = useNavigation();
    //Para filtrar
    const [loading, setLoading] = useState(false);
   //Filtramos los clientes
      const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: Yup.object(validationSchema()),

          onSubmit: async (formData) => {
            //formData.append('Imagen', { Imagen: imagenBase });
              setLoading(true);
              try {
                  //Aqui llamamos a la función que guarda pasandole los datos del usuario y los del form.
                  const response = await getClientesfiltro(auth, formData);

                  setPartes(response);
                  setreloadPartes(false);
                  setLoading(false);
              } catch (error) {
                  Toast.show("Error al Guardar la solicitud.", {
                      position: Toast.positions.CENTER,
                  })
                  setLoading(false);
              }

          }
      });
    //Hasta aquí código que filtra clientes
    const goToUpdateAddress = (idAddress) => {
        //Si esta función se ejecuta, llama a navegación para ir a esa página parandole ese parametro. Asi se
        //Pasan los parámetros (No se pueden apsar objetos ni funciones)
                navigation.navigate("editarClientepotencial", { idAddress });
    }
    //Hacemos que al pulsar en mandar whatsapp se mande el whatsapp
        //Usamos un useEstate para que solo al pulsar se carga
        const [abrirURL, setAbrirurl] = useState(0);
        const URLFactura = "https://wa.me/";
        const handlePress = async (idFact) => {
            if (abrirURL !== '0') {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                Linking.openURL(URLFactura+idFact);
                console.log(URLFactura+idFact);
            }
        }
    const addresses = partes;
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.tittle}>Listar Clientes Potenciales</Text>
            <TextInput
                label="Busqueda"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("busqueda", text)}
                value={formik.values.color}
                error={formik.errors.color}
            />
            <Button
                mode="contained"
                style={[formStyles.btnSuces, styles.btnSuces2]}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Filtrar
            </Button>

            {!partes ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : size(partes) == 0 ? (
                <Text style={styles.noAddressText}>Crea tu primer cliente</Text>
            ) : (
                //Añadimos el listado de direcciones importado arriba
        <View style={styles.container}>

            {map(addresses.address, (address) => (
                    //Esto es el bucle. La key de debajo define el ID de la linea que se está ejecutando
                    <View key={address.id} style={styles.address}>
                        <Text style={styles.title}>{address.matricula}</Text>
                        <Text>Cliente:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.nombre}</Text>
                        </View>
                        <Text>Población:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.poblacion}</Text>
                        </View>
                        <Text>Teléfono:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.telefono}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button
                                mode="contained"
                                color={colors.primary}
                                setidParte={(address.id)}
                                idParte={address.id}
                                onPress={(text) => goToUpdateAddress(address.id)}
                            >Editar Cliente
                            </Button>
                          </View>
                          <View style={styles.actions}>
                            <Button
                                mode="contained"
                                color={colors.primary}
                                setidParte={(address.id)}
                                idParte={address.id}
                                onPress={(text) => { handlePress(address.telefono); setAbrirurl(address.telefono); } }
                            >Mandar WhatsApp
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
    actions2: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
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
function initialValues() {
    return{
        busqueda: "",
    };
}
function validationSchema() {
    return{
        busqueda: Yup.string().required(false),
    }
}
