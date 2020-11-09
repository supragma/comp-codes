import React, { useContext, useState} from 'react'
import axios from 'axios'
import Dropdown from 'react-dropdown'
import { useSelector } from 'react-redux'

const projectTypeOptions = [
  'New Construction',
  'Addition to Existing Structure',
  'Remodel of a Few Rooms',
  'Complete Remodel',
  'Tenant Improvement',
  'Structural Repair to an Existing Structure',
  'Structural Engineering'
]
const defaultProjectTypeOption = projectTypeOptions[0]

const projectSizeOptions = [
  '<500',
  '500-1000',
  '1000-1500',
  '1500-2000',
  '2000-2500',
  '2500-3000',
  '3000+'
]
const defaultProjectSizeOption = projectSizeOptions[0]

const ProjectInfo = () => {
  const siteID = useSelector(state => state.siteID)

  const [formData, setFormData] = useState({
    type: defaultProjectTypeOption,
    size: defaultProjectSizeOption,
    details: '',
    interior_alt: 'No',
    exterior_alt: 'No',
    earth_work: 'No',
    site_improvements: 'No',
    mech_elect_plumb: 'No',
    sewer: 'No',
    change_use: 'No',
    zoning: 'No',
    environment_concerns: 'No',
    steep_slope: 'No',
  })

  const onSubmitPostReturn = (resp) => {
    if(resp.data.success == false) {
      alert(resp.data.error)
      return
    }
    window.location.href = '/instantquote'
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.post['X-CSRF-TOKEN'] = token
    axios.post('/api/v1/projectinfo',
               { site_id: siteID,
                 type: formData.type,
                 size: formData.size,
                 details: formData.details,
                 interior_alt: formData.interior_alt,
                 exterior_alt: formData.exterior_alt,
                 earth_work: formData.earth_work,
                 site_improvements: formData.site_improvements,
                 mech_elect_plumb: formData.mech_elect_plumb,
                 sewer: formData.sewer,
                 change_use: formData.change_use,
                 zoning: formData.zoning,
                 environment_concerns: formData.environment_concerns,
                 steep_slope: formData.steep_slope })
    .then(resp => onSubmitPostReturn(resp))
    .catch(data => console.log('error', data))
  }

  const handleProjectTypeChange = (value) => {
   setFormData({...formData, ['project_type']: value.value })
  }

  const handleProjectSizeChange = (value) => {
   setFormData({...formData, ['project_size']: value.value })
  }

  const handleInputChange = (e) => {
   setFormData({...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <div className='col-md8 order-2 order-md1'>
      <h1>Project Information</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='row'>
            <div className='col-md-12'>
              <label><b>Project Type</b>&nbsp;</label>
              <Dropdown options={projectTypeOptions} 
                        onChange={handleProjectTypeChange} 
                        value={defaultProjectTypeOption} 
                        label='project_type'
                        placeholder='Select Location Type' />
            </div>
            <div className='col-md-12'>
              <label><b>Project Size in Sq. Ft.</b>&nbsp;</label>
              <Dropdown options={projectSizeOptions} 
                        onChange={handleProjectSizeChange} 
                        value={defaultProjectSizeOption} 
                        label='project_type'
                        placeholder='Select Location Type' />
            </div>
            <div className='col-md-12'>
              <label><b>Tell us about your project, include as much details as possible</b></label>
              <textarea name='details'
                        className='form-control'
                        value={formData.details}
                        onChange={handleInputChange}
                        rows='10' style={{width: '100%'}}/>
            </div>
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Has Interior Alterations?</b></label><br/>
            <input type="radio" value="No" name="interior_alt" /> No<br/>
            <input type="radio" value="Yes" name="interior_alt"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Has Exterior Alterations to the Structure?</b></label><br/>
            <input type="radio" value="No" name="exterior_alt" /> No<br/>
            <input type="radio" value="Yes" name="exterior_alt"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Has Earth Work (Grading)?</b></label><br/>
            <input type="radio" value="No" name="earth_work" /> No <br/>
            <input type="radio" value="Yes" name="earth_work"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Site Improvements (Outdoors)?</b></label><br/>
            <input type="radio" value="No" name="site_improvements" /> No <br/>
            <input type="radio" value="Yes" name="site_improvements"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Will you need Mechanical, Electrial and Plumbing work?</b></label><br/>
            <input type="radio" value="No" name="mech_elect_plumb" /> No <br/>
            <input type="radio" value="Yes" name="mech_elect_plumb"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Sewer or Septics repairs?</b></label><br/>
            <input type="radio" value="No" name="sewer" /> No <br/>
            <input type="radio" value="Yes" name="sewer"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Change of use of the building??</b></label><br/>
            <input type="radio" value="No" name="change_use" /> No <br/>
            <input type="radio" value="Yes" name="change_use"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Zoning Variance Needed?</b></label><br/>
            <input type="radio" value="No" name="zoning" /> No <br/>
            <input type="radio" value="Yes" name="zoning"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Environmental Concerns?</b></label><br/>
            <input type="radio" value="No" name="environment_concerns" /> No <br/>
            <input type="radio" value="Yes" name="environment_concerns"/> Yes
          </div>
          <br/>
          <div onChange={handleInputChange}>
            <label><b>Steep Slope?</b></label><br/>
            <input type="radio" value="No" name="steep_slope" /> No <br/>
            <input type="radio" value="Yes" name="steep_slope"/> Yes
          </div>
          <br/>
          <div className='row'>
            <div className='col-md-12'>
              <button className='btn btn-primary'>Get Instant Quote</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectInfo
