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
import { addPresupuesto } from "../api/partes";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerHeader } from '../components22/image-picker-header';
import { ImagePickerModal } from '../components22/image-picker-modal';
import { ImagePickerAvatar } from '../components22/image-picker-avatar';
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import Visitas from "../visitas/Visitas";
import Partes from "../partes/Partes";
import ListarVisitasptes from "../visitas/ListarVisitasptes";
import ListarVisitas from "../visitas/ListarVisitas";
import ListarVisitashechas from "../visitas/ListarVisitashechas";
import CrearVisitacliente from "../visitas/CrearVisitacliente";
import CrearVisitaclientepotencial from "../visitas/CrearVisitaclientepotencial";
import VisitaRealizada from "../visitas/VisitaRealizada";
import VisitaRealizadapaso2 from "../visitas/VisitaRealizadapaso2";
import Guardarvisitadesde from "../visitas/Guardarvisitadesde"
import Proyectoaceptado from "../visitas/Proyectoaceptado";
import Proyectorechazado from "../visitas/Proyectorechazado";
//Debajo recibimos los parámetros para cuando es editar direccion(props)
export default function AddAddress(props) {
    //Debajo definimos cuando recibimos una id por props que es para editar.
    const { route: { params } } = props;
    const [loading, setLoading] = useState(false);

    const { auth } = useAuth();
    const Stack = createStackNavigator();
    return(
      <Stack.Navigator
          screenOptions={{
              headerTintColor: colors.fontLight,
              headerStyle: { backgroundColor: colors.bgDark },
              cardStyle: {
                  backgroundColor: colors.bgLight,
              }
          }}
      >
      <Stack.Screen
              name="account"
              component={Visitas}
              options={{title: "Listado", headerShown: false}}
      />
      <Stack.Screen
              name="crearvisitacliente"
              component={CrearVisitacliente}
              options={{
                  title: "Crear visita a cliente",
              }}
      />
      <Stack.Screen
              name="crearvisitaclientepotencial"
              component={CrearVisitaclientepotencial}
              options={{
                  title: "Crear visita a cliente potencial",
              }}
      />
      <Stack.Screen
              name="listarvisitasptes"
              component={ListarVisitasptes}
              options={{
                  title: "Listar visitas pendientes",
              }}
      />
      <Stack.Screen
              name="ListarVisitashechas"
              component={ListarVisitashechas}
              options={{
                  title: "Listar visitas hechas",
              }}
      />
      <Stack.Screen
              name="ListarVisitas"
              component={ListarVisitas}
              options={{
                  title: "Listar visitas ",
              }}
      />
      <Stack.Screen
              name="VisitaRealizada"
              component={VisitaRealizada}
              options={{
                  title: "Visita Realizada ",
              }}
      />
      <Stack.Screen
              name="VisitaRealizadapaso"
              component={VisitaRealizadapaso2}
              options={{
                  title: "Visita Realizada ",
              }}
      />
      <Stack.Screen
              name="Guardarvisitadesde"
              component={Guardarvisitadesde}
              options={{
                  title: "Visita Realizada y guardar nueva",
              }}
      />
      <Stack.Screen
              name="Proyectoaceptado"
              component={Proyectoaceptado}
              options={{
                  title: "proyectoaceptado",
              }}
      />
      <Stack.Screen
              name="Proyectorechazado"
              component={Proyectorechazado}
              options={{
                  title: "Proyectorechazado",
              }}
      />
    </Stack.Navigator>

    )
}
