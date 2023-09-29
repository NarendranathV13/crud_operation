import React, { useState } from "react";
import { PostAxiosData } from "../../api/ApiMethods";


const AddStudentForm = () => {
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
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            // Send the formData to the API using PostAxiosData
            const response = await PostAxiosData('/students', formData); // Replace '/students' with the appropriate API endpoint
            console.log("Data saved successfully:", response.data);

            // Clear the form fields
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
            });
        } catch (error) {
            console.error("Error saving data:", error);
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
                    <option value="12HoursADI">12hoursADI</option>
                    <option value="4HoursADI">4hours</option>
                </select>
            </div>
            <div className="col-lg-6 col-sm-6">
                <label for="inputWebsite" className="form-label">Website</label>
                <select
                    id="inputCourse"
                    className="form-select"
                    name="website_id"
                    value={formData.coursename}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Choose...</option>
                    <option value="2">12 Hours Online ADI</option>
                    <option value="1">16HoursADI</option>
                </select>
            </div>

            <div className="col-12">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    )
}
export default AddStudentForm