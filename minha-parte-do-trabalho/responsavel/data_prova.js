import axios from "axios";
import React from "react";
import "react-calendar/dist/Calendar.css";
import { Table } from "react-bootstrap";
import Moment from 'moment';

const DataProva = () => {
  const isLoginTrue = JSON.parse(localStorage.getItem("login"));
  const login = isLoginTrue.user.email;
  const [provas, setProvas] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/provaslista")
      .then((response) => {
        setProvas(response.data.provas);
      })
      .catch((error) => setError(error.response.data.message));
  }, []);

  

  return (
    <div className="py-5 container">
      <div className="py-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Hora</th>
              <th>Materia</th>
            </tr>
          </thead>
          <tbody>
            {provas &&
              provas.map((provas) => (
                <tr>
                  <td>{Moment(provas.dia).format('LL')}</td>
                  <td> {provas.hora}</td>
                  <td>{provas.materia}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DataProva;