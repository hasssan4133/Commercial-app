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
import { addVisitaclientedesde } from "../api/visitas";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//Importamos geolocalizacion
import Geolocation from 'react-native-geolocation-service';
//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function Guardarvisitadesde(props) {
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
    const { auth } = useAuth();
    const id_proyecto = params.id_proyecto;
    const id_visita_origen = params.idAddress;
    console.log("AEL ID PROYECTO ES "+params.id_proyecto+" y el id visita es "+params.idAddress);
    //Guardamos el presupuesto al pulsar guardar
        const formik = useFormik({
            initialValues: initialValues(),
            validationSchema: Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                    Toast.show("Guardado Correctamente", {
                        position: Toast.positions.CENTER,
                    })
              //formData.append('Imagen', { Imagen: imagenBase });
                setLoading(true);
                try {
                    //Aqui llamamos a la función que guarda pasandole los datos del usuario y los del form.
                    const response = await addVisitaclientedesde(auth, formData, id_proyecto, id_visita_origen);
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
                    <Text style={styles.title}>Crear Visita desde anterior</Text>
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
        resumen: "",
        accion: "",
        fechaaccion: "",
    };
}
function validationSchema() {
    return{
        resumen: Yup.string().required(true),
        accion: Yup.string().required(true),
        fechaaccion: Yup.string().required(true),
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
