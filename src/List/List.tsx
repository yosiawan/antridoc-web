import React, { useState, useEffect, useCallback } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'

import { TPatient } from '../types';
import { IDPoli, hospitalID } from '../Queue/Queue';

type TQueueListProps = {
  statusType: string
}


export const baseURL = "http://167.71.203.148"
export const getPatientsURL = baseURL + "/api/v1/admin/queue/index/"

export default function QueueList(props: TQueueListProps) {
  const [patientList, setPatientList] = useState<TPatient[]>([])
  
  const memoizedGetPatientList = useCallback(
    async (onSuccess: (data: any) => void) => {
      try {
        const result = await fetch(getPatientsURL + "deaaa25d-dcd5-4d76-99d1-9b90247d6904/" + IDPoli + "?page=1" + '&state=' + props.statusType)
        if (result.ok) {
          const data = await result.json()
          // data.data.map((patient: TPatient) => console.log(patient.process_status))
          // console.log('status ', props.statusType + ' ' + data.data)
          if (data && data.data) {
            onSuccess(data.data)
          }
        }
      } catch(err) {
        console.log('Failed to fetch ', props.statusType, ' patient list, ', err)
      }
    },
    [props.statusType]
  )

  useEffect(() => {
    memoizedGetPatientList((data) => {
      setPatientList(data
        .filter((patient: TPatient) => patient.doctor_schedule_id === "a8fee77a-f427-4830-bb18-5e2a02cd10d0")
        .sort((a: TPatient, b: TPatient) => (
          new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime()
        ))
      )
    })
  }, [memoizedGetPatientList])

  return (
      <List style={{ height: 300, overflow: 'scroll' }} component="nav" aria-label="secondary mailbox folders">
        {
          patientList.map((patient: any, index) => (
            <ListItem key={index} >
              <ListItemText style={{ textAlign: 'center' }} primary={patient.full_name} />
            </ListItem>
          ))
        }
      </List>
  );
}