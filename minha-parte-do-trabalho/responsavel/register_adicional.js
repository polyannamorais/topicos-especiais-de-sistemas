import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const RegisterProvaAdd = () => {
  const isLoginTrue = JSON.parse(localStorage.getItem("login"));
  const login = isLoginTrue.user.email;
    const [email, setEmail] = React.useState(null);
  const [post, setPost] = React.useState(null);
  const [error, setError] = React.useState(null);
const [nome, setNome] = React.useState(null);
const [valor, setValor] = React.useState(null);

React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/alunos")
      .then((response) => {
        console.log("response", response.data);
        setPost(response.data);
      })
      .catch((error) => setError(error.response.data.message));
  }, []);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post(`http://localhost:5000/api/alunos/${email}/materiaAdicional`, {
//         nome,
//         valor
//       })
//       .then((response) => {
//         console.log("response", response);
//         setPost(response.data);
//         setNome(""),
//         setValor("")
//       })
//       .catch((error) => setError(error.response.data.message));
//   };

const handleSubmit = (e) => {
    e.preventDefault();
    

    axios
      .post(`http://localhost:5000/api/alunos/${email}/materiaAdicional`, {
        nome,
        valor
      })
      .then((response) => {
        console.log("response", response);
        setNome("");
        setValor("");
      })
      .catch((error) => setError(error.response.data.message));

  };

  if (!post) return null;

  return (
    <Container className="py-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Aluno</Form.Label>
          <Form.Control required as="select" onChange={(e) => setEmail(e.target.value)}>
            <option>Selecione o Aluno</option>
            {post.map((post) => (
              <option>{post.email}</option>
            ))}
          </Form.Control>
          <br></br>
        </Form.Group>


        <Form.Group>

                  <Form.Control
                  required
                  placeholder="Nome da Matéria"
                  size="sm"
                    type="text"
                    id="nome"
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />


                  <Form.Control
                  required
                  placeholder="Valor da Matéria"
                  size="sm"
                    type="text"
                    label="valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />

<div class="p-3"> </div>
        </Form.Group>
              
        <Button variant="primary" type="submit" >
          Enviar
        </Button>
        
      </Form>
    </Container>
  );
};

export default RegisterProvaAdd;