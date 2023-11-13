import { Container } from 'reactstrap';
import React, {  useState } from 'react';
import {  FormGroup, Label, Row, Col } from 'reactstrap';
import { Btn, P } from '../AbstractElements';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import image from '../assets/images/logo/logo.png'

const Register = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    lastName: '',
  };

  const backendUrl = 'https://rfsoo-backend.vercel.app';

  const validationSchema = Yup.object({
    username: Yup.string().max(10, 'First name should be 10 characters or less.').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,15})/,
        'Password should be between 8 to 15 characters with one capital letter, at least one number, and one special character.'
      )
      .required('Required'),
    lastName: Yup.string().max(15, 'Last Name must not exceed 15 characters'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, values);
      toast.success(response.data.message);
      setSubmitting(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
      setSubmitting(false);
    }
  };

  return (
    <Container fluid={true} className='p-0'>
      <div className='login-card'>
        <div className='login-main'>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className='theme-form login-form'>
              {/* Logo on top */}
            <div className="text-center mb-1">
              <img src={image} alt="Logo" height={80}/>
            </div>
              <h4>Create your account</h4>
              <P>Enter your personal details to create account</P>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Your Name</Label>
                <Row className='g-2'>
                  <Col xs='6'>
                    <Field type='text' className='form-control' name='username' placeholder='First Name' />
                    <ErrorMessage name='username' component='div' className='text-danger' />
                  </Col>
                  <Col xs='6'>
                    <Field type='text' className='form-control' name='lastName' placeholder='Last Name' />
                    <ErrorMessage name='lastName' component='div' className='text-danger' />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Email Address</Label>
                <Field type='email' className='form-control' name='email' placeholder='test@gmail.com' />
                <ErrorMessage name='email' component='div' className='text-danger' />
              </FormGroup>
              <FormGroup className='position-relative'>
                <Label className='col-form-label m-0 pt-0'>Password</Label>
                <Field type={togglePassword ? 'text' : 'password'} className='form-control' name='password' placeholder='*********' />
                <ErrorMessage name='password' component='div' className='text-danger' />
                <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
                  <span className={togglePassword ? '' : 'show'}></span>
                </div>
              </FormGroup>
              <FormGroup className='m-0'>
                <div className='checkbox'>
                  <Field type='checkbox' id='checkbox1' name='agree' />
                  <label htmlFor='checkbox1' className='text-muted'>
                    Agree with <span>Privacy Policy</span>
                  </label>
                </div>
              </FormGroup>
              <FormGroup>
                <Btn type="submit" attrBtn={{ className: 'd-block w-100', color: 'primary' }}>Create Account</Btn>
              </FormGroup>
              <P attrPara={{ className: 'mb-0 text-start' }}>
                Already have an account?
                <Link className='ms-2' to='/login'>
                  Sign in
                </Link>
              </P>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default Register;


