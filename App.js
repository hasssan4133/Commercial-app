import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {Provider as PaperProvider } from "react-native-paper";
import jwtDecode from "jwt-decode";
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigation";
import { setTokenApi, getTokenApi, removeTokenApi, getUserApi } from "./src/api/token";
import * as Location from 'expo-location'
export default function App() {

  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
          (async () => {
              const token = await getTokenApi();
              const userAp = await getUserApi();
              if(token){
                  setAuth({
                    token,
                    idUser: userAp
                  });
              } else {
                  setAuth(null);
              }
          })()
      }, []);

  const login = (user) => {
        console.log("LOGGIN APP.JS");
        setTokenApi(user.user.jwt,user.user.id);
        setAuth({
              token: user.user.jwt,
              idUser: user.user.id,
        })
  }

  const logout = () => {
      if(auth){
        removeTokenApi();
        setAuth(null);
      }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );
console.log(auth);
if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
          {auth ? (
              <AppNavigation

              />
           ) : (
             <AuthScreen />
           )}

      </PaperProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({

});
