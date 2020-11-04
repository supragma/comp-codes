import React, { useContext, useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

const passwordStrength = require('check-password-strength')

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  })

  const dispatch = useDispatch()

  const history = useHistory();

  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState('')

  const onSubmitPostReturn = (resp) => {
    if(resp.data.success == false) {
      alert(resp.data.error)
      return
    }
    dispatch({type: 'LOGIN'})
    history.push('/siteinfo')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (formData.password != formData.password_confirmation) {
      alert("Password do not match")
      return
    }
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.post['X-CSRF-TOKEN'] = token
    axios.post('/api/v1/sign_up',
               { first_name: formData.first_name,
                 last_name: formData.last_name,
                 email: formData.email,
                 phone: formData.phone,
                 password: formData.password,
                 password_confirmation: formData.password_confirm })
    .then(resp => onSubmitPostReturn(resp))
    .catch(data => console.log('error', data))
  }

  const handleInputChange = (e) => {
    if (e.target.name == 'password') {
      setPasswordStrengthLabel(passwordStrength(e.target.value).value)
    }
    setFormData({...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <div className='col-md8 order-2 order-md1'>
      <h1>The Comp Codes Sign up</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='row'>
            <div className='col-md-12'>
              <label><b>First Name</b></label><br/>
              <input required
                     name='first_name'
                     type='text'
                     value={formData.first_name}
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Last Name</b></label><br/>
              <input required
                     name='last_name'
                     type='text'
                     value={formData.last_name}
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Email</b></label><br/>
              <input required
                     name='email'
                     type='text'
                     value={formData.email}
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Phone Number</b></label><br/>
              <input required
                     name='phone'
                     type='text'
                     value={formData.phone}
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Password</b></label><br/>
              <input required
                     name='password'
                     type='password'
                     id='password-input'
                     value={formData.password}
                     onChange={handleInputChange}
              />
              <div>{passwordStrengthLabel}</div>
            </div>
            <div className='col-md-12'>
              <label><b>Confirm Password</b></label><br/>
              <input required
                     name='password_confirmation'
                     type='password'
                     value={formData.password_confirmation}
                     data-parsley-equalto="#password-input"
                     data-parsley-equalto-message='This value does not match the password field.'
                     onChange={handleInputChange} 
              />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-md-12'>
              <button className='btn btn-primary'>Next</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
