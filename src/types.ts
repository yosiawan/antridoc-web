export type TPatient = {
  user_id: string
  submit_time: string
  queue_id: string
  patient_fullname: string
  doctor_schedule_id: string
  doctor_fullname: string
  process_status: 0 | 1 | 2 | 3 | 4
}
