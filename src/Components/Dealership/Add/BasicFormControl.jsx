import React, { Fragment } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { H5 ,Btn} from '../../../AbstractElements'
import {CardHeader,CardFooter} from 'reactstrap';
// import FooterCard from '../Common/FooterCard';
import { Data } from './Data';

const BasicFormControlClass = () => {
    return (
        <Fragment>
            <Card>
            <CardHeader > <H5> Add Dealer</H5>   </CardHeader>
                <Form className="form theme-form">
                    <CardBody>
                        <Row className='mb-3'>

                        { Data.map((item, index) => ( 
                            <Col  md="4" key={index}>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">{item.title}</Label>
                                    <Input className="form-control" name={item.name} type={item.type} placeholder={item.placeholder} />
                                </FormGroup>
                            </Col>

                         ))}

                        </Row>
                      
                    </CardBody>
                    <CardFooter className="text-end">
                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Submit</Btn>
                <Btn attrBtn={{ color: "secondary", type: "submit" }} >Cancel</Btn>
                 </CardFooter>
                </Form>
            </Card>
        </Fragment>
    );
};

export default BasicFormControlClass;