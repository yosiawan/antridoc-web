import React, { useState, useEffect, useCallback } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

import { TPatient } from "../../types";
import { baseURL } from "../../config";

type TQueueListProps = {
  statusType: string;
  hack: boolean;
  poliID: string;
};

// export const baseURL = "http://167.71.203.148"
export const getPatientsURL = baseURL + "/api/v1/admin/queue/index/";
export const scheduleID = "08377387-8fa8-400c-93bc-ec22b88e453c";

export default function QueueList(props: TQueueListProps) {
  const { hack, statusType, poliID } = props;
  const [patientList, setPatientList] = useState<TPatient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const memoizedGetPatientList = useCallback(
    async (onSuccess: (data: any) => void) => {
      try {
        const result = await fetch(
          getPatientsURL +
            "deaaa25d-dcd5-4d76-99d1-9b90247d6904/" +
            poliID +
            "?page=1&state=" +
            statusType
        );
        if (result.ok) {
          const data = await result.json();
          // data.data.map((patient: TPatient) => console.log(patient.process_status))
          // console.log('status ', statusType + ' ' + data.data)
          if (data && data.data) {
            onSuccess(data.data);
          }
        }
      } catch (err) {
        console.log(
          "Failed to fetch ",
          statusType,
          " patient list, ",
          err
        );
      }
    },
    [statusType, poliID]
  );

  useEffect(() => {
    memoizedGetPatientList(data => {
      setPatientList(
        data
          .filter(
            (patient: TPatient) => patient.doctor_schedule_id === scheduleID
          )
          .sort(
            (a: TPatient, b: TPatient) =>
              new Date(a.submit_time).getTime() -
              new Date(b.submit_time).getTime()
          )
      );
      setLoading(false);
    });
  }, [hack, memoizedGetPatientList]);

  return (
    <List
      style={{ height: 380, overflow: "scroll" }}
      component="nav"
      aria-label="secondary mailbox folders"
    >
      {loading ? (
        <div>Loading . . .</div>
      ) : patientList.length < 1 ? (
        <div>Tidak ada pasien yang mengantri</div>
      ) : (
        patientList.map((patient: any, index) => (
          <ListItem key={index}>
            <ListItemText
              style={{ textAlign: "center" }}
              primary={patient.full_name}
            />
          </ListItem>
        ))
      )}
    </List>
  );
}
