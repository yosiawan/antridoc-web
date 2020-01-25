import React, { useState, useCallback, useEffect } from "react";

import { baseURL, poliID } from "../config";
import Queue from "../Queue/Queue";

type TDoctorSchedule = {
  day: string;
  id: string;
  doctor_id: string;
  time_start: string;
  time_end: string;
  is_available: boolean;
  queue_remaining: number;
};

type TDoctorRes = {
  full_name: string;
  schedule: TDoctorSchedule[];
};

export default function Clinic() {
  // TO DO: Delete dummy state when API is ready to serve patient list per doctor
  // const [doctors, setDoctors] = useState<TDoctorRes[]>([]);
  const [doctors, setDoctors] = useState([1, 2, 3, 4]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const getAvailDoctors = useCallback(async () => {
    const hospitalID = "deaaa25d-dcd5-4d76-99d1-9b90247d6904";
    const getDoctorsURL =
      baseURL + "/api/v1/doctor/" + hospitalID + "/" + poliID;

    try {
      let result = await fetch(getDoctorsURL);
      if (result.ok) {
        const data = await result.json();
        if (data) {
          if (data.length < 1) {
            setErrMsg("Klinik belum memiliki dokter");
          }
          setDoctors(data);
        }
      }
      setLoading(false);
    } catch (err) {
      setErrMsg("Gagal mengambil daftar dokter");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAvailDoctors();
  }, [getAvailDoctors]);

  if (loading) {
    return <div>Mohon tunggu . . .</div>;
  }

  if (errMsg.length > 0) {
    return <div>{errMsg}</div>;
  }

  return (
    <div
      style={{
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
      }}
    >
      {doctors.map((doctor, index) => {
        // TO DO: Refactor <Queue> to fetch data per doctor instead of clinic when API is ready
        return (
          <div
            key={index}
            style={{
              width: 700,
              height: 700,
              border: "1px solid black",
              marginTop: 10,
              borderRadius: 5
            }}
          >
            <Queue poliID={poliID} />
          </div>
        );
      })}
    </div>
  );
}
