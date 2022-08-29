import React, { useState } from 'react';
import { Avatar } from '@mui/material'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const AboutForm = ({ handleChangeValue, values }) => {

    // const [fileReceived, isFileReceived] = useState(0);
    // const file_received = () => {
    //     isFileReceived(1);
    //     
    // }

    return (
        <Container >
            <Form.Group controlId="form.Team">
                <Form.Label>Team</Form.Label>
                <Form.Control type="text" placeholder="Enter team" name="team" value={values.team} onChange={(e) => handleChangeValue(e)} />
            </Form.Group>

            <Form.Group controlId="form.Location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter location" name="location" value={values.location} onChange={(e) => handleChangeValue(e)} required />
            </Form.Group>

            <Form.Group controlId="form.Interests">
                <Form.Label>Interests</Form.Label>
                <Form.Control type="text" placeholder="Enter Interest" name="interests" value={values.interests} onChange={(e) => handleChangeValue(e)} />
            </Form.Group>

            <Form.Group controlId="form.Image">
                <Form.Label>Image
                </Form.Label>
                <Form.Control type="file" name="profile_image" onChange={(e) => { e.target.files[0] ? handleChangeValue({ target: { value: e.target.files[0], name: "profile_image" } }) : "" }} />
                <Avatar className="mt-3" src={values.profile_image ? URL.createObjectURL(values.profile_image) : ""} sx={{ width: 100, height: 100 }} />
            </Form.Group>

            <Form.Group controlId="form.Description" >
                <Form.Label>Description
                </Form.Label>
                <Form.Control as="textarea" row={3} name="about" onChange={(e) => handleChangeValue(e)} value={values.about} />
            </Form.Group>

        </Container>
    )
}

export default AboutForm