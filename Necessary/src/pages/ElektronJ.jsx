import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react"; 

export default function QiymetCedveli() {

  const BASE_URL = "http://localhost:8080"
  const [teacherName, setTeacherName] = useState("")
  const [teacherLastName, setTeacherLastName] = useState("")
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const dbUserName = localStorage.getItem("username");

    async function fetchTeacherData() {
      const getTeacherResponse = await axios.post(`${BASE_URL}/auth/get-user?firstName=${dbUserName}`);
      
      const dbTeacher = getTeacherResponse.data.teacher;

      const dbTeacherId = dbTeacher.id
      const dbTeacherFirstName = dbTeacher.firstName;
      const dbTeacherLastName = dbTeacher.lastName;
  
      setTeacherName(dbTeacherFirstName);
      setTeacherLastName(dbTeacherLastName);

      const getTeacherDepartment = await axios.post(`${BASE_URL}/teacher/get-dep/${dbTeacherId}`)
      setDepartments(getTeacherDepartment.data)
      console.log(getTeacherDepartment.data)
    }

    
  
    fetchTeacherData();
  }, []);

  return (
    <div>
      {/* Top Navbar */}
      <div
        className="shadow-sm px-4 py-2 d-flex justify-content-end align-items-center border-bottom"
        style={{ backgroundColor: "#7ec8e3" }} // Set backgroundColor here in the style
      >
        <span className="fw-bold">{teacherName} {teacherLastName}</span>
      </div>

      {/* Body: Sidebar + Main Content */}
      <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)", backgroundColor: "#f8f9fa" }}>
        
        {/* Sidebar */}
        <div className="bg-dark d-flex flex-column justify-content-between" style={{ backgroundColor: "#003366", color: "white", width: "260px" }}>
          <div>
            <h5 className="text-center mb-4 mt-3">Personal Məlumat Sistemi</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="http://localhost:5173/qiymet-cedveli">Qiymət cədvəli</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="http://localhost:5173/elektron-jurnal">Elektron Jurnal</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="#">Dərs cədvəli</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="#">Tədris proqramları</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-white" href="#">Form və Sorğular</a>
              </li>
            </ul>
          </div>

          {/* Logout Button */}
          <div className="p-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                localStorage.clear();
                window.location.href = "http://localhost:5173";
              }}
            >
              Çıxış et
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-grow-1">
          <h4 className="mb-4">📘 Elektron Jurnal</h4>

          <table className="table table-bordered table-striped">
          <thead className="table-primary">
              <tr>
                <th>№</th>
                <th>Kodu</th>
                <th>Şöbə</th>
                <th>Adı</th>
                <th>Tələbə sayı</th>
                <th>Müh.</th>
                <th>Məş.</th>
                <th>Lab</th>
                <th>Kredit</th>
                <th>Dil</th>
              </tr>
            </thead>
            <tbody>
            {departments.map((d, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{d.code}</td>
                  <td>{d.type}</td>
                  <td><a href="#">{d.name}</a></td>
                  <td>{d.number}</td>
                  <td>{d.lectures}</td>
                  <td>{d.exercise}</td>
                  <td>{d.lab}</td>
                  <td>{d.credit}</td>
                  <td>{d.lang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom CSS for hover effect */}
      <style jsx>{`
        .nav-link {
          transition: box-shadow 0.3s ease-in-out;
        }

        .nav-link:hover {
          box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.6); /* Glowing effect */
        }
      `}</style>
    </div>
  );
}
