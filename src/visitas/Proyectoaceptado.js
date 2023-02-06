import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Picker, Field, Image, TouchableOpacity, PermissionsAndroid  } from "react-native";
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
import { saveResultadoaceptado } from "../api/visitas";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
//Importamos geolocalizacion
import * as Location from 'expo-location';
//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function Proyectoaceptado(props) {
    //Debajo definimos cuando recibimos una id por props que es para editar.
    const { route: { params } } = props;
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    //Miramos si lleva proyecto para mostrar aceptado o no 
    const id_proyecto = params.id_proyecto;
    const idAddress = params.idAddress;

    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Acceso a la ubicación",
            message:
              "Necesitamos acceso a la ubicación " +
              "Para guardarla. ",
            buttonNeutral: "Preguntame luego",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
          Location.requestPermissionsAsync();
          let location = await Location.getCurrentPositionAsync({});
          //setLocation(location);
          console.log("LA UBICACIONE S "+JSON.stringify(location));
          console.log("LA altutyd es "+location.coords.latitude+" y la longitud "+location.coords.longitude);
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
   


    //Guardamos el presupuesto al pulsar guardar
        const formik = useFormik({
            initialValues: initialValues(),
            validationSchema: Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                setLoading(true);
                try {
                  Location.requestForegroundPermissionsAsync();
                  const location = await Location.getCurrentPositionAsync({

                  });
                    const response = await saveResultadoaceptado(auth, formData, params.idAddress, location.coords.latitude, location.coords.longitude);
                    Toast.show("Guardado Correctamente.", {
                        position: Toast.positions.CENTER,
                    })
                    navigation.navigate("listarvisitasptes", { idAddress });
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

    return(
        <KeyboardAwareScrollView extraScrollHeight={25} style={{ margin: 30 }}>
            <View style={styles.container}>
                    <Text style={styles.title}>Proyecto Aceptado</Text>
            </View>
            <TextInput
                label="Resultado"
                style={formStyles.input}

                onChangeText={(text) => formik.setFieldValue("resultado", text)}
                value={formik.values.resultado}
                error={formik.errors.resultado}
            />
            <Text></Text>
            <Button
                mode="contained"
                style={[formStyles.btnSuces, styles.btnSuces2]}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Guardar resultado
            </Button>
        </KeyboardAwareScrollView>

    )
}

function initialValues() {
    return{
        motivo: "",
    };
}
function validationSchema() {
    return{

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
