import React, { useContext, useState} from 'react'
import axios from 'axios'
import { FormContext } from '../context/form-context';
const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
  })

  const authenticity_token = useContext(FormContext);

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    console.log(formData) 
    axios.defaults.headers.post['X-CSRF-TOKEN'] = token
    axios.post('/api/v1/sign_up',
               { email: formData.email,
                 password: formData.password,
                 password_confirm: formData.password_confirm })
//...formData)
              // authenticity_token)
    .then(resp => console.log(resp))
    .catch(data => console.log('error', data))
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <div className='col-md8 order-2 order-md1'>
      <h1>The Comp Codes Sign up</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='row'>
            <div className='col-md-12'>
              <label><b>Email</b>&nbsp;</label>
              <input required
                     name='email'
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
            </div>
            <div className='col-md-12'>
              <label><b>Repeat Password</b>&nbsp;</label>
              <input required
                     name='password_confirm'
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

export default Signup
