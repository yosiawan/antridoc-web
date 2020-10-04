import { Button } from "@material-ui/core";
import React from "react";
import "./header.css";

export default function HeaderView() {
  return (
    <div className="header">
      <Button color="primary" variant="contained" style={{ margin: 10 }}>
        Tambah Antrian Baru
      </Button>
      <div className="header__username">Nama Admin</div>
    </div>
  );
}
