import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";



export default function Pop(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
    // window.location.reload(false);
  }
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  

  async function submitForm(e) {
    e.preventDefault();
    const response = await fetch("https://tan-bream-tam.cyclic.app/getData", {
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
      <Button variant="outline-info" onClick={handleShow} id="fixedbtn">
        {props.namee}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={submitForm}>
          <label htmlFor="name">Name:</label>

            <input
            id="name"
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              />
              <br />

          <label htmlFor="age">Age:</label>
            <input
              id="age"
              autoComplete="off"
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              />
              <br />
        <label htmlFor="address">Address:</label>

            <input
            id="address"
              autoComplete="off"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
              <br />

              <label htmlFor="department">Department:</label>
            <input
            id="department"
              autoComplete="off"
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              />
              <br />

              <label htmlFor="status">Status:</label>
              <select name="cars" id="status" onChange={(e) => setStatus(e.target.value)} value={status} type="text" style={{width: "190px", height: "30px"}}>
              <option value="volvo">Select</option>
              <option value="Remote Locations">Remote Locations</option>
              <option value="Contract Employee">Contract Employee</option>
              <option value="Full-Time">Full-Time</option>
            </select>
            <br />

            <input type="submit" value="Submit" className="btn" onClick={handleClose} style={{backgroundColor: "#3c73ff"}}  />
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




