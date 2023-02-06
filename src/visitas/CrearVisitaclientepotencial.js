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
import { addVisitaclientepotencial } from "../api/visitas";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//Importamos geolocalizacion
import Geolocation from 'react-native-geolocation-service';
//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function CrearVisitaclientepotencial(props) {
    //Debajo definimos cuando recibimos una id por props que es para editar.
    const { route: { params } } = props;
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

    //Constante que define el checkbox si está marcado.
    const [checkedint, setCheckedint] = React.useState(false);
    const [checkediam, setCheckediam] = React.useState(false);
    const [checkedoem, setCheckedoem] = React.useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [dataSourceclientes, setDataSourceclientes] = useState([]);
    const [datosModelos, setDatosmodelos] = useState([]);
    const [selectModelos, setSelectmodelos] = useState(0);
    //Localizaciones
     const [location, setLocation] = useState(false);
     const getLocation = () => {
    const result = requestLocationPermission();

    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

    //Selector de fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };

      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
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
                      tipo: 1,
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
                    tipo: 1,
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
                    const response = await addVisitaclientepotencial(auth, formData);
                    //Este código hace que cuando esto se cumple vuelve a la página anterior
                    //console.log(response)
                    //Aqui mostrariamos un Toas
                    Toast.show("Guardado Correctamente", {
                        position: Toast.positions.CENTER,
                    })
                    setLoading(false);
                } catch (error) {
                    Toast.show("Error al Guardar la solicitud.", {
                        position: Toast.positions.CENTER,
                    })
                    setLoading(false);
                }

            }
        });
    //Hasta aquí código que guarda el presupuesto al pulsar guardar
    //Vamos a probar a subir las imagens
    return(
        <KeyboardAwareScrollView extraScrollHeight={25} style={{ margin: 30 }}>
            <View style={styles.container}>
                    <Text style={styles.title}>Crear Visita </Text>
            </View>
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                  onValueChange={(text) => { formik.setFieldValue("cliente", text); setSelectmodelos(text); } }
                >
                     <Picker.Item label="Seleccione Cliente para la visita" value="0" />
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
                  onValueChange={(text) => { formik.setFieldValue("origen_visita", text); } }
                >
                     <Picker.Item label="Seleccione origen de la visita" value="0" />
                        <Picker.Item
                          color='black'
                          label={"Encontrada"}
                          value={1}
                        />
                        <Picker.Item
                          color='black'
                          label={"Buscada"}
                          value={2}
                        />
                        <Picker.Item
                          color='black'
                          label={"Cortesia"}
                          value={3}
                        />
                    </Picker>
            </View>
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                    onValueChange={(text) => formik.setFieldValue("proyecto", text)}
                >
                    <Picker.Item
                        label="Sin proyecto"
                        value="0"
                    />
                    { datosModelos.map((item, key)=>(
                              <Picker.Item  color='black' label={item.nombre} value={item.id} key={key} />)
                    )}
                </Picker>
            </View>
            <TextInput
                label="Resumen"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("resumen", text)}
                value={formik.values.bastidor}
                error={formik.errors.bastidor}
            />
            <TextInput
                label="Acción"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("accion", text)}
                value={formik.values.color}
                error={formik.errors.color}
            />
            <Text>Fecha de Acción:</Text>
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, color: '#000000' }}>
                <Button title="Fecha de Acción" style={{ color: '#000000', }} onPress={showDatePicker}>Seleccione Fecha </Button>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(text) => formik.setFieldValue("fechaaccion", text)}
                    onCancel={hideDatePicker}
                    value={formik.values.fecharecogida}
                />
            </View>



            <Button
                mode="contained"
                style={[formStyles.btnSuces, styles.btnSuces2]}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Guardar Visita
            </Button>
        </KeyboardAwareScrollView>

    )
}

function initialValues() {
    return{
        cliente: "",
        proyecto: 0,
        resumen: "",
        accion: "",
        fechaaccion: "",
        origen_visita: "",
    };
}
function validationSchema() {
    return{
        cliente: Yup.string().required(true),
        resumen: Yup.string().required(true),
        accion: Yup.string().required(true),
        fechaaccion: Yup.string().required(true),
        origen_visita: Yup.string().required(true),
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
