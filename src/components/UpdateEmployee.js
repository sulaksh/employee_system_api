import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    emailId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        console.log(response.data);
        setEmployee(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(id, employee)
      .then((response) => {
        navigate("/employeeList");
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };
  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update Employee</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            className="h-10 w-96 border mt-2 p-2"
            name="firstName"
            value={employee.firstName}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Last Name
          </label>
          <input
            type="text"
            className="h-10 w-96 border mt-2 p-2"
            name="lastName"
            value={employee.lastName}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Email
          </label>
          <input
            type="email"
            className="h-10 w-96 border mt-2 p-2"
            name="emailId"
            value={employee.emailId}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <button
            className="rounded text-white font-semibold bg-green-400 py-2 px-6 mt-4 hover:bg-green-700"
            onClick={updateEmployee}
          >
            Update
          </button>
          <button
            onClick={() => navigate("/employeeList")}
            className="rounded text-white font-semibold bg-red-400 py-2 px-6 mt-4 ml-4 hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
