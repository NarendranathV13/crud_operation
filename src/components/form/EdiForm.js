import React, { useState, useEffect, useContext } from "react";
import { EditAxiosData } from '../../api/ApiMethods'; // Import the EditAxiosData method
import { ContextApi } from "../contextApi/ContextApi";
const EditForm = ({ editData }) => {
    const { refresh, setRefresh } = useContext(ContextApi);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        user_name: "",
        gender: "",
        status: false,
        course_id: 1,
        course_status: 0,
        paid_status:"",
        security_questions: [
            { id: null, question_id: 1, answer: 'No' },
            { id: null, question_id: 2, answer: 'No' }
        ],
    });
    useEffect(() => {
        if (editData) {
            setFormData({
                first_name: editData.first_name || "",
                last_name: editData.last_name || "",
                email: editData.email || "",
                phone: editData.phone || "",
                dob: editData.dob || "",
                user_name: editData.user_name || "",
                course_id: 1,
                course_status: editData.course_status || 1,
                gender: editData.gender || "",
                paid_status: editData.paid_status || "1",
                status: Boolean(editData.status),
                security_questions: editData.security_questions || [
                    { id: null, question_id: 1, answer: 'No' },
                    { id: null, question_id: 2, answer: 'No' }
                ],
            });
        }
    }, [editData])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const apiUrl = `/students/${editData.id}`;
        const sq1Answer = document.getElementById('sq1').value;
        const sq2Answer = document.getElementById('sq2').value;

        // Format security questions array
        const securityQuestions = [
            { id: null, question_id: 1, answer: sq1Answer === 'yes' ? 'Yes' : 'No' },
            { id: null, question_id: 2, answer: sq2Answer === 'yes' ? 'Yes' : 'No' }
        ];

        console.log(securityQuestions)

        EditAxiosData(apiUrl, formData)
            .then(() => {
                setRefresh("4")
                console.log('Data successfully edited and saved to the API!');
            })
            .catch(error => {
                console.error('Error editing data:', error, formData);
            });
    };

    return (
        <>
            <div className="container bg-dark-subtle p-3 rounded-3 my-3">
                <form onSubmit={handleSubmit} method="POST">
                    <h3 className=" text-center text-success mt-1">Edit details</h3>
                    <div class="row g-3">
                        <div class="col-lg-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                aria-label="First name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div class="col-lg-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                aria-label="Last name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div class="col-lg-6">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div class="col-lg-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone"
                                aria-label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div class="col-lg-6">
                            <input
                                type="date"
                                className="form-control"
                                placeholder="DOB"
                                aria-label="DOB"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-lg-6">
                            <select
                                className="form-select"
                                id="course_status"
                                name="course_status"
                                value={formData.course_status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select course status</option>
                                <option value="0">Not yet started</option>
                                <option value="1">In progress</option>
                                <option value="2">Completed</option>
                            </select>
                        </div>
                        <div className="col-lg-6">
                            <select
                                className="form-select"
                                id="paid_status"
                                name="paid_status"
                                value={formData.paid_status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Payment status</option>
                                <option value="0">Not paid</option>
                                <option value="1">paid</option>
                            </select>
                        </div>
                        <div class="col-lg-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="User ID"
                                aria-label="User ID"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-lg-6">
                            <div className="form-check form-switch mt-2">
                                <label className="form-check-label">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                        name="status"
                                        checked={formData.status}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    Status
                                </label>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <label htmlFor="inputGender" className="form-label">Gender</label>
                            <div className="row">
                                <div className="col">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="inlineRadio1">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="inlineRadio1"
                                                checked={formData.gender === 'male'}
                                                onChange={handleInputChange}
                                                value="male"
                                                required
                                            />
                                            Male
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="inlineRadio2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="inlineRadio2"
                                                checked={formData.gender === 'female'}
                                                onChange={handleInputChange}
                                                value="female"
                                                required
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-center">Security Questions</h3>
                        <div className="col-lg-6">
                            <p id="sq2">Are you attending the online class?</p>
                            <select
                                className="form-select"
                                aria-label="Online Class Attendance"
                                required
                                value={formData.security_questions[0].answer} // Set value from state
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFormData(prev => ({
                                        ...prev,
                                        security_questions: [
                                            { ...prev.security_questions[0], answer: value },
                                            ...prev.security_questions.slice(1)
                                        ]
                                    }));
                                }}
                            >
                                <option value="yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* Security Question 1 */}
                        <div className="col-lg-6">
                            <p id="sq1">Q1</p>
                            <select
                                className="form-select"
                                aria-label="Security Question 1"
                                required
                                value={formData.security_questions[1].answer} // Set value from state
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFormData(prev => ({
                                        ...prev,
                                        security_questions: [
                                            ...prev.security_questions.slice(0, 1),
                                            { ...prev.security_questions[1], answer: value }
                                        ]
                                    }));
                                }}
                            >
                                <option value="yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <button type="submit" class="btn btn-primary mt-3">Save Changes</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditForm