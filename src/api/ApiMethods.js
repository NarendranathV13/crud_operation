import axios from 'axios';
const api = axios.create({
    baseURL: `https://12houronlineapi.metrotrafficschool.com/api/backend`,
});
// Adding authorization header to all requests
api.interceptors.request.use((config) => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovLzEyaG91cm9ubGluZWFwaS5tZXRyb3RyYWZmaWNzY2hvb2wuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjk2MjE5NzY0LCJleHAiOjE2OTYzMDYxNjQsIm5iZiI6MTY5NjIxOTc2NCwianRpIjoia0lhaEVlNkoyNEhvUkhIRSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwibmFtZSI6IkFkbWluIEFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifQ.pxchcvCdq5MVpwPZpeusSZVMULEYSHUT-Y9SyPVoVys'; 
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