import axios from 'axios'
import React, { useContext, useState} from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSiteID } from '../actions/actions'

const locationTypeOptions = [
  'Residential', 'Commercial', 'ADU'
]
const defaultLocationTypeOption = locationTypeOptions[0]

const stateLocationOptions = [
  'CA'
]
const defaultStateLocationOption = stateLocationOptions[0]

const SiteInfo = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: defaultStateLocationOption,
    zip: '',
    location_type: defaultLocationTypeOption,
    lot_size: "0",
  })

  const history = useHistory()

  const dispatch = useDispatch()

  const onSubmitPostReturn = (resp) => {
    if(resp.data.success == false) {
      alert(resp.data.error)
      return
    }
    dispatch(setSiteID(resp.data.site_id))
    history.push('/projectinfo/')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.post['X-CSRF-TOKEN'] = token
    axios.post('/api/v1/siteinfo',
               { address: formData.address,
                 city: formData.city,
                 zip: formData.zip,
                 state: formData.state,
                 location_type: formData.location_type,
                 lot_size: formData.lot_size})
    .then(resp => onSubmitPostReturn(resp))
    .catch(data => console.log('error', data))
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleStateChange = (value) => {
    setFormData({...formData, ['state']: value.value })
  }

  const handleLocationTypeChange = (value) => {
    setFormData({...formData, ['location_type']: value.value })
  }

  return (
    <div className='container'>
      <div className='col-md8 order-2 order-md1'>
      <h1>Site Information</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='row'>
            <div className='col-md-12'>
              <label><b>Address</b>&nbsp;</label><br/>
              <input required
                     name='address'
                     type='text'
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>City</b>&nbsp;</label><br/>
              <input required
                     name='city'
                     type='text'
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <label><b>Zip Code</b>&nbsp;</label><br/>
              <input required
                     name='zip'
                     type='text'
                     onChange={handleInputChange}
              />
            </div>
            <div className='col-md-12'>
              <b>State</b><br/>
              <Dropdown options={stateLocationOptions}
                        onChange={handleStateChange}
                        value={defaultStateLocationOption}
                        placeholder='Select State' />
            </div>
            <div className='col-md-12'>
              <b>Location Type</b>
              <Dropdown options={locationTypeOptions}
                        onChange={handleLocationTypeChange}
                        value={defaultLocationTypeOption}
                        placeholder='Select Location Type' />
            </div>
            <div className='col-md-12'>
              <label><b>Lot Size (sq ft.)</b>&nbsp;</label><br/>
              <input required
                     name='lot_size'
                     type='text'
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

export default SiteInfo
