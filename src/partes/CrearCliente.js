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
import { getDatoscliente } from "../api/clientes";
//Importamos el componente que gestionará las fotos
import DocumentPicker from 'react-native-document-picker';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { addCliente } from "../api/clientes";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//Importamos geolocalizacion
import Geolocation from 'react-native-geolocation-service';
//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function CrearCliente(props) {
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
        //Abajo definimos que si recibimos los parametros lo rellene.
              useEffect(() => {
              ( async () => {
                  //Si el idAdress existe dentro de params (Eso hace la interrogacion)
                  if(params?.idAddress){
                      const response = await getDatoscliente(auth, params.idAddress);
                      console.log(" la respuesta de editar cliente es "+response);
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
                    const response = await addCliente(auth, formData);
                    //Este código hace que cuando esto se cumple vuelve a la página anterior
                    //Aqui mostrariamos un Toas
                  //  console.log("LA RESPUESTA ES "+response['statusCode']);
                    if(response['statusCode'] == 404){
                        Toast.show("No se guardó porque el cliente ya existe.", {
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
    //Vamos a probar a subir las imagens
    return(
        <KeyboardAwareScrollView extraScrollHeight={25} style={{ margin: 30 }}>
            <View style={styles.container}>
                    <Text style={styles.title}>Crear Cliente</Text>
            </View>
            <TextInput
                label="CIF"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("cif", text)}
                value={formik.values.cif}
                error={formik.errors.cif}
            />
            <TextInput
                label="Nombre"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("nombre", text)}
                value={formik.values.nombre}
                error={formik.errors.nombre}
            />
            <TextInput
                label="Código Postal"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("cp", text)}
                value={formik.values.cp}
                error={formik.errors.cp}
            />
            <TextInput
                label="Dirección"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("direccion", text)}
                value={formik.values.direccion}
                error={formik.errors.direccion}
            />
            <TextInput
                label="Población"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("poblacion", text)}
                value={formik.values.poblacion}
                error={formik.errors.poblacion}
            />
            <TextInput
                label="Provincia"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("provincia", text)}
                value={formik.values.provincia}
                error={formik.errors.provincia}
            />
            <TextInput
                label="Teléfono"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("telefono", text)}
                value={formik.values.telefono}
                error={formik.errors.telefono}
            />
            <TextInput
                label="Email"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                  onValueChange={(text) => { formik.setFieldValue("pais", text); } }
                >
                     <Picker.Item label="Seleccione Pais del Cliente" value="0" />
                        <Picker.Item
                          color='black'
                          label={"España"}
                          value={34}
                        />
                        <Picker.Item
                          color='black'
                          label={"Francia"}
                          value={33}
                        />
                        <Picker.Item
                          color='black'
                          label={"Italia"}
                          value={39}
                        />
                        <Picker.Item
                          color='black'
                          label={"Marruecos"}
                          value={212}
                        />
                        <Picker.Item
                          color='black'
                          label={"Portugal"}
                          value={351}
                        />
                    </Picker>
            </View>
            <Button
                mode="contained"
                style={[formStyles.btnSuces, styles.btnSuces2]}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Guardar Cliente
            </Button>
        </KeyboardAwareScrollView>

    )
}

function initialValues() {
    return{
        cif: "",
        nombre: "",
        cp: "",
        direccion: "",
        poblacion: "",
        provincia: "",
        telefono: "",
        email: "",
        pais: "",
    };
}
function validationSchema() {
    return{
        cif: Yup.string().required(true),
        nombre: Yup.string().required(true),
        cp: Yup.string().required(true),
        direccion: Yup.string().required(true),
        poblacion: Yup.string().required(true),
        provincia: Yup.string().required(true),
        telefono: Yup.string().required(true),
        email: Yup.string().required(true),
        pais: Yup.string().required(true),
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
