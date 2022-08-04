import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUserId, postAttendence } from '../../actions/auth';
import moment from 'moment';
import axios from 'axios';
function Attendence({ ad, currentuser, getUserId, teacherId, postAttendence }) {
  const { id } = useParams();
  console.log(id)
  const [date, setDate] = useState('')
  const [attend, setAttend] = useState('')
  const [attendenceArray, setAttendenceArray] = useState([]);
  const [update, setUpdate] = useState(false)
  useEffect(async () => {
    const user = await axios.get(`/api/users/${id}`);

    if (user) {

      setAttendenceArray(user.data.attendence)

    }

  }, [])

  console.log(currentuser)

  const handleDateChange = (e) => {
    setDate(e.target.value);

  }
  const handleAttendChange = (e) => {
    setAttend(e.target.value);

  }
  const handleAddAttendence = (e) => {
    e.preventDefault()
    setAttendenceArray([...attendenceArray, { date: date, attend: attend }])
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ attendence: attendenceArray, studentId: id, teacherId: teacherId });

    try {

      postAttendence({ body, config })
      setDate('')
      setAttend('')

    } catch (error) {
      console.log(error)
    }

  }

  console.log(attendenceArray)
  return (
    <div>
      <div >
        {/* {ad.map((obj) => <div><p>{obj.attend}</p><p>{obj.date}</p></div>)} */}
        <h1>Attendence</h1>
        <div>
          <input type="date" value={date} onChange={(e) => handleDateChange(e)} />
          <input type="text" value={attend} onChange={(e) => handleAttendChange(e)} />
          <div style={{ display: "flex", width: "30%", justifyContent: "space-between", margin: "auto", marginTop: "4em" }}>  <button onClick={(e) => handleAddAttendence(e)}>Add Locally</button>
            <button onClick={(e) => handleAdd(e)}>Add to backend</button></div>

        </div>
        <div>
          {
            attendenceArray.length > 0 && attendenceArray.map((at) => (
              <div style={{ display: "flex", width: "20%", justifyContent: "space-between" }}>
                <div>
                  <h3>{moment(at.date).format("YYYY-MM-DD")}</h3>
                </div>
                <div>

                  <h3>{at.attend}</h3>
                </div>
              </div>

            ))
          }
        </div>


      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  currentuser: state.register.currentuser,
  teacherId: state.register.user?._id
})
export default connect(mapStateToProps, { getUserId, postAttendence })(Attendence)
