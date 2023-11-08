
import { Container } from 'reactstrap';
import React, { Fragment, useState } from 'react';
import { Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Btn, H4, P, H6, Image } from '../AbstractElements';
import { Link } from 'react-router-dom';

const Register = ({ logoClassMain }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <Fragment>
      <section>
        <Container fluid={true} className='p-0'>
          <Row className='m-0'>
            <Col className='p-0'>
            <div className='login-card'>
        <div>
          
          <div>
      
          </div>
          <div className='login-main'>
            <Form className='theme-form login-form'>
              <H4>Create your account</H4>
              <P>Enter your personal details to create account</P>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Your Name</Label>
                <Row className='g-2'>
                  <Col xs='6'>
                    <Input className='form-control' type='text' required='' placeholder='Fist Name' />
                  </Col>
                  <Col xs='6'>
                    <Input className='form-control' placeholder='Last Name' />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Email Address</Label>
                <Input className='form-control' type='email' required='' name='email' />
              </FormGroup>
              <FormGroup className='position-relative'>
                <Label className='col-form-label m-0 pt-0'>Password</Label>
                <div className='position-relative'>
                  <Input className='form-control' type={togglePassword ? 'text' : 'password'}  required placeholder='*********' />
                  <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
                    <span className={togglePassword ? '' : 'show'}></span>
                  </div>
                </div>
              </FormGroup>
              <FormGroup className='m-0'>
                <div className='checkbox'>
                  <Input id='checkbox1' type='checkbox' />
                  <Label className='text-muted' for='checkbox1'>
                    Agree with <span>Privacy Policy</span>
                  </Label>
                </div>
              </FormGroup>
              <FormGroup>
                <Btn attrBtn={{ className: 'd-block w-100', color: 'primary' }}>Create Account</Btn>
              </FormGroup>
           
           
              <P attrPara={{ className: 'mb-0 text-start' }}>
                Already have an account?
                <Link className='ms-2' to='/login'>
                  Sign in
                </Link>
              </P>
            </Form>
          </div>
        </div>
      </div>

            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Register;
