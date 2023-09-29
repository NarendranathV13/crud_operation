import axios from 'axios';
const api = axios.create({
    baseURL: `https://12houronlineapi.metrotrafficschool.com/api/backend`,
});
// Adding authorization header to all requests
api.interceptors.request.use((config) => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovLzEyaG91cm9ubGluZWFwaS5tZXRyb3RyYWZmaWNzY2hvb2wuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjk1OTcwNDgzLCJleHAiOjE2OTYwNTY4ODMsIm5iZiI6MTY5NTk3MDQ4MywianRpIjoiaHc2RkhTNEFkVGNHclFxVSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwibmFtZSI6IkFkbWluIEFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifQ.oR2uuBSTG6Z2iFFKORJ9zDPevz2B2GprC6uJanm7EEM'; 
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
const GetAxiosData = (apiUrl) => {
    return api
        .get(apiUrl)
}
const PostAxiosData = (apiUrl, formData) => {
    return api
        .post(apiUrl, formData)
}
const DeleteAxiosData = (apiUrl) => {
    return api
        .delete(apiUrl)
}
export { GetAxiosData, PostAxiosData, DeleteAxiosData };