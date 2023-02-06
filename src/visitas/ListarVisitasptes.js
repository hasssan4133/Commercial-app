import React, { useCallback, useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Picker,
} from "react-native";
import { TextInput, Button, Checkbox, IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getVisitasptes } from "../api/visitas";
import useAuth from "../hooks/useAuth";
import size from "lodash";
//Importamos para tratar las imagenes
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerModal } from '../components22/image-picker-modal';
import { formStyles } from "../styles";
import { useFormik } from "formik";

//Función para crear un bucle para listar todas las direcciones
import { map } from "lodash";
import { deleteAddressesApi } from "../api/address";
import colors from "../styles/colors";
import Toast from "react-native-root-toast";
import { getVisitasptesfiltro } from "../api/visitas";
import * as Yup from "yup";
export default function ListarVisitasptes(props){
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
                    const response = await getVisitasptes(auth.token);
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
    //console.log("Los props son: "+addresses);
    //Definimos navigation para nevagar a otras páginas. Importado de react navigation.
    const navigation = useNavigation();
    //Para filtrar
    const [loading, setLoading] = useState(false);


    const visitaRealizada = (idAddress, id_proyecto) => {
        
        //Si esta función se ejecuta, llama a navegación para ir a esa página parandole ese parametro. Asi se
        //Pasan los parámetros (No se pueden apsar objetos ni funciones)
                navigation.navigate("VisitaRealizada", { idAddress, id_proyecto });
    }
    const [dataSourceclientes, setDataSourceclientes] = useState([]);
    const [datosModelos, setDatosmodelos] = useState([]);
    const [selectClientes, setSelectclientes] = useState(0);
    // Importamos los clientes:
            useEffect(() => {

                fetch('https://asigrancomercial.tges.es/api_movil/data_clientes.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({
                    token: auth.token,
                }),
                })
                .then(response => response.json())
                .then(responseJson => {
                    setDataSourceclientes(responseJson);
                })

                .catch(error => {
                    console.error(error);
                });
              }, []);
        //Hasta aquí la importación de clientes
        const [selectModelos, setSelectmodelos] = useState(0);
        //Seleccionamos los clientes cuando seleccionamos el tipo
        useEffect(() => {
            if (selectClientes !== 0) {
                fetch('https://asigrancomercial.tges.es/api_movil/data_clientes.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify({
                      token: auth.token,
                      tipo_cliente: selectClientes,
                    }),

                  })

                    .then(response => response.json())
                    .then(responseJson => {
                      setDataSourceclientes(responseJson);
                    })
                    .catch(error => {
                      console.error(error);
                    });

            }
          }, [selectClientes]);
        //Hasta aqui el select de modelos
        //Seleccionamos los modelos cuando seleccionamos la marca
        useEffect(() => {
            if (selectModelos !== 0) {
                fetch('https://asigrancomercial.tges.es/api_movil/listar_proyectos.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify({
                      token: auth.token,
                      id_marca: selectModelos,
                      tipo: 2,
                    }),

                  })

                    .then(response => response.json())
                    .then(responseJson => {
                      setDatosmodelos(responseJson);
                    })
                    .catch(error => {
                      console.error(error);
                    });

            }
          }, [selectModelos]);
        //Hasta aqui el select de modelos
        //Importamos los modelos cuando el selector de marca está vacio
            useEffect(() => {
                fetch('https://asigrancomercial.tges.es/api_movil/listar_proyectos.php', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                  },
                  body: JSON.stringify({
                    token: auth.token,
                    id_marca: selectModelos,
                    tipo: 2,
                  }),
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    setDatosmodelos(responseJson);
                  })
                  .catch(error => {
                    console.error(error);
                  });
              }, []);
        //Hasta aquí al importación de modelos
        //Filtramos las visitas
           const formik = useFormik({
               initialValues: initialValues(),
               validationSchema: Yup.object(validationSchema()),

               onSubmit: async (formData) => {
                 //formData.append('Imagen', { Imagen: imagenBase });
                   setLoading(true);
                   try {
                       //Aqui llamamos a la función que guarda pasandole los datos del usuario y los del form.
                       const response = await getVisitasptesfiltro(auth, formData);
                       console.log("ENTRA AQUI ");
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
         //Hasta aquí código que filtra
    const addresses = partes;
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.tittle}>Listar visitas pendientes de realizar</Text>
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                  onValueChange={(text) => { formik.setFieldValue("tipo_cliente", text); setSelectclientes(text); } }
                >
                     <Picker.Item label="Seleccione tipo de cliente para filtrar"  />
                        <Picker.Item
                          color='black'
                          label="Cliente potencial"
                          value="1"
                          key="1"
                        />
                        <Picker.Item
                          color='black'
                          label="Cliente"
                          value="2"
                          key="2"
                        />

                </Picker>
            </View>
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                  onValueChange={(text) => { formik.setFieldValue("cliente", text); setSelectmodelos(text); } }
                >
                     <Picker.Item label="Seleccione Cliente para filtrar" value="0" />
                    { dataSourceclientes.map((item, key)=>(
                        <Picker.Item
                          color='black'
                          label={item.nombre}
                          value={item.id}
                          key={key}
                        />)

                      )}
                </Picker>
            </View>
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                    onValueChange={(text) => formik.setFieldValue("proyecto", text)}
                >
                    <Picker.Item
                        label="Seleccione Proyecto para filtrar"
                        value="0"
                    />
                    { datosModelos.map((item, key)=>(
                              <Picker.Item  color='black' label={item.nombre} value={item.id} key={key} />)
                    )}
                </Picker>
            </View>
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
                <Text style={styles.noAddressText}>Crea tu primera Visita</Text>
            ) : (
                //Añadimos el listado de direcciones importado arriba
        <View style={styles.container}>

            {map(addresses.address, (address) => (
                    //Esto es el bucle. La key de debajo define el ID de la linea que se está ejecutando
                    <View key={address.id} style={styles.address}>
                        <Text style={styles.title}>{address.matricula}</Text>
                        <Text>Fecha:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.fecha}</Text>
                        </View>
                        <Text>Cliente:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.nombrecliente}</Text>
                        </View>
                        <Text>Proyecto:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.nombreproyecto}</Text>
                        </View>
                        <Text>Descripción:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.resumen}</Text>
                        </View>

                        <View style={styles.actions}>
                            <Button
                                mode="contained"
                                color={colors.primary}
                                setidParte={(address.id)}
                                idParte={address.id}

                                onPress={() => { visitaRealizada(address.id, address.id_proyecto) }}
                            >Visita Realizada
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
function initialValues() {
    return{
        busqueda: "",
        cliente: "",
        proyecto: "",
        tipo_cliente: "",
    };
}
function validationSchema() {
    return{
        busqueda: Yup.string().required(false),
        cliente: Yup.string().required(false),
        proyecto: Yup.string().required(false),
        tipo_cliente: Yup.string().required(false),
    }
}
