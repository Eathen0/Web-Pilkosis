import axios from "axios";

export default async function getPaslon () {
    try {
        const response = await axios({
            method: "get",
            url: "https://dull-plum-deer-boot.cyclic.cloud/api/paslon",
        })
        return response.data;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return Array;
    }
};