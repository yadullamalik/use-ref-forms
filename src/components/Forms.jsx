import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

export const Forms = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    marital: "",
  });
  const [show, setShow] = useState([]);
  useEffect(() => {
    handleShow();
  }, []);
  const handleShow = () => {
    axios.get("http://localhost:3001/users").then((res) => {
      setShow(res.data);
    });
  };

  const handleChange = (e) => {
    let { name, value, checked, type } = e.target;
    value = type === "checkbox" ? checked : value;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/users", formdata).then(() => {
      alert("user created successfully");
      setFormdata({
        username: "",
        age: "",
        address: "",
        department: "",
        salary: "",
        marital: "",
      });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>
          Name
          <input
            value={formdata.username}
            name="username"
            type="text"
            onChange={handleChange}
            placeholder="enter username"
          />
        </label>
        <label>
          Age
          <input
            value={formdata.age}
            name="age"
            type="number"
            onChange={handleChange}
            placeholder="enter age"
          />
        </label>
        <label>
          Address
          <input
            value={formdata.address}
            name="address"
            type="text"
            onChange={handleChange}
            placeholder="enter address"
          />
        </label>
        <br />
        <br />
        <label>
          Department
          <select
            name="department"
            onChange={handleChange}
            value={formdata.department}
          >
            <option value="--">--</option>
            <option value="police">Police</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
          </select>
        </label>
        <label>
          Salary
          <input
            value={formdata.salary}
            name="salary"
            type="number"
            onChange={handleChange}
            placeholder="enter salary"
          />
        </label>
        <label>
          Maried
          <input
            type="checkbox"
            checked={formdata.marital}
            onChange={handleChange}
            name="marital"
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Marital</th>
          </tr>
        </thead>
        <tbody>
          {show.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.username}</td>
                <td>{e.age}</td>
                <td>{e.address}</td>
                <td>{e.department}</td>
                <td>{e.salary}</td>
                <td>{e.marital ? "True" : "False"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
