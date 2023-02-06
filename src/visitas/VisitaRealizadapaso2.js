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
import { saveResultado } from "../api/visitas";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
//Importamos geolocalizacion
import Geolocation from 'react-native-geolocation-service';
//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function VisitaRealizadapaso2(props) {
    //Debajo definimos cuando recibimos una id por props que es para editar.
    const { route: { params } } = props;
    const [loading, setLoading] = useState(false);
    const [dondeir, setDondeir] = useState(0);
    const { auth } = useAuth();
    const navigation = useNavigation();
    //    console.log(params);
    //console.log("LOS PARAMETROS SON "+params.idAdress);
    const id_proyecto = params.id_proyecto;
    const idAddress = params.idAddress;
    //const respro = params.respro;
    //console.log("EL FORMDAT ES "+respro);
    //Vale, recibimos si el proyecto ha sido aceptado, sigue en curso o ha sido rechazado. En función de eso mostraremos la pregunta de si mostrar nueva visita o que grabe el motivo del resultado exito o fracaso 
        const formik = useFormik({
            initialValues: initialValues(),
            onSubmit: async (formData) => {
                setLoading(true);
                try {
            if(dondeir == 1){
                    navigation.navigate("Guardarvisitadesde", { idAddress,id_proyecto  });
            }else{
                    navigation.navigate("listarvisitasptes");
            }
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
        <KeyboardAwareScrollView extraScrollHeight={25} style={{ margin: 5 }}>
               <View style={styles.container}>
                    <Text style={styles.title}>La visita se guardó correctamente, ¿Desea programar otra visita al cliente?</Text>
            </View>
            <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                <Picker
                  onValueChange={(text) => { formik.setFieldValue("nueva_visita", text);setDondeir(text)    } }
                >
                     <Picker.Item label="¿Programar nueva visita?"  />
                        <Picker.Item
                          color='black'
                          label="Si"
                          value="1"
                          key="1"
                        />
                        <Picker.Item
                          color='black'
                          label="No"
                          value="2"
                          key="2"
                        />

                </Picker>
            </View>
           

            <Button
                mode="contained"
                style={[formStyles.btnSuces, styles.btnSuces2]}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Guardar
            </Button>
        </KeyboardAwareScrollView>

    )
}

function initialValues() {
    return{
        nueva_visita: "",
    };
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
