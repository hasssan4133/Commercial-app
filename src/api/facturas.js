import { API_URL } from "../utils/constants";

export async function getFacturasapi(token){
    try {
        const url = `${API_URL}/listarfacturas.php`;
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