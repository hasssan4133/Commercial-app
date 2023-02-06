import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import toast from "react-native-root-toast";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { formStyles } from "../../styles";
import Toast from "react-native-root-toast";

export default function ChangePassword() {
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const { auth } = useAuth();
    //Esta función es la que trae los datos del usuario pasandole el Token. 
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                //Seteamos que el valor de esos campos sea el de la BD. El condicional
                //Es para comprobar que traen datos para setear los campos
                if(response.password ){
                    await formik.setFieldValue("password", response.password);
                  }
            })()
        }, [])
    )


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                await updateContraApi(auth, formData);
                //Este código hace que cuando esto se cumple vuelve a la página anterior
                navigation.goBack();
                Toast.show("Contraseña actualizada Correctamente.", {
                    position: Toast.positions.CENTER,
                })
            } catch (error) {
                Toast.show("Error al Actualizar los Datos.", {
                    position: Toast.positions.CENTER,
                })
                setLoading(false);
            }
            
        }
    });

    return(
        <View style={styles.container}>
            <TextInput 
                label="Password" 
                style={formStyles.input} 
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)} 
                value={formik.values.password}
                error={formik.errors.password}
            />
            <TextInput
                label="Repetir Contraseña"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />
            <Button
                mode="contained"
                style={formStyles.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                  Cambiar Contraseña
            </Button>
        </View>

    )
}
function initialValues() {
    return{
        password: "",
        repeatPassword: ""
    }
}

function validationSchema() {
    return{
        password: Yup.string().required(true),
        repeatPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref("password")], true),
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})