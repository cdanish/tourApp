import axios from "axios";

// Corrected baseURL and endpoint
const API = axios.create({
  baseURL: "http://localhost:5000"
});

///interceptor
API.interceptors.request.use((req)=>{
  if(localStorage.getItem("profile")){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
  }
  return req;
})

// Fixed the spelling of the endpoint 'signin'
export const singIn = (formData) => API.post("/api/v1/tour/singnin", formData);

//sinup
export const singUp = (formData) => API.post("/api/v1/tour/singup", formData);

//createtour
export const createTour = (tourData) => API.post("/api/v1/ctour/ctour",tourData);

//gettour
export const fetchTours = () => API.get("/api/v1/ctour/gtour");

//getSingleTours
export const fetchSingleTours = (id) => API.get(`/api/v1/ctour/gtour/${id}`);


//getuserToursby user

export const fetchTourByUser = (userId) => API.get(`/api/v1/ctour/userTours/${userId}`); //userid


//delteTour
export const deleteTour = (id) => API.delete(`/api/v1/ctour/tourDelete/${id}`); //tour

//update Tour
export const updateTour = (updatedTourData,id) => API.patch(`/api/v1/ctour/tourUpdate/${id}`,updatedTourData); //tour


