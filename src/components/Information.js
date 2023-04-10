import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Address from './Address';

function Information(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(props.name);
  const [age, setAge] = useState(props.age);
  const [address, setAddress] = useState(props.address);
  const [department, setDepartment] = useState(props.department);
  const [status, setStatus] = useState(props.status);
  const [key, setKey] = useState('home');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`employeebackend-production.up.railway.app/update/${props.id}`, {
      method: "PUT",
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
    window.location.reload();

    const data = await response.json();
    console.log(data);

    setShow(false);
  }

  async function handleDelete() {
    const response = await fetch(`employeebackend-production.up.railway.app/delete/${props.id}`, {
      method: "DELETE",
    });


    
    const data = await response.json();
    console.log(data);
    
    setShow(false);
    window.location.reload();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.name}
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
      <Tabs
      defaultActiveKey="profile"
      id="controllable-tab-example"
      className="mb-3"
      onSelect={(k) => setKey(k)}
      activeKey={key}
    >
      <Tab eventKey="home" title="Home">

        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton >
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Tab>


      <Tab eventKey="Map" title="Map"  >
        <Address addd= {props.address} />
      </Tab>

      </Tabs>
      </Modal>
    </>
  );
}

export default Information;
