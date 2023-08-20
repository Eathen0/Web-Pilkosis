import axios from "axios";

export default async function getTotalVoting () {
    try {
        const response = await axios({
            method: "get",
            url: "https://dull-plum-deer-boot.cyclic.cloud/api/paslon",
        })
        const total = response.data.map((e) => {
            return {
                
            }
        })
        return total
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return Array;
    }
};