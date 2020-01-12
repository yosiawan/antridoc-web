import React, { useEffect, useState, useCallback } from 'react'
import { Tabs, Tab, AppBar, Button } from '@material-ui/core';

import QueueList, { baseURL, getPatientsURL } from '../List/List';
import TabPanel from '../TabPanel/TabPanel';
import { TPatient } from '../types';

import './queue.css'

export const IDPoli = '422b4385-984a-4fbb-8e63-24db845e5ead'
export const hospitalID = 'deaaa25d-dcd5-4d76-99d1-9b90247d6904'
const updatePatientStatusURL = baseURL + "/api/v1/admin/queue/update-status"
const getDoctorListURL = baseURL + '/api/v1/doctor/'

export default function Queue() {
  const [value, setValue] = useState(0);
  const [HACK_TO_RERENDER, SET_HACK_TO_RERENDER] = useState<boolean>(false)
  const [currentPatient, setCurrentPatient] = useState<TPatient[]>()
  const [waitingPatients, setWaitingPatients] = useState<TPatient[]>()
  // const [doctorList, setDoctorList] = useState()
  
  const memoizedGetPatientList = useCallback(
    async (state: string, onSuccess: (data: any) => void) => {
      try {
        const result = await fetch(getPatientsURL + 'deaaa25d-dcd5-4d76-99d1-9b90247d6904/422b4385-984a-4fbb-8e63-24db845e5ead?state=' + state)
        if (result.ok) {
          const data = await result.json()
          // console.log(data.data)
          if (data && data.data) {
            onSuccess(data.data)
          }
        }
      } catch(err) {
        console.log('Failed to fetch CURRENT patient list, ', err)
      }
    },
    []
  )

  // const memoizedGetDoctorList = useCallback(
  //   async (onSuccess: (data: any) => void) => {
  //     try {
  //       const result = await fetch(getDoctorListURL + "deaaa25d-dcd5-4d76-99d1-9b90247d6904/422b4385-984a-4fbb-8e63-24db845e5ead")
  //       if (result.ok) {
  //         const data = await result.json()
  //         console.log(data.data)
  //         if (data && data.data) {
  //           onSuccess(data.data)
  //         }
  //       }
  //     } catch(err) {
  //       console.log('Failed to fetch doctor list, ', err)
  //     }
  //   },
  //   []
  // )

  useEffect(() => {
    memoizedGetPatientList('1', (data) => setCurrentPatient(data))
    memoizedGetPatientList('0', (data) => setWaitingPatients(data))
    // memoizedGetDoctorList((data) => setDoctorList(data))
  }, [HACK_TO_RERENDER, memoizedGetPatientList])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  async function onCheckoutClicked() {
    if (currentPatient && currentPatient.length > 0) {
      updatePatientStatusHandler(currentPatient[0].user_id, currentPatient[0].queue_id, "2")
    }
  }

  async function onCheckinClicked() {
    if (waitingPatients && waitingPatients.length > 0) {
      await updatePatientStatusHandler(waitingPatients[0].user_id, waitingPatients[0].queue_id, "1")
    }
  }

  async function onSkipClicked() {
    if (waitingPatients && waitingPatients.length > 0) {
      await updatePatientStatusHandler(waitingPatients[0].user_id, waitingPatients[0].queue_id, "3")
    }
  }

  async function updatePatientStatusHandler(patientID: string, queueID: string, currentStatus: string) {
    const body = new FormData()
    body.append('patient_id', patientID)
    body.append('current_status', currentStatus)
    body.append('queue_id', queueID)

    try {
      const result = await fetch(updatePatientStatusURL, {
        body,
        method: "POST"
      })

      if (result.ok) {
        console.log('success')
        SET_HACK_TO_RERENDER(true)
      }
    } catch(err) {
      console.log('failed to update patient status, ', err)
    }
  }

  return (
    <div>
      <div style={{ minHeight: 300 }}>
        <div style={{ fontSize: 20, margin: 40 }}>
          Antrian untuk dokter {currentPatient && currentPatient.length > 0 && currentPatient[0].doctor_fullname}
        </div>
        <div>
          Pasien Saat Ini
        </div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>
          {currentPatient && currentPatient.length > 0 ? currentPatient[0].patient_fullname : 'Belum ada Pasien yang masuk'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Button onClick={onCheckinClicked}  style={{ background: '#1E4383'}} variant="contained" color="primary">
            Check-in Pasien
          </Button>
          <Button onClick={onCheckoutClicked}  style={{ background: '#FFAB29', color: 'white', margin: '0px 10px' }} variant="contained">
            Check-out Pasien
          </Button>
          <Button onClick={onSkipClicked} variant="contained" color="secondary">
            Skip
          </Button>
          
        </div>
      </div>
      <div style={{ width: '60%', margin: '10px auto' }}>
        <AppBar style={{ background: '#1E4383'}} position="static">
          <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Selanjutnya" />
            <Tab label="Selesai" />
            <Tab label="Skipped" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {value === 0 && <QueueList hack={HACK_TO_RERENDER} statusType='0'/>}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {value === 1 && <QueueList hack={HACK_TO_RERENDER} statusType='2' />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {value === 2 && <QueueList hack={HACK_TO_RERENDER} statusType='3' />}
        </TabPanel>
      </div>
    </div>
  );
}
