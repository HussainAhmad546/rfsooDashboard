import React, { Fragment, useState, useContext , useEffect} from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { EmailAddress, ForgotPassword, Password, RememberPassword, SignIn } from "../Constant";
import { useNavigate } from "react-router-dom";
import CustomizerContext from "../_helper/Customizer";
import OtherWay from "./OtherWay";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import image from '../assets/images/logo/logo.png'
const Signin = ({ selected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const loginAuth = async (e) => {
    e.preventDefault();

    const backendUrl = 'https://rfsoo-backend.vercel.app';
  
    try {
      setLoading(true);
      console.log('Sending request with data:', { userEmail: email, password: password });
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        userEmail: email,
        password: password,
      });
  
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Update the user state
      setUser(user);
      setToken(token);
  
      history('/Home');
      toast.success("Successfully logged in!..");
      window.location.reload();
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error logging in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                
                <Form className="theme-form">
                  {/* Logo on top */}
            <div className="text-center mb-1">
              <img src={image} alt="Logo" height={80}/>
            </div>
                  <H4>{selected === "simpleLogin" ? "" : "Sign In With Simple Login"}</H4>
                  <P>{"Enter your email & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email" required />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input className="form-control" type={togglePassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password" required />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>
                  <div className="position-relative form-group mb-0">
                    <div className="checkbox">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <a className="link" href="forget">
                      {ForgotPassword}
                    </a>
                    <button className="d-block w-100 mt-2 signin-button text-white p-1 rounded-top rounded-bottom border-none" onClick={(e) => loginAuth(e)} disabled={loading}>
                      {loading ? 'Logging in...' : SignIn}
                    </button>
                  </div>
                  <OtherWay />
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;

