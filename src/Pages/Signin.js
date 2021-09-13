import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toaster from '../Components/Toaster';
import Cookies from 'js-cookie';

const Signin = () => {
  const [validated, setValidated] = useState(false);
  const auth = getAuth();
  const [toastType, setToastType] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('')

  const handleLogin = (e)=>{
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      const email = form.elements['email'].value;
      const password = form.elements['password'].value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          Cookies.set('user', JSON.stringify(user), { expires: 1 })
          setToastMsg('Successful');
          setToastType('Success');
          setShowToast(true)
          setTimeout(()=>{setShowToast(false); window.location.href = '/'}, 3000)
        })
        .catch((error) => {
          const errorCode = error.code;
          //const errorMessage = error.message;
          console.log(errorCode)
          if(errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password'){
            setToastMsg('Invalid Email/Password');
            setToastType('Error');
            setShowToast(true)
            setTimeout(()=>{setShowToast(false)}, 3000)
          }
          else if(errorCode === 'auth/too-many-requests'){
            setToastMsg('Something went wrong. Please try again.');
            setToastType('Warning');
            setShowToast(true)
            setTimeout(()=>{setShowToast(false)}, 3000)
          }
        });

    }
    else {
      setToastMsg('Please provide all required fields');
      setToastType('Error');
      setShowToast(true)
      setTimeout(()=>{setShowToast(false)}, 3000)
    }

    setValidated(true);
  }
  return (
    <div>
      {showToast ? <Toaster toastType={toastType} toastMsg = {toastMsg}/>: '' }

      <Container className="">
        <Row className="w-100">
          <Col sm={12} md={6} className="signin-image-container p-3"><img alt="Login" className="img-fluid" src="/undraw_secure_login_.svg" /></Col>
          <Col sm={12} md={6} className="signin-form-container d-flex flex-column justify-content-between p-3">
            <Row>
              <Col><h1 className = "text-center">Signin</h1></Col>
            </Row>
            <Form noValidate validated={validated} onSubmit = {handleLogin} id="login-form">
              <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" name="email" required />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please provide email!</Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Password" name="password" required />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please provide password!</Form.Control.Feedback>
              </FloatingLabel>
              <Row className = "pt-3">
                <Col>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Col>
                <Col className = "align-items-center col d-flex justify-content-end"><Link to="/signup">Create a new account</Link></Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Signin
