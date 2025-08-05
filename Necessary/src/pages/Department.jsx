import axios from "axios";
import { useState, useEffect } from "react";

export default function QiymetCedveli() {
  const BASE_URL = "http://localhost:8080";
  const [teacherName, setTeacherName] = useState("");
  const [teacherLastName, setTeacherLastName] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const dbUserName = localStorage.getItem("username");

    async function fetchTeacherData() {
      try {
        const getTeacherResponse = await axios.post(`${BASE_URL}/auth/get-user?firstName=${dbUserName}`);
        const dbTeacher = getTeacherResponse.data.teacher;

        setTeacherName(dbTeacher.firstName);
        setTeacherLastName(dbTeacher.lastName);

        const dbDepartmentId = localStorage.getItem("selectedDepartment");
        const getStudents = await axios.post(`${BASE_URL}/department/get-students/${dbDepartmentId}`);

        const preparedStudents = getStudents.data.map(s => ({
          ...s,
          sdf1: Number(s.sdf1) || 0,
          sdf2: Number(s.sdf2) || 0,
          tsi: Number(s.tsi) || 0,
          ssi: Number(s.ssi) || 0,
          dvm: calcDvm(s),
          ort: calcAverage(s)
        }));

        preparedStudents.sort((a, b) => a.name.localeCompare(b.name));

        setStudents(preparedStudents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTeacherData();
  }, []);

  function calcAverage(student) {
    const grades = [student.sdf1, student.sdf2, student.tsi, student.ssi, student.dvm].filter(g => !isNaN(g));
    if (grades.length === 0) return 0;
    return grades.reduce((a, b) => a + b, 0);
  }

  function calcDvm(student) {
    const totalHours = 60;
    const absentPercentage = (student.absent / totalHours) * 100;

    if (absentPercentage > 90) return 0;
    if (absentPercentage > 80) return 1;
    if (absentPercentage > 70) return 2;
    if (absentPercentage > 60) return 3;
    if (absentPercentage > 50) return 4;
    if (absentPercentage > 40) return 5;
    if (absentPercentage > 30) return 6;
    if (absentPercentage > 20) return 7;
    if (absentPercentage > 10) return 8;

    return 10;
  }

  function handleGradeChange(index, field, value) {
    const updatedStudents = [...students];
    updatedStudents[index][field] = Number(value) || 0;
    updatedStudents[index].dvm = calcDvm(updatedStudents[index]);
    updatedStudents[index].ort = calcAverage(updatedStudents[index]);
    setStudents(updatedStudents);
  }

  async function handleSaveGrades() {
    try {
      const payload = students.map(s => ({
        id: s.id,
        sdf1: s.sdf1,
        sdf2: s.sdf2,
        tsi: s.tsi,
        ssi: s.ssi,
        dvm: s.dvm,
        ort: s.ort
      }));

      console.log("Sending payload:", payload);

      await axios.post(`${BASE_URL}/student/update`, payload);

      alert("Grades successfully saved!");
    } catch (error) {
      console.error("Error saving grades:", error);
      alert("An error occurred while saving grades.");
    }
  }

  return (
    <div>
      {/* Top Navbar */}
      <div
        className="shadow-sm px-4 py-2 d-flex justify-content-end align-items-center border-bottom"
        style={{ backgroundColor: "#7ec8e3" }}
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
          <h4 className="mb-4">📘 Şagirdlər</h4>

          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>№</th>
                <th>T. Nömrəsi</th>
                <th>Adı Soyadı</th>
                <th>Qayıb</th>
                <th>SDF1</th>
                <th>SDF2</th>
                <th>TSİ</th>
                <th>DVM</th>
                <th>SSİ</th>
                <th>ORT</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr key={s.stdNum}>
                  <td>{index + 1}</td>
                  <td>{s.stdNum}</td>
                  <td>{s.name}</td>
                  <td>{s.absent}</td>
                  <td>
                    <input
                      type="number"
                      value={s.sdf1}
                      onChange={(e) => handleGradeChange(index, 'sdf1', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={s.sdf2}
                      onChange={(e) => handleGradeChange(index, 'sdf2', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={s.tsi}
                      onChange={(e) => handleGradeChange(index, 'tsi', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>{s.dvm}</td>
                  <td>
                    <input
                      type="number"
                      value={s.ssi}
                      onChange={(e) => handleGradeChange(index, 'ssi', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>{s.ort}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Save Button */}
          <div className="mt-3 text-end">
            <button className="btn btn-success" onClick={handleSaveGrades}>
              💾 Save All Changes
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for hover effect */}
      <style>
        {`
          .nav-link {
            transition: box-shadow 0.3s ease-in-out;
          }

          .nav-link:hover {
            box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.6);
          }
        `}
      </style>
    </div>
  );
}
