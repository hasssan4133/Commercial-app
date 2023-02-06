import { API_URL } from "../utils/constants";

export async function addCliente(auth, address) {
    try {
        const url = `${API_URL}/add_cliente_potencial.php`;
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
export async function actCliente(auth, idCliente, address) {
    try {
        const url = `${API_URL}/act_cliente_potencial.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                idcliente: idCliente,
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
export async function addProyecto(auth, address) {
    try {
        const url = `${API_URL}/add_proyecto_potencial.php`;
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
export async function getClientesfiltro(auth, address) {
    try {
        const url = `${API_URL}/filtrar_clientes_potenciales.php`;
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
export async function getDatoscliente(auth, address) {
    try {
        const url = `${API_URL}/ver_cliente_potencial.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
                token: auth.token,
                user: auth.idUser,
                idcliente: address,
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
export async function getClientes(token){
    try {
        const url = `${API_URL}/listar_clientes_potenciales.php`;

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
