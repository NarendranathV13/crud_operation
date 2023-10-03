import axios from 'axios';
const api = axios.create({
    baseURL: `https://12houronlineapi.metrotrafficschool.com/api/backend`,
});
// Adding authorization header to all requests
api.interceptors.request.use((config) => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovLzEyaG91cm9ubGluZWFwaS5tZXRyb3RyYWZmaWNzY2hvb2wuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjk2MzA2NzEyLCJleHAiOjE2OTYzOTMxMTIsIm5iZiI6MTY5NjMwNjcxMiwianRpIjoiano3YWhZTUlWQnF1QWFiRiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwibmFtZSI6IkFkbWluIEFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifQ.QGk25Pu_uMKrdwa5WXZ4WiXtNYylPHrWV9F0UkLcNF0'; 
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