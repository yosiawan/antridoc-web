import React from "react";
import "./menuBar.css";

export default function MenuBarView() {
  return (
    <div className="menubar">
      <div className="menubar__header">Nama RS</div>
      <div className="menubar__option">Beranda</div>
      <div className="menubar__option__active">Antrian</div>
      <div className="menubar__option">Data Pasien</div>
      <div className="menubar__option">Data Dokter</div>
      <div className="menubar__option">Rumah Sakit</div>
      <div className="menubar__option">Pengguna</div>
    </div>
  );
}
