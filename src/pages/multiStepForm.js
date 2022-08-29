import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import BasicInfo from '../Components/BasicInfo'
import AboutForm from '../Components/AboutForm'
import Details from '../Components/Details'
import api from '../helper/api'

const BASIC_INFO = 1
const ABOUT = 2
const DETAILS = 3
export default function MultiStepForm() {


  const navigate = useNavigate();

  const [filled, isFilled] = useState(0)


  const [step, setStep] = useState(1)
  const [formValues, setFormValues] = useState({
    name: '',
    dob: '',
    gender: '',
    sports: [],
    team: '',
    location: '',
    interests: '',
    profile_image: '',
    about: '',
  })



  useEffect(() => {
    if (step === 3) {
      const valuesForm = formValues;
      const nullable = Object.values(formValues).some(val => {

        if (val == '') {
          return true;
        }

        return false;
      })

      nullable ? isFilled(0) : isFilled(1);

    }

  }, [step])

  const next = () => {
    setStep(step + 1)
  }

  const prev = () => {
    setStep(step - 1)
  }

  const handleChangeValue = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmitValues = (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(formValues).forEach(
      ([key, value]) => formData.append(key, value)
    );
    api('POST', '/create-user', formData)

    navigate('/dashboard/user', { replace: true });
  }
  return (
    <>
      <Form style={{ position: 'relative' }} >
        {renderForm(step, handleChangeValue, formValues)}
        {step === 3 &&
          (filled ? (
            <Button type="submit" className="submit-btn" onClick={handleSubmitValues}>
              Submit
            </Button>

          ) : <span style={{ color: "red", fontSize: "18px", fontWeight: "600" }} className="submit-btn">Please fill all values!</span>)}
      </Form>

      <div className="d-flex justify-content-between my-3">
        {step > 1 && <Button onClick={prev}>Previous</Button>}
        {step < 3 && <Button onClick={next}>Next</Button>}
      </div>
    </>
  )
}

const renderForm = (formPage, updateForm, values) => {
  if (formPage === BASIC_INFO) {
    return <BasicInfo handleChangeValue={updateForm} values={values} />
  }
  if (formPage === ABOUT) {
    return <AboutForm handleChangeValue={updateForm} values={values} />
  }
  if (formPage === DETAILS) {
    return <Details formValues={values} />
  }
}
