import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { formStyles } from "../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { API_URL } from "../utils/constants";

//Debajo recibimos los parámetros para cuando es editar direccion(props)

    export default function RechazarValoracion(props) {
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
        //Recibimos el id del parte por props 
        const {route: { params }}   = props;
        const [loading, setLoading] = useState(false);
        const navigation = useNavigation();
        const { auth } = useAuth();

console.log(params.idAddress);
    const idParte = params.idAddress;
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                //Aqui llamamos a la función que guarda pasandole los datos del usuario y los del form. 
                const url = `${API_URL}/rechazar_valoracion.php`;
                const params = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify({ 
                        token: auth.token, 
                        idparte: idParte, 
                        ...formData})
                };
                const response = await fetch(url, params);
                const result = await response.json();
                //Este código hace que cuando esto se cumple vuelve a la página anterior
                //console.log(response)
                Toast.show("Guardado Correctamente.", {
                    position: Toast.positions.CENTER,
                })
                navigation.goBack();
            } catch (error) {
                
                Toast.show("Error al Guardar.", {
                    position: Toast.positions.CENTER,
                })
                setLoading(false);
            }
        }
    });
    return(
        <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.conteiner}>
                    <Text style={styles.title}>Rechazar valoración</Text>
            </View>
            <TextInput
                label="Introduzca el motivo del rechazo"
                multiline = {true}
                numberOfLines = {4}
                onChangeText={(text) => formik.setFieldValue("motivo", text)}
            />
            <Button 
                mode="contained" 
                style={[formStyles.btnAlert, styles.btnSuces2]}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Rechazar Valoración
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
        motivo: Yup.string().required(true),
    }
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        paddingVertical: 20,
    },
    btnSuces2: {
        marginBottom: 20,
    },
})