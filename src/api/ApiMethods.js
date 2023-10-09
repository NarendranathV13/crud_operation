import axios from 'axios';
const api = axios.create({
    baseURL: `https://12houronlineapi.metrotrafficschool.com/api/backend`,
});
// Adding authorization header to all requests
api.interceptors.request.use((config) => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovLzEyaG91cm9ubGluZWFwaS5tZXRyb3RyYWZmaWNzY2hvb2wuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjk2ODMwODcyLCJleHAiOjE2OTY5MTcyNzIsIm5iZiI6MTY5NjgzMDg3MiwianRpIjoibTdDZzl2SHBxU05MQmQ3VSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwibmFtZSI6IkFkbWluIEFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifQ.lhf0tSxQV4Y4iZ5GFOx9Yr30VAyvYimhYlwuhx1sXnY'; 
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  const GetAxiosData = (apiUrl, params) => {
    return api.get(apiUrl, { params });
  }
const PostAxiosData = (apiUrl, formData) => {
    return api
        .post(apiUrl, formData)
}
const DeleteAxiosData = (apiUrl) => {
    return api
        .delete(apiUrl)
}
const EditAxiosData = (apiUrl, formData) => {
    return api
        .put(apiUrl,formData)
}
export { GetAxiosData, PostAxiosData, DeleteAxiosData, EditAxiosData };