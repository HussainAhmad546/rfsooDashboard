// import React, { Fragment } from 'react';
// import { Row, Col, Card, CardBody } from 'reactstrap';
// import { Btn } from '../../AbstractElements'
// import { CardFooter } from 'reactstrap';


// const BasicFormControlClass = () => {
//     return (
//         <Fragment>
//             <Card >
//                 <CardBody>
//                 <CardFooter className="text-end">
//                         <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Upload File</Btn>
//                         <Btn attrBtn={{ color: "secondary", type: "submit" }} >New Folder</Btn>
//                     </CardFooter>
//                     <Row className='mb-3'>
//                         <Col md="3" >
//                             <i className="icofont icofont-folder" me="icofont icofont-check" style={{ fontSize: '10rem', color: '#FFB81C', border:'1px solid red' }}></i>
//                         </Col>
//                         <Col md="3" >
//                             <i className="icofont icofont-folder" me="icofont icofont-check" style={{ fontSize: '10rem', color: '#FFB81C' }}></i>
//                         </Col>
//                         <Col md="3" >
//                             <i className="icofont icofont-folder" me="icofont icofont-check" style={{ fontSize: '10rem', color: '#FFB81C' }}></i>
//                         </Col>
//                         <Col md="3" style={{paddingTop: '23px' }}>
                      
//                         <i className="icofont icofont-file-text" style={{ fontSize: '7rem', color: 'black' }}></i>
//                         </Col>
//                     </Row>
//                     <Row className='mb-3'>
//                         <Col md="3" >
//                             <i className="icofont icofont-folder" me="icofont icofont-check" style={{ fontSize: '10rem', color: '#FFB81C' }}></i>
//                         </Col>
//                         <Col md="3" >
//                             <i className="icofont icofont-folder" me="icofont icofont-check" style={{ fontSize: '10rem', color: '#FFB81C' }}></i>
//                         </Col>
//                         <Col md="3" >
//                             <i className="icofont icofont-folder" me="icofont icofont-check" style={{ fontSize: '10rem', color: '#FFB81C' }}></i>
//                         </Col>
//                         <Col md="3" >
//                             <i className="icofont icofont-folder" me="icofont icofont-check" style={{ fontSize: '10rem', color: '#FFB81C' }}></i>
//                         </Col>
//                     </Row>
                    
//                 </CardBody>
//             </Card>
//         </Fragment>
//     );
// };

// export default BasicFormControlClass;

import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import FileContent from '../FileManager/FileContent';
import { Card, Col, Container, Row } from 'reactstrap';

const FileManagerContain = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Apps' title='File Manager' mainTitle='File Manager' />
      <Container fluid={true}>
        <Row>
          <Col xl='12' md='12' className='box-col-12'>
            <div className='file-content'>
              <Card>
                <FileContent />
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default FileManagerContain;
