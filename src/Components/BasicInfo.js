import React from 'react';
import '../App.css'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import sportsList from "../pages/_mock/sports.json"

const BasicInfo = ({ handleChangeValue, values }) => {
    return (
        <Container >
            <Form.Group controlId="form.Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" onChange={(e) => handleChangeValue(e)} value={values.name} />
            </Form.Group>

            <Form.Group controlId="form.Date">
                <Form.Label>Date of Birth
                </Form.Label>
                <Form.Control type="date" name="dob" onChange={(e) => handleChangeValue(e)} value={values.dob} />
            </Form.Group>

            <Form.Group controlId="form.Select">
                <Form.Label>Gender</Form.Label>
                <Form.Select aria-label="Default select example" name="gender" onChange={(e) => handleChangeValue(e)} value={values.gender}>
                    <option value="" disabled>Select the Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="form.Select">
                <Form.Label>Sports</Form.Label>
                <DropdownMultiselect
                    options={sportsList.map((value) => { return (value) })}
                    name="sports"
                    handleOnChange={(sports) => handleChangeValue({ target: { name: "sports", value: sports } }
                    )}
                    selected={values.sports}
                />
            </Form.Group>
        </Container>
    )
}

export default BasicInfo