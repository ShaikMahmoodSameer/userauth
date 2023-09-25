import axios from 'axios';
import React, { useState } from 'react'

function ResetPassword() {
  const [emailerrmsg, setEmailerrmsg] = useState('');
  const [emailsentmsg, setEmailsentmsg] = useState('');
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
      event.preventDefault();
      axios.post("http://localhost:3500/reset-password", {email})
      .then((response) => {
        if (response) {
          if (response.data.err === "email doesn't exist!") {
            setEmailerrmsg("Entered Email Does't exist! try again");          
          } else if(response.data.emailSent){
            setEmailsentmsg("Password reset link sent to entered email. From there you can reset you password!");
          }
          // console.log(response.data);
        }
      }).catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className='my-5'>
      <div className='fp-wrapper mx-auto p-5 border'>
        <h1 className='h3'>Enter Your Email</h1>
        <form onSubmit={handleSubmit} action="">
          <input type="text" className="form-control form-control-md mt-4" placeholder='Enter registered Email...' name='email' required
              onChange={(e) => {setEmail(e.target.value)}} />
          <div className='text-danger my-2'>{emailerrmsg}</div>
          <div className='text-success my-2'>{emailsentmsg}</div>
          <button type="submit" className="btn btn-primary" 
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
              Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
