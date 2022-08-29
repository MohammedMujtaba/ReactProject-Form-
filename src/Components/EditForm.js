import React, { useCallback, useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import sportsList from "../pages/_mock/sports.json"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../helper/api';
import { useParams } from 'react-router-dom';


const EditForm = () => {

    const { id } = useParams()
    const [user, setUser] = useState()
    const getUserDetails = useCallback(async () => {
        const details = await api('GET', `/single-user/${id}`, {})
        setUser(details.data)

    }, [id])



    useEffect(() => {
        getUserDetails()
    }, [getUserDetails])

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        location: '',
        team: '',
        gender: '',
        sports: [],
        about: '',
        interests: '',
        profile_image: '',
    })


    useEffect(() => {

        setFormData({
            name: user?.name,
            dob: user?.dob,
            location: user?.location,
            gender: user?.gender,
            sports: user?.sports,
            about: user?.about,
            interests: user?.interests,
            profile_image: user?.profile_image,
            team: user?.team
        })

    }, [user]);

    const handleChangeValue = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    }
    const handleUpdate = (e) => {
        e.preventDefault()
        const formValue = new FormData()
        let x = Object.entries(formData).forEach(

            ([key, value]) => formValue.append(key, value)
        );

        api('PUT', `/user-update/${id}`, formValue)

    }
    return (
        <Container>
            <Form className="d-flex flex-column form">
                <Row>
                    <Col>
                        <Form.Group controlId="form.Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name" onChange={(e) => handleChangeValue(e)} value={formData.name} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="form.Date">
                            <Form.Label>Date of Birth
                            </Form.Label>
                            <Form.Control type="date" name="dob" onChange={(e) => handleChangeValue(e)} value={formData.dob} />
                        </Form.Group>
                    </Col>

                </Row>


                <Row>
                    <Col>
                        <Form.Group controlId="form.Select">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="Default select example" name="gender" onChange={(e) => handleChangeValue(e)} value={formData.gender} >
                                <option value="" disabled>Select the Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="form.Select">
                            <Form.Label>Sports</Form.Label>
                            <DropdownMultiselect
                                options={sportsList.map((value) => { return (value) })}
                                name="sports"
                                handleOnChange={(sports) => handleChangeValue({ target: { name: "sports", value: sports } })}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="form.Team">
                            <Form.Label>Team</Form.Label>
                            <Form.Control type="text" placeholder="Enter team" name="team" onChange={(e) => handleChangeValue(e)} value={formData.team} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="form.Location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter location" name="location" onChange={(e) => handleChangeValue(e)} value={formData.location} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="form.Interests">
                            <Form.Label>Interests</Form.Label>
                            <Form.Control type="text" placeholder="Enter Interest" name="interests" onChange={(e) => handleChangeValue(e)} value={formData.interests} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="form.Image">
                            <Form.Label>Image
                            </Form.Label>
                            <Form.Control type="file" name="profile_image" onChange={(e) => { handleChangeValue({ target: { value: e.target.files[0], name: "profile_image" } }) }} />
                            <Avatar className="mt-3" src={formData.profile_image ? formData.profile_image : ""} sx={{ width: 100, height: 100 }} />
                        </Form.Group>
                    </Col>
                </Row>



                <Row>
                    <Form.Group controlId="form.Description">
                        <Form.Label>About
                        </Form.Label>
                        <Form.Control as="textarea" row={3} name="about" onChange={(e) => handleChangeValue(e)} value={formData.about} />
                    </Form.Group>
                </Row>

                <Button type="submit" onClick={handleUpdate}>Update</Button>
            </Form>
        </Container>
    )
}

export default EditForm