import React, { Fragment, useState } from 'react';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Btn, H4, P, Image } from '../AbstractElements';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/images/logo/logo.png';
import logoDark from '../assets/images/logo/logo_dark.png';

const UnlockUser = ({ logoClassMain }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <Fragment>
      <section>
        <Container fluid={true} className='p-0 login-page'>
          <Row className='m-0'>
            <Col className='p-0'>
              <div className='login-card'>
                <div>
                  <div>
                  
                  </div>
                  <div className='login-main unlock-user'>
                    <Form className='theme-form login-form'>
                      <H4>Reset Your Password</H4>
                      <FormGroup className='position-relative'>
                        <Label className='col-form-label'>Enter your Email</Label>
                        <div className='position-relative'>
                          <Input className='form-control'  required placeholder='test@gmail.com' />
                          <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
                            <span className={togglePassword ? '' : 'show'}></span>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                     
                      </FormGroup>
                      <FormGroup>
                        <Btn attrBtn={{ className: 'd-block w-100', color: 'primary', type: 'submit' }}>Send </Btn>
                      </FormGroup>
                      <P attrPara={{ className: 'mb-0' }}>
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

export default UnlockUser;
