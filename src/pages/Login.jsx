import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import '../styles/login.css';
import loginImage from "../../public/images/login.svg"

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    navigate('/home');
  };

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  return (
    <Container fluid className="login-container align-center">
      <Container className="login-wrapper align center">
        <Row className="login-box justify-content-center">
          
          <Col xs={12} sm={10} md={6} lg={6} xl={6} className="form-section p-4 p-md-5">
            <div className="form-content">
              <h3 className="fw-bold mb-3">Sign In</h3>
              <p className="mb-4 fw-bold">
                New user? <a href="#" className="text-decoration-none">Create an account</a>
              </p>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="User name or email"
                    {...register('email', { required: 'Email is required' })}
                    isInvalid={errors.email}
                    className="form-control-custom"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value: passwordRegex,
                        message:
                          'Minimum 8 characters with 1 uppercase, 1 number & 1 symbol',
                      },
                    })}
                    isInvalid={errors.password}
                    className="form-control-custom"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Form.Check id="keepSignedIn" className="keepSign" />
                    <Form.Label htmlFor="keepSignedIn" className="mb-0 small">
                      Keep me signed in
                    </Form.Label>
                  </div>

                </Form.Group>

                <Button type="submit" variant="dark" className="w-100 btn-custom mb-4 login-btn">
                  Sign In
                </Button>
              </Form>

              <div className="social-section text-center">
                <div className="divider mb-3">
                  <span>Or Sign In With</span>
                </div>
                <div className="d-flex justify-content-center gap-3 social-icons">
                  <div className="social-icon">
                    <FaGoogle size={18} />
                  </div>
                  <div className="social-icon">
                    <FaFacebookF size={18} />
                  </div>
                  <div className="social-icon">
                    <FaLinkedinIn size={18} />
                  </div>
                  <div className="social-icon">
                    <FaTwitter size={18} />
                  </div>
                </div>
              </div>
            </div>
          </Col>

      
          <Col md={6} lg={6} xl={6} className="d-none d-md-flex align-items-center justify-content-center image-section">
            <div className="image-content">
              <img
                src={loginImage}
                alt="loginImage"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;