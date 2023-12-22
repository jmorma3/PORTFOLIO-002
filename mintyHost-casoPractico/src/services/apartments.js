//Distintos servicios para realizar consultas CRUD a la API:
import api from "./index.js";

const getBarrios = async()=>{
    try {
        const {data} = await api.get("/barrios")
        return data
    } catch (error) {
        console.log(error)
    }
}

const searchApartments = async(searchParams)=>{
    try {
        const {data} = await api.post("/search", searchParams)
        return data
    } catch (error) {
        console.log(error)
        
    }
}


export {
    getBarrios, 
    searchApartments
}
