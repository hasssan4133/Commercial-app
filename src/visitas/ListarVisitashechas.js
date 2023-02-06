import React, { useCallback, useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Picker,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getVisitashechas } from "../api/visitas";
import useAuth from "../hooks/useAuth";
import size from "lodash";
//Importamos para tratar las imagenes
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerModal } from '../components22/image-picker-modal';
import { formStyles } from "../styles";
import { useFormik } from "formik";
import { Button } from "react-native-paper";
//Función para crear un bucle para listar todas las direcciones
import { map } from "lodash";
import { deleteAddressesApi } from "../api/address";
import colors from "../styles/colors";
import Toast from "react-native-root-toast";

export default function ListarVisitashechas(props){
    //useestate para definir el filtro
    const [selectFiltro, setSelectFiltro] = useState(0);
    const [partes, setPartes] = useState(null);
    //Debajo definimos ese estado para acctualizar el listado de direcciones al eliminar.
    const [reloadPartes, setreloadPartes] = useState(false);
    const { auth } = useAuth();
    useFocusEffect(
        useCallback(
            () => {
                setPartes(null);
                (async() => {
                    const response = await getVisitashechas(auth.token);
                    console.log("El fallo es: "+response);
                    setPartes(response);
                    setreloadPartes(false);
                })();
            }, [reloadPartes],
        )
    )
    //
    //A partir de aqui nos traemos aqui el listado de partes
    //Definimos las variables que pasábamos por props
    //
    const [idParte, setidParte] = useState(0);
    //console.log("Los props son: "+addresses);
    //Definimos navigation para nevagar a otras páginas. Importado de react navigation.
    const navigation = useNavigation();
    //Para filtrar
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
      initialValues: initialValues(),
      onSubmit: async (formData) => {
        //formData.append('Imagen', { Imagen: imagenBase });
          setLoading(true);
          try {
            useCallback(
                () => {
                    setPartes(null);
                    (async() => {
                        const response = await getPartesAceptadosapi(auth.token);
                        console.log("El fallo es: "+response);
                        setPartes(response);
                        setreloadPartes(false);
                    })();
                }, [reloadPartes],
            )
            Toast.show("Correcto.", {
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
    //Definimos la función que llama a la función que comunica con la BD y borra
    const deleteAddress = async (idAddress) => {
        try {
            await deleteAddressesApi(auth, idAddress);
            //Llamamos a esa función que recibimos por props desde addresses.js y que actualiza el listado
            setreloadAddress(true);
        } catch (error){
            console.log(error)
        }
    };

    const goToUpdateAddress = (idAddress) => {
        //Si esta función se ejecuta, llama a navegación para ir a esa página parandole ese parametro. Asi se
        //Pasan los parámetros (No se pueden apsar objetos ni funciones)
                navigation.navigate("add-address", { idAddress });
    }
    //PROCESAMOS LAS IMAGENES
    const [pickerResponse, setPickerResponse] = useState(null);
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Necesitamos permisos de Cámara para poder añadir fotos!');
          }
        }
      })();
    }, []);
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
        allowsMultipleSelection: true,
      });
      const imagenBase = result.base64;
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();
      //formData.append('photo', { Imagen: imagenBase, name: filename, type });
      return await fetch('https://gregosoft.gregasa.com/api_movil/procesar_imagenes_todos.php', {
        body: formData,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          idparte: idParte,
          Imagen: imagenBase,
          token: auth.token,

        }),
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    const onImageLibraryPress = useCallback(() => {
      const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      };
      ImagePicker.launchImageLibrary(options, setPickerResponse);
    }, []);


    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
    const onCameraPress = async () => {
     // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchCameraAsync({
         saveToPhotos: true,
         mediaType: 'photo',
         includeBase64: true,
         base64: true,
     });
    // console.log(result);
     const imagenBase = result.base64;
     //console.log(imagenBase);
     let localUri = result.uri;
     let filename = localUri.split('/').pop();

     let match = /\.(\w+)$/.exec(filename);
     let type = match ? `image/${match[1]}` : `image`;
     let formData = new FormData();
     //formData.append('photo', { Imagen: imagenBase, name: filename, type });
     return await fetch('https://gregosoft.gregasa.com/api_movil/procesar_imagenes_todos.php', {
       body: formData,
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${auth.token}`,
       },
       body: JSON.stringify({
         idparte: idParte,
         Imagen: imagenBase,
         token: auth.token,

       }),
     });
     if (!result.cancelled) {
       setImage(result.uri);
     }
   };
    const addresses = partes;
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.tittle}>Listar visitas hechas</Text>


            {!partes ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : size(partes) == 0 ? (
                <Text style={styles.noAddressText}>Crea tu primera Visita</Text>
            ) : (
                //Añadimos el listado de direcciones importado arriba
        <View style={styles.container}>

            {map(addresses.address, (address) => (
                    //Esto es el bucle. La key de debajo define el ID de la linea que se está ejecutando
                    <View key={address.id} style={styles.address}>
                        <Text style={styles.title}>{address.matricula}</Text>
                        <Text>Fecha:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.fecha}</Text>
                        </View>
                        <Text>Cliente:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.nombrecliente}</Text>
                        </View>
                        <Text>Proyecto:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.nombreproyecto}</Text>
                        </View>
                        <Text>Descripción:</Text>
                        <View style={{ borderWidth: 1, borderColor: '#C2BFBF', borderRadius: 4, padding: 8, marginBottom: 12, }}>
                            <Text >{address.resumen}</Text>
                        </View>

                        <View style={styles.actions}>
                            <Button
                                mode="contained"
                                color={colors.primary}
                                setidParte={(address.id)}
                                idParte={address.id}
                                uri={uri}
                                onPress={() => {setVisible(true); setidParte(address.id) }}
                            >Visita Realizada
                            </Button>
                            <ImagePickerModal
                                setidParte={(address.id)}
                                isVisible={visible}
                                idParte={address.id}
                                onClose={() => setVisible(false)}
                                onImageLibraryPress={pickImage}
                                onCameraPress={onCameraPress}
                            />
                        </View>
                    </View>
            ))}
        </View>

            )}
        </ScrollView>
    )
}
function initialValues() {
    return{
        estado: "",
    };
  }

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5,
    },
    blocklinea: {
        flexDirection: "row",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    tittle: {
        fontSize: 20,
    },
    addAddressText: {
        fontSize: 16,
    },
    noAddressText: {
        fontSize: 16,
        marginTop: 10,
        textAlign: "center",
    },
    addAddress: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    loading: {
        marginTop: 20,
    },
})
