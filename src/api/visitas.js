import { API_URL } from "../utils/constants";

export async function getVisitasptes(token){
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
        return result;
    } catch (error) {
        return null;
    }
}
export async function getVisitashechas(token){
    try {
        const url = `${API_URL}/listarvisitashechas.php`;

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
        return result;
    } catch (error) {
        return null;
    }
}
export async function getVisitas(token){
    try {
        const url = `${API_URL}/listar_visitas.php`;

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
        return result;
    } catch (error) {
        return null;
    }
}
export async function addVisitacliente(auth, address) {
    try {
        const url = `${API_URL}/add_visita_cliente.php`;
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
export async function addVisitaclientedesde(auth, address, id_proyecto, id_visita_origen) {
    try {
        const url = `${API_URL}/add_visita_desde_anterior.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                id_proyecto: id_proyecto,
                id_visita_origen: id_visita_origen,
                ...address})
        };
        const response = await fetch(url, params);
        const result = await response.json();
        //console.log("lo enviado es "+auth.token);
        return result;
    } catch (error) {
        console.log("El error es "+error);
        return null;
    }
}
export async function addVisitaclientepotencial(auth, address) {
    try {
        const url = `${API_URL}/add_visita_clientepotencial.php`;
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
export async function getVisitasfiltro(auth, address) {
    try {
        const url = `${API_URL}/filtrar_todas_visitas.php`;
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
export async function getVisitasptesfiltro(auth, address) {
    try {
        const url = `${API_URL}/filtrar_visitas_ptes.php`;
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
export async function saveResultado(auth, address, idVisita, latitud, longitud) {
    try {
        const url = `${API_URL}/save_resultado_visita.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                id_visita: idVisita,
                latitud: latitud,
                longitud: longitud,
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
export async function saveResultadoaceptado(auth, address, idVisita, latitud, longitud) {
    try {
        const url = `${API_URL}/save_resultado_aceptado.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                id_visita: idVisita,
                latitud: latitud,
                longitud: longitud,
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
export async function saveResultadorechazado(auth, address, idVisita, latitud, longitud) {
    try {
        const url = `${API_URL}/save_resultado_rechazado.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                id_visita: idVisita,
                latitud: latitud,
                longitud: longitud,
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