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
    // id: uuid(),
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
    let { id, value, checked, type } = e.target;
    value = type === "checkbox" ? checked : value;
    setFormdata({
      ...formdata,
      [id]: value,
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
        // id: uuid(),
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
            id="username"
            type="text"
            onChange={handleChange}
            placeholder="enter username"
          />
        </label>
        <label>
          Age
          <input
            value={formdata.age}
            id="age"
            type="number"
            onChange={handleChange}
            placeholder="enter age"
          />
        </label>
        <label>
          Address
          <input
            value={formdata.address}
            id="address"
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
            id="department"
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
            id="salary"
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
            id="marital"
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
              <tr>
                <td key={e.id}>{e.username}</td>
                <td key={e.id}>{e.age}</td>
                <td key={e.id}>{e.address}</td>
                <td key={e.id}>{e.department}</td>
                <td key={e.id}>{e.salary}</td>
                <td key={e.id}>{e.marital ? "True" : "False"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
