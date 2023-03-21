import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ListGroup from 'react-bootstrap/ListGroup';


export function Pop(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
  }
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  async function submitForm(e) {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:2000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        address,
        department,
        status,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <Button variant="outline-info" onClick={handleShow} id={props.id} className={props.class}>
        {props.namee}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <input
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />

            <input
              autoComplete="off"
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <input
              autoComplete="off"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              autoComplete="off"
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <input
              autoComplete="off"
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <input type="submit" value="Submit" className="btn" onClick={handleClose}  />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export function Information(props){
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // window.location.reload(false);
  }
  const handleShow = () => setShow(true);


  
  return (
    <>
    <Button variant="outline-info" onClick={handleShow} id={props.id} className={props.class}>
        {props.name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
        <ListGroup as="ul">
      <ListGroup.Item as="li" active>
        Employee Information
      </ListGroup.Item>
      <label htmlFor="Name">Name:</label>
      <ListGroup.Item as="li" className="Name">{props.name}</ListGroup.Item>
      <label htmlFor="Age">Age:</label>
      <ListGroup.Item as="li" className="Age">{props.age}</ListGroup.Item>
      <label htmlFor="Address">Address:</label>
      <ListGroup.Item as="li" className="Address">{props.address}</ListGroup.Item>
      <label htmlFor="Department">Department:</label>
      <ListGroup.Item as="li" className="Department">{props.department}</ListGroup.Item>
      <label htmlFor="Status">Status:</label>
      <ListGroup.Item as="li" className="Status">{props.status}</ListGroup.Item>


    </ListGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}






