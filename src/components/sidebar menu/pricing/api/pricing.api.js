import axios from "axios";
import baseURL from "../../../../config";

// const API = "http://localhost:5005";
const API = baseURL;

// SEASONS
export const getSeasons = () => axios.get(`${API}/season`);
export const createSeason = data => axios.post(`${API}/season`, data);
export const publishSeason = id => axios.post(`${API}/season/${id}/publish`);

// BASE PRICING
export const saveBasePricing = data => axios.post(`${API}/base`, data);
export const getBasePricing = courseId =>
  axios.get(`${API}/base/${courseId}`);

// SEASON DISCOUNT
export const saveSeasonDiscount = data =>
  axios.post(`${API}/discount`, data);

// PRICE PREVIEW
export const calculatePrice = data =>
  axios.post(`${API}/calculate`, data);

// COURSES (already exists in your system)
export const getCourses = () =>
  axios.post(`${baseURL}/getdata`, {
    collectionName: "courses"
  });



 export const getBasePricingByCourse = courseId =>
  axios.get(`${API}/base/${courseId}`);


 export const getBasePricingTree = () =>
  axios.get(`${API}/base_price`);



 export const getDiscounts = () =>
  axios.get(`${API}/discount`);

export const createDiscount = data =>
  axios.post(`${API}/discount`, data);

export const getDiscountPreview = discountId =>
  axios.get(`${API}/discount/${discountId}/preview`);