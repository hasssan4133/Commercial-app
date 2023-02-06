import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
      input:{
          marginBottom: 20
      },
      btnSuces:{
          padding: 5,
          backgroundColor: colors.primary,
      },
      btnAlert:{
        padding: 5,
        backgroundColor: colors.danger,
    },
      btnText:{
          marginTop: 10,
      },
      btnTextLabel: {
          color: colors.dark,
      }
})

export default formStyles;
