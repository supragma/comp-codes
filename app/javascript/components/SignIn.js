import axios from 'axios'
import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmitPostReturn = (resp) => {
    if(resp.data.success == false) {
      alert(resp.data.error)
      return
    }
    dispatch({type: 'LOGIN'})
    history.push('/dashboard')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.post['X-CSRF-TOKEN'] = token
    axios.post('/api/v1/sign_in',
               { email: formData.email,
                 password: formData.password })
    .then(resp => onSubmitPostReturn(resp))
    .catch(data => console.log('error', data))
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  return ( 
    <div className='container'>
      <div className='col-md8 order-2 order-md1'>
        <h1>The Comp Codes Sign In</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='row'>
            <div className='col-md-12'>
              <label><b>Email</b></label><br/>
              <input required
                     name='email'
                     type='text'
                     value={formData.email}
                     onChange={handleInputChange}
                     className='form-control form-control-lg'
              />
            </div>
            <div className='col-md-12'>
              <label><b>Password</b></label><br/>
              <input required
                     name='password'
                     type='password'
                     value={formData.password}
                     onChange={handleInputChange}
                     className='form-control form-control-lg'
              />
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className='col-md-12'>
              <button className='btn btn-primary'>Sign In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) 
}

export default SignIn
