import { API_URL } from "../utils/constants";

export async function registerApi(datosForm) {

        const url = `${API_URL}/auth/local/register`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosForm),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;

}
export async function loginApi(datosForm){
      const url = `${API_URL}/login.php`;
      const params = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(datosForm),
      }
      const response = await fetch(url, params);
      const result = await response.json();
      console.log("EL TOKEN RECIBIDO ES "+result);
      return result;

}
export async function getMeApi(token) {
    try {
        const url = `${API_URL}/datos_user.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(token),
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}
export async function updateUserApi(auth, formData){
    try {
        const url = `${API_URL}/actualizarUsuario.php?i${auth.idUser}`;
        const params = {
            //OJO, luego se usara POST
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                ...formData})
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}
export async function updateContraApi(auth, formData){
    try {
        const url = `${API_URL}/actualizarContra.php?i${auth.idUser}`;
        const params = {
            //OJO, luego se usara POST
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                ...formData})
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}
