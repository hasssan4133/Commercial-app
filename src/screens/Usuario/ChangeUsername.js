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

export default function ChangeUsername() {
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
                if(response.username ){
                    await formik.setFieldValue("username", response.username);
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
                await updateUserApi(auth, formData);
                //Este código hace que cuando esto se cumple vuelve a la página anterior
                navigation.goBack();
                Toast.show("Actualizado Correctamente.", {
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
                label="Nombre" 
                style={formStyles.input} 
                onChangeText={(text) => formik.setFieldValue("username", text)} 
                value={formik.values.username}
                error={formik.errors.username}
            />
            <Button
                mode="contained"
                style={formStyles.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                  Cambiar Usuario
            </Button>
        </View>

    )
}
function initialValues() {
    return{
        username: "",
    }
}

function validationSchema() {
    return{
        username: Yup.string().required(true),
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})