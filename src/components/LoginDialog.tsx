import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap";

type LoginDialogProbs = {
  readonly onClose: () => void;
}

export function LoginDialog(props: LoginDialogProbs) {
  
  const [userID, setUserID] = useState("") ;
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const pending = useSelector((state: RootState) => state.auth.pending);

  const handleLogin = async () => {
    try {
      //trennt error von thunk action
      await dispatch(login({ userID, password })).unwrap()
      props.onClose();
      navigate("/users")
    } catch (err: any) {
      console.log(err)
      setError(err.message ?? "Unkown error");
    }
  };

  return (
    <>
      <Modal show={true} onHide={props.onClose} id="LoginDialog">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control id="LoginDialogUserIDText" type="userID" onChange={(e) => setUserID(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>password</Form.Label>
              <Form.Control id="LoginDialogPasswordText" type="password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
          </Form>
          {error && <div className="alert alert-danger mt-3" >{error.toString()}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin} id="PerformLoginButton">
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      {pending && (
        <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(255,255,255,0.5)", zIndex: 1056 }}
        >
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
}
