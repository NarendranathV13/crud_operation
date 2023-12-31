import React, { useState, useEffect,useContext } from "react";
import { PostAxiosData, GetAxiosData } from "../../api/ApiMethods";
import { ContextApi } from '../contextApi/ContextApi';
import Swal from "sweetalert2";
const AddStudentForm = () => {
    const { refresh, setRefresh } = useContext(ContextApi);
    const [formData, setFormData] = useState({
        user_name: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        role: "",
        coursename: "",
        course_id: 1,
        status: 1,
        website_id: "",
    });
    const [websites, setWebsites] = useState([]);
    const [course, setCourse] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(() => {
        // Fetch website data from the API
        const fetchWebsites = async () => {
            try {
                const response = await GetAxiosData('/website');
                setWebsites(response.data.result);
            } catch (error) {
                console.error("Error fetching website data:", error);
            }
        };
        fetchWebsites();
    }, []);
    useEffect(() => {
        // Fetch course data from the API based on website_id
        const fetchCourse = async () => {
            try {
                const response = await GetAxiosData(`/dropdown/getcoursebywebsite?website_id=${formData.website_id}&status=1`);
                setCourse(response.data.result);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        // Only fetch courses if a website_id is selected
        if (formData.website_id) {
            fetchCourse();
        }
    }, [formData.website_id]); // Trigger effect whenever website_id changes


    const handleWebsiteChange = (e) => {
        const selectedWebsiteId = e.target.value;
        setFormData({
            ...formData,
            website_id: selectedWebsiteId,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await PostAxiosData('/students', formData);
          console.log("Data saved successfully:", response.data);
      
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Form submitted successfully!',
          });
      
          setFormData({
            user_name: "",
            password: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            dob: "",
            gender: "",
            role: "",
            coursename: "",
            course_id: "",
            status: "",
            website_id: "",
          });
          setRefresh("2");

        } catch (error) {
          console.error("Error saving data:", error);
          setRefresh("1");
        }
      };
    return (
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-lg-6 col-sm-6">
                <label for="inputUserid" class="form-label">User ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputUserid"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputPassword4" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputFname" className="form-label">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputFname"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputLname" className="form-label">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputLname"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputEmail" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputPhone" className="form-label">Phone</label>
                <input
                    type="tel"
                    className="form-control"
                    id="inputPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputDob" className="form-label">DOB</label>
                <input
                    type="date"
                    className="form-control"
                    id="inputDob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />
            </div>
            <div className="col-lg-6 col-sm-6">
                <label htmlFor="inputGender" className="form-label">Gender</label>
                <div className="row">
                    <div className="col">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="inlineRadio1"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="inlineRadio2"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-sm-6">
                <label for="inputWeb" className="form-label">Role</label>
                <select
                    id="inputWeb"
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Choose...</option>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                </select>
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputWebsite" className="form-label">Website</label>
                <select
                    id="inputWebsite"
                    className="form-select"
                    name="website_id"
                    value={formData.website_id}
                    onChange={handleWebsiteChange}
                    required
                >
                    <option value="" disabled>Choose...</option>
                    {websites.map(website => (
                        <option key={website.id} value={website.id}>{website.domain_name}</option>
                    ))}
                </select>
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputCourse" className="form-label">Course</label>
                <select
                    id="inputCourse"
                    className="form-select"
                    name="coursename"
                    value={formData.coursename}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Choose...</option>
                    {course.map(course => (
                        <option key={course.id} value={course.id}>{course.crs_title}</option>
                    ))}
                </select>
            </div>

            <div className="col-12">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    )
}
export default AddStudentForm