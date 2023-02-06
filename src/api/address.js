import { API_URL } from "../utils/constants";

export async function getAddressesApi(token){
    try {
        const url = `${API_URL}/listardireccion.php`;
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
        console.log(error);
        return null;
    }
}


export async function addAddressesApi(auth, address) {
    try {
        const url = `${API_URL}/newdireccion.php`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ user: auth.idUser, ...address})
        };
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function deleteAddressesApi(auth, idAddress) {
    try {
        const url = `${API_URL}/addresses/${idAddress}`;
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            }
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
