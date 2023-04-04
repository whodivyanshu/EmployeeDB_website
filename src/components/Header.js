import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import State from './Status';
import axios from 'axios';
import { PieChart, Pie, Cell } from 'recharts';

function Header() {
  const [show, setShow] = useState(false);
  const [pieData, setPieData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:2000/getData').then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        State[i] = response.data.data[i].status;
      }
      const countMap = State.reduce((map, item) => {
        map[item] = map[item] ? map[item] + 1 : 1;
        return map;
      }, {});

      const newPieData = Object.keys(countMap).map((key, index) => ({
        label: key,
        value: countMap[key],
        color: COLORS[index % COLORS.length], // add a color property to the pieData objects
      }));
      setPieData(newPieData);
    });
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <header>
      <h1 className='headh'>Project</h1>
      <button className='dashboard' onClick={handleShow}>
        Dashboard
      </button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Employee Status Pie Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chartbody">
            <div className='chartleft'>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieData}
                  dataKey='value'
                  nameKey='label'
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="chartright">
              <ul>
                {pieData.map((entry, index) => (
                  <li key={`li-${index}`} style={{ color: entry.color }}>
                    {entry.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default Header;
