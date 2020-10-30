import React, { useContext, useState} from 'react'
import axios from 'axios'

const ProjectInfo = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
  })

  const onSubmitPostReturn = (resp) => {
    if(resp.data.success == false) {
      alert(resp.data.error)
      return
    }
    window.location.href = '/projectinfo'
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
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
      <h1>Site Information</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='row'>
            <div className='col-md-12'>
              <label><b>First Name</b>&nbsp;</label>
              <input required
                     name='first_name'
                     type='text'
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Last Name</b>&nbsp;</label>
              <input required
                     name='last_name'
                     type='text'
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Email</b>&nbsp;</label>
              <input required
                     name='email'
                     type='text'
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Phone Number</b>&nbsp;</label>
              <input required
                     name='phone'
                     type='text'
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Password</b>&nbsp;</label>
              <input required
                     name='password'
                     type='password'
                     id='password-input'
                     onChange={handleInputChange}
              />
              <div>{passwordStrengthLabel}</div>
            </div>
            <div className='col-md-12'>
              <label><b>Confirm Password</b>&nbsp;</label>
              <input required
                     name='password_confirmation'
                     type='password'
                     data-parsley-equalto="#password-input"
                     data-parsley-equalto-message='This value does not match the password field.'
                     onChange={handleInputChange} 
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <button className='btn btn-primary'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectInfo