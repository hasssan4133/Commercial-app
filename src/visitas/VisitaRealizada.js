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
import { saveResultado } from "../api/visitas";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
//Importamos geolocalizacion
import * as Location from 'expo-location';
//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function VisitaRealizada(props) {
    //Debajo definimos cuando recibimos una id por props que es para editar.
    const { route: { params } } = props;
    const [loading, setLoading] = useState(false);
    const [respro, setRespro] = useState(2);
    const { auth } = useAuth();
    const navigation = useNavigation();

    //Miramos si lleva proyecto para mostrar aceptado o no 
    let button = "";
    const id_proyecto = params.id_proyecto;
    const idAddress = params.idAddress;

   
            const visitaRealizadapaso2 = () => {
                    if(respro == 1){
                                const dondeir = navigation.navigate("Proyectoaceptado", { idAddress, id_proyecto, respro });
                        }else if(respro == 2){
                                const dondeir = navigation.navigate("VisitaRealizadapaso", { idAddress, id_proyecto, respro });
                                 
                        }else if(respro == 0){
                                const dondeir = navigation.navigate("Proyectorechazado", { idAddress, id_proyecto, respro });
                        }
            //Si esta función se ejecuta, llama a navegación para ir a esa página parandole ese parametro. Asi se
            //Pasan los parámetros (No se pueden apsar objetos ni funciones)
                dondeir;
                    
        }
    if(id_proyecto == null){
        button = <Text></Text>;
    }else{
        button =             <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                  onValueChange={(text) => { formik.setFieldValue("proyecto_aceptado", text); setRespro(text)  } }
                >
                     <Picker.Item label="¿el proyecto ha sido aceptado?"  />
                        <Picker.Item
                          color='black'
                          label="En proceso"
                          value="2"
                          key="2"
                        />
                        <Picker.Item
                          color='black'
                          label="Si"
                          value="1"
                          key="1"
                        />
                        <Picker.Item
                          color='black'
                          label="No"
                          value="0"
                          key="0"
                        />

                </Picker>
            </View>;
    }
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
                  //Obtenemos la ubicación para pasarla.
                  // DEprecated -> Location.requestPermissionsAsync();
                  Location.requestForegroundPermissionsAsync();
                  const location = await Location.getCurrentPositionAsync({

                  });
                    //Aqui llamamos a la función que guarda pasandole los datos del usuario y los del form..
                    console.log("LATUTAD "+location.coords.latitude);
                    
                    const response = await saveResultado(auth, formData, params.idAddress, location.coords.latitude, location.coords.longitude);
                    visitaRealizadapaso2(params.idAddress);
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
                    <Text style={styles.title}>Visita Realizada</Text>
            </View>
            <TextInput
                label="Resultado"
                style={formStyles.input}

                onChangeText={(text) => formik.setFieldValue("resultado", text)}
                value={formik.values.nombre_comercial}
                error={formik.errors.nombre}
            />
            <TextInput
                label="Resultado Público (Se enviará a cliente)"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("resultado_publico", text)}
                value={formik.values.cp}
                error={formik.errors.cp}
            />
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                  onValueChange={(text) => { formik.setFieldValue("mail_a_cliente", text);  } }
                >
                     <Picker.Item label="¿Enviar mail a cliente?"  />
                        <Picker.Item
                          color='black'
                          label="Si"
                          value="1"
                          key="1"
                        />
                        <Picker.Item
                          color='black'
                          label="No"
                          value="0"
                          key="0"
                        />

                </Picker>
            </View>
            <Text></Text>
            {button}


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
        resultado: "",
        resultado_publico: "",
        mail_a_cliente: "",
        proyecto_aceptado: "",
    };
}
function validationSchema() {
    return{
        resultado: Yup.string().required(true),
        resultado_publico: Yup.string().required(true),
        mail_a_cliente: Yup.string().required(true),
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
