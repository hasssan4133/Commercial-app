import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Picker, Field, Image  } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";
import { formStyles } from "../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { addAddressesApi, getAddressesApi } from "../api/address";
//Importamos el componente que gestionará las fotos
import DocumentPicker from 'react-native-document-picker';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { addProyecto } from "../api/clientes";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//Importamos geolocalizacion
import Geolocation from 'react-native-geolocation-service';
//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function CrearProyecto(props) {
    //Debajo definimos cuando recibimos una id por props que es para editar.
    const { route: { params } } = props;
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    //Constante que define el checkbox si está marcado.
    const [dataSource, setDataSource] = useState([]);
    const [dataSourceclientes, setDataSourceclientes] = useState([]);
    const [datosModelos, setDatosmodelos] = useState([]);
    const [selectModelos, setSelectmodelos] = useState(0);
    //Localizaciones
     const [location, setLocation] = useState(false);

        //Abajo definimos que si recibimos los parametros lo rellene.
              useEffect(() => {
              ( async () => {
                  //Si el idAdress existe dentro de params (Eso hace la interrogacion)
                  if(params?.idAddress){
                      const response = await getAddressesApi(auth, params.idAddress);
                      console.log(response);
                  }
              })()
              //Debajo definimos cuando se ejecuta este useeffect (En este caso cuando recibe el valor de params)
              },[params])
        //Hasta aqui
    const { auth } = useAuth();

    //Guardamos el presupuesto al pulsar guardar
        const formik = useFormik({
            initialValues: initialValues(),
            validationSchema: Yup.object(validationSchema()),

            onSubmit: async (formData) => {
              //formData.append('Imagen', { Imagen: imagenBase });
                setLoading(true);
                try {
                    //Aqui llamamos a la función que guarda pasandole los datos del usuario y los del form.
                    const response = await addProyecto(auth, formData);
                    //Este código hace que cuando esto se cumple vuelve a la página anterior
                    //Aqui mostrariamos un Toas
                  //  console.log("LA RESPUESTA ES "+response['statusCode']);
                    if(response['statusCode'] == 404){
                        Toast.show("No se guardó.", {
                            position: Toast.positions.CENTER,
                        })
                    }else{
                        Toast.show("Guardado Correctamente", {
                            position: Toast.positions.CENTER,
                        })
                    }

                    setLoading(false);
                } catch (error) {
                    Toast.show("Guardado Correctamente.", {
                        position: Toast.positions.CENTER,
                    })
                    setLoading(false);
                }

            }
        });
    //Hasta aquí código que guarda el presupuesto al pulsar guardar
    // Importamos las marcas:
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
        //Hasta aquí la importación de marcas
    //Vamos a probar a subir las imagens
    return(
        <KeyboardAwareScrollView extraScrollHeight={25} style={{ margin: 30 }}>
            <View style={styles.container}>
                    <Text style={styles.title}>Crear Proyecto</Text>
            </View>
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                  onValueChange={(text) => { formik.setFieldValue("cliente", text); setSelectmodelos(text); } }
                >
                     <Picker.Item label="Seleccione Cliente" value="0" />
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
            <TextInput
                label="Nombre del proyecto"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("nombre", text)}
                value={formik.values.nombre}
                error={formik.errors.nombre}
            />
            <TextInput
                label="Número de Plano"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("numero_plano", text)}
                value={formik.values.numero_plano}
                error={formik.errors.numero_plano}
            />
            <TextInput
                label="Nº de presupuesto"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("numero_presupuesto", text)}
                value={formik.values.numero_presupuesto}
                error={formik.errors.numero_presupuesto}
            />
            <TextInput
                label="Descripción"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("descripcion", text)}
                value={formik.values.descripcion}
                error={formik.errors.descripcion}
            />
            <Button
                mode="contained"
                style={[formStyles.btnSuces, styles.btnSuces2]}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Guardar Proyecto
            </Button>
        </KeyboardAwareScrollView>

    )
}

function initialValues() {
    return{
        cliente: "",
        nombre: "",
        descripcion: "",
        numero_presupuesto: "",
        numero_plano: "",
    };
}
function validationSchema() {
    return{
        cliente: Yup.string().required(true),
        nombre: Yup.string().required(true),
        descripcion: Yup.string().required(true),
        numero_presupuesto: Yup.string().required(false),
        numero_plano: Yup.string().required(false),
    }
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    despla: {
      marginTop: 30,
    },
    screen: {
      flex: 1,
      backgroundColor: '#f2f2fC',
    },
      container22: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",

    },
    title: {
          fontSize: 20,
          paddingVertical: 20,
          paddingHorizontal: 60,
    },
    btnSuces2: {
          marginBottom: 20,
          marginTop: 16,
    },
    mainBody: {
          flex: 1,
          justifyContent: 'center',
          padding: 20,
    },
    buttonStyle: {
      backgroundColor: '#307ecc',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#307ecc',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    textStyle: {
      backgroundColor: '#fff',
      fontSize: 15,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      textAlign: 'center',
    },
})
