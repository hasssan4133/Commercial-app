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
import { getProyectos } from "../api/clientes";
import { getProyectosfiltro } from "../api/clientes";
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
export default function ListarProyectos(props){
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
                    const response = await getProyectos(auth.token);
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
   //Filtramos los proyectos
      const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: Yup.object(validationSchema()),

          onSubmit: async (formData) => {
            //formData.append('Imagen', { Imagen: imagenBase });
              setLoading(true);
              try {
                  //Aqui llamamos a la función que guarda pasandole los datos del usuario y los del form.
                  const response = await getProyectosfiltro(auth, formData);

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
    //Para ir a crear proyecto 
    const goTocrearProyecto = () => {
            navigation.navigate("crearProyecto");
    }
   const goTocrearversionProyecto = (idAddress) => {
            navigation.navigate("crearVersionProyecto", { idAddress });
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
            <Text style={styles.tittle}>Listar Proyectos</Text>
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
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Button
                mode="contained"
                style={[formStyles.btnSuces, styles.btnSuces2]}
                 onPress={(text) => goTocrearProyecto()}
                loading={loading}
            >
                Crear Proyecto
            </Button>
            <Text></Text>

            {!partes ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : size(partes) == 0 ? (
                <Text style={styles.noAddressText}>Crea tu primer proyecto</Text>
            ) : (
        <View style={styles.container}>

            {map(addresses.address, (address) => (
                    //Esto es el bucle. La key de debajo define el ID de la linea que se está ejecutando
                    <View key={address.id} style={styles.address}>
                        <Text style={styles.title}>{address.matricula}</Text>
                        <Text>Proyecto:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.nombre}</Text>
                        </View>
                        <Text>Tipo de cliente:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.tipo_cliente}</Text>
                        </View>
                        <Text>Cliente:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.cliente}</Text>
                        </View>

                        <Text>Versión de proyecto:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.version}</Text>  
                        </View>
                        <Text>Cantidad de versiones:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.cantidad_versiones}</Text>
                        </View>
                        <Text>Descripción:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.descripcion}</Text>
                        </View>

                          <View style={styles.actions}>
                            <Button
                                mode="contained"
                                color={colors.primary}
                                setidParte={(address.id)}
                                idParte={address.id}
                               onPress={(text) => goTocrearversionProyecto(address.id)}
                            >Crear versión de proyecto
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
