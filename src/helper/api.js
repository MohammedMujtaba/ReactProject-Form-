import axios from "axios";

const baseUrl = "https://open-sponsor-ship-dev-backend.herokuapp.com/api"
const api = async (method = "GET", path, params = {}) => {
    try {
        const response = await axios({
            method,
            url: `${baseUrl}${path}`,
            header: {
                // "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            data: params,

        })
        // 
        return response.data
    } catch (error) {
        return error;
    }
}

export default api;