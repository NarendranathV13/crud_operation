import React from "react";
const EditForm = () => {
    return (
        <>
            <div className=" container bg-dark-subtle p-3 rounded-3 my-3">
                <h3 className=" text-center text-success mt-1">Edit details</h3>
                <div class="row g-3">
                    <div class="col-lg-6">
                        <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                    </div>
                    <div class="col-lg-6">
                        <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                    </div>
                    <div class="col-lg-6">
                        <input type="email" className="form-control" placeholder="Email" aria-label="Email" />
                    </div>
                    <div class="col-lg-6">
                        <input type="tel" className="form-control" placeholder="Phone" aria-label="Phone" />
                    </div>
                    <div class="col-lg-6">
                        <input type="date" className="form-control" placeholder="DOB" aria-label="DOB" />
                    </div>
                    <div class="col-lg-6">
                        <input type="text" className="form-control" placeholder="User name" aria-label="User name" />
                    </div>
                </div>
                <div class="col-lg-12">
                    <button type="submit" class="btn btn-primary mt-3">Save Changes</button>
                </div>
            </div>
        </>
    )
}
export default EditForm