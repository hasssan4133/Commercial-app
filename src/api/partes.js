import { API_URL } from "../utils/constants";


export async function getPartesapi(token){
    try {
        const url = `${API_URL}/listarvisitasptes.php`;
        const header = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(token),
        }
        const response = await fetch(url, header);
        const result = await response.json();
        console.log("El token es "+token);
        return result;
    } catch (error) {
        //console.log(error);
        return null;
    }
}
export async function addPresupuesto(auth, address) {
    try {
        const url = `${API_URL}/add_presupuesto.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                ...address})
        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log("lo enviado es "+auth.token);
        return result;
    } catch (error) {
        console.log("El error es "+error);
        return null;
    }
}
export async function addAceptarValoracion(auth, address) {
    try {
        const url = `${API_URL}/aceptar_valoracion.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ token: auth.token, user: auth.idUser, ...address})
        };
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        //console.log(error);
        return null;
    }
}
export async function getPartesPendientesAceptarapi(token){
    try {
        const url = `${API_URL}/listarpartesvaloradospendientes.php`;
        const header = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(token),
        }
        const response = await fetch(url, header);
        const result = await response.json();
        //console.log(result);
        return result;
    } catch (error) {
       // console.log(error);
        return null;
    }
}
export async function getValoracionesPendientesAceptarapi(token,idParte){
    try {
        const url = `${API_URL}/listarvaloracionesdetrabajo.php`;
        console.log("ENVIADO ID "+idParte);
        const header = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(token),
            body: JSON.stringify({ token: token, idParte: idParte})
        }
        const response = await fetch(url, header);
        const result = await response.json();
        //console.log(result);
        return result;
    } catch (error) {
       // console.log(error);
        return null;
    }
}
export async function getPartesPendientesValorarapi(token){
    try {
        const url = `${API_URL}/listarpartespendientesvalorar.php`;
        const header = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(token),
        }
        const response = await fetch(url, header);
        const result = await response.json();
        //console.log(result);
        return result;
    } catch (error) {
       // console.log(error);
        return null;
    }
}
export async function getPartesAceptadosapi(token){
    try {
        const url = `${API_URL}/listarpartesaceptados.php`;
        const header = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(token),
        }
        const response = await fetch(url, header);
        const result = await response.json();
       // console.log(result);
        return result;
    } catch (error) {
        //console.log(error);
        return null;
    }
}
export async function getPartesRechazadosapi(token){
    try {
        const url = `${API_URL}/listarpartesrechazados.php`;
        const header = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(token),
        }
        const response = await fetch(url, header);
        const result = await response.json();
       // console.log(result);
        return result;
    } catch (error) {
      //  console.log(error);
        return null;
    }
}
