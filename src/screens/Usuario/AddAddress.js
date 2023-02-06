import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { formStyles } from "../../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { addAddressesApi, getAddressesApi } from "../../api/address";

//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function AddAddress(props) {
    //Debajo definimos cuando recibimos una id por props que es para editar. 
    const { route: { params } } = props;
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

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

    const { auth } = useAuth();


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                //Aqui llamamos a la función que guarda pasandole los datos del usuario y los del form. 
                const response = await addAddressesApi(auth, formData);
                //Este código hace que cuando esto se cumple vuelve a la página anterior
                console.log(response)
                navigation.goBack();
            } catch (error) {
                Toast.show("Error al Guardar la Direccion.", {
                    position: Toast.positions.CENTER,
                })
                setLoading(false);
            }
        }
    });
    return(
        <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.conteiner}>
                    <Text style={styles.title}>Nueva Dirección</Text>
            </View>
            <TextInput label="Nombre de Dirección" 
                style={formStyles.input}  
                onChangeText={(text) => formik.setFieldValue("title", text)} 
                value={formik.values.Title}
                error={formik.errors.Title}
            />
            <TextInput 
                label="Nombre y Apellidos" 
                style={formStyles.input}  
                onChangeText={(text) => formik.setFieldValue("name_lastname", text)} 
                value={formik.values.Name_lastname}
                error={formik.errors.Name_lastname}    
            />
            <TextInput 
                label="Dirección" 
                style={formStyles.input}  
                onChangeText={(text) => formik.setFieldValue("address", text)} 
                value={formik.values.Address}
                error={formik.errors.Address}
            />
            <TextInput 
                label="Código Postal" 
                style={formStyles.input}  
                onChangeText={(text) => formik.setFieldValue("postal_code", text)} 
                value={formik.values.Postal_code}
                error={formik.errors.Postal_code}
            />
            <TextInput 
                label="Población" 
                style={formStyles.input}  
                onChangeText={(text) => formik.setFieldValue("city", text)} 
                value={formik.values.City}
                error={formik.errors.City}
            />
            <TextInput 
                label="Estado" 
                style={formStyles.input}  
                onChangeText={(text) => formik.setFieldValue("state", text)} 
                value={formik.values.State}
                error={formik.errors.State}
            />
            <TextInput 
                label="Pais" 
                style={formStyles.input}  
                onChangeText={(text) => formik.setFieldValue("country", text)} 
                value={formik.values.Country}
                error={formik.errors.Country}
            />
            <TextInput 
                label="Teléfono" 
                style={formStyles.input}  
                onChangeText={(text) => formik.setFieldValue("phone", text)} 
                value={formik.values.Phone}
                error={formik.errors.Phone}
            />
            <Button 
                mode="contained" 
                style={[formStyles.btnSuces, styles.btnSuces2]}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Crear Dirección
            </Button>
        </KeyboardAwareScrollView>

    )
}
function initialValues() {
    return{
        title: "",
        name_lastname: "",
        address: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
        phone: "",
    };
}

function validationSchema() {
    return{
        title: Yup.string().required(true),
        name_lastname: Yup.string().required(true), 
        address: Yup.string().required(true).max(40, 'Límite de caracteres para dirección alcanzado.'), 
        postal_code: Yup.string().required(true), 
        city: Yup.string().required(true), 
        state: Yup.string().required(true),   
        country: Yup.string().required(true),
        phone: Yup.string().required(true).min(6, 'El número de Teléfono debe tener al menos 6 caracteres.'),
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