import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiox from "axios";
import logo from "../assets/img/logo.png";
import {
  Stack,
  Form,
  Button,
  Row,
  Container,
  Navbar,
  Nav,
  Image,
  Alert,
} from "react-bootstrap";

const Login = ({ setLogoutUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    axiox
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
        tipo,
      })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
            user: response.data.access_user,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        setTipo("");
        setLogoutUser(false);

        if (tipo === "Professor") {
          history.push("/professor");
        }
        if (tipo === "Aluno") {
          history.push("/aluno");
        }
        if (tipo === "Responsavel") {
          history.push("/responsavel");
        }
        if (tipo === "Secretaria") {
            history.push("/secretaria");
          }
      })
      .catch((error) => setError(error.response.data.message));
  };

  function Alerta() {
    return (
      <div>
        {error && (
          <Alert variant="danger">
            <Alert.Heading>{error}</Alert.Heading>
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Nav.Link href="/">
              <Image src={logo} width="50" height="30" /> Escola
            </Nav.Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Stack gap={2} className="col-md-5 mx-auto pt-5">
        <Form autoComplete="off" onSubmit={login}>
          <h3>Login</h3>
          <Alerta />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            required
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                label="Aluno"
                
                inline
                checked={tipo === "Aluno"}
                onChange={handleChange}
                value="Aluno"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <Form.Check

                inline
                label="Professor"
                checked={tipo === "Professor"}
                onChange={handleChange}
                value="Professor"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <Form.Check

                inline
                label="Responsavel"
                checked={tipo === "Responsavel"}
                onChange={handleChange}
                value="Responsavel"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <Form.Check
              
                inline
                label="Secretaria"
                checked={tipo === "Secretaria"}
                onChange={handleChange}
                value="Secretaria"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Form.Group>
          </Row>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Stack>
    </div>
  );
};

export default Login;