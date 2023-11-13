import React, { Fragment, useState } from 'react';
import { Col, Card, CardHeader, Row } from 'reactstrap';
// import CountUp from 'react-countup';
import { H6, Image, LI, UL } from '../../../src/AbstractElements';
import { BOD, ContactUs, ContactUsNumber, DDMMYY, Designer, Email, Follower, Following, LocationDetails, MarekjecnoMailId, MarkJecno, Location } from '../../Constant';
import ProfileModal from './ProfileModal';

const UserProfile = () => {
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

    // State to hold form values
    const [formData, setFormData] = useState({
      email: '',
      location: '',
      contact: '',
    });
  
    // State to hold the selected image file
    const [selectedImage, setSelectedImage] = useState(null);
  
    // Function to open the modal
    const openModal = () => {
      setShowModal(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setShowModal(false);
    };
  
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Here, you can handle the form submission, including sending the form data and the selectedImage to the server.
      // Don't forget to handle the image upload properly.
  
      // After handling the submission, you can close the modal.
      closeModal();
    };
  
    // Function to handle image selection
    const handleImageSelection = (e) => {
      const file = e.target.files[0];
      setSelectedImage(file);
    };

  const readUrl = (event) => {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setUrl(reader.result);
    };
  };
  return (
    <Fragment>
      <Col sm='12'>
        <Card className='hovercard text-center'>
          <CardHeader className='cardheader'></CardHeader>
          <div className='user-image'>
            <div className='avatar'>
              <Image attrImage={{ className: 'step1', alt: '', src: `${url ? url : require('../../assets/images/user/7.jpg')}` }} />
            </div>
            <div className='icon-wrapper step2' data-intro='Change Profile image here' style={{border:'1px solid red'}}>
              <i className='icofont icofont-pencil-alt-5' onChange={(e) => readUrl(e)}>
                <input className='upload' type='file' onChange={(e) => readUrl(e)} />
              </i>
            </div>
              {/* <div>
            <div className='icon-wrapper step2' data-intro='Change Profile image here'>
              <i className='icofont icofont-pencil-alt-5' onClick={() => setShowModal(true)}>

              </i>
            </div>
          </div> */}
          <ProfileModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            handleImageSelection={handleImageSelection}
          />
          </div>
          <div className='info'>
            <Row className='step3' data-intro='This is the your details'>
              <Col sm='6' lg='4' className='order-sm-1 order-xl-0'>
                <Row>
                  <Col md='6'>
                    <div className='ttl-info text-start'>
                      <H6>
                        <i className='fa fa-envelope me-2'></i> {Email}
                      </H6>
                      <span>{MarekjecnoMailId}</span>
                    </div>
                  </Col>
                  <Col md='6'>
                    <div className='ttl-info text-start ttl-sm-mb-0'>
                      <H6>
                        <i className='fa fa-calendar me-2'></i>
                        {BOD}
                      </H6>
                      <span>{DDMMYY}</span>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm='12' lg='4' className='order-sm-0 order-xl-1'>
                <div className='user-designation'>
                  <div className='title'>
                    <a target='_blank' href='#javascript'>
                      {MarkJecno}
                    </a>
                  </div>
                  <div className='desc mt-2'>{Designer}</div>
                </div>
              </Col>
              <Col sm='6' lg='4' className='order-sm-2 order-xl-2'>
                <Row>
                  <Col md='6'>
                    <div className='ttl-info text-start ttl-xs-mt'>
                      <H6>
                        <i className='fa fa-phone me-2'></i>
                        {ContactUs}
                      </H6>
                      <span>{ContactUsNumber}</span>
                    </div>
                  </Col>
                  <Col md='6'>
                    <div className='ttl-info text-start ttl-sm-mb-0'>
                      <H6>
                        <i className='fa fa-location-arrow me-2'></i>
                        {Location}
                      </H6>
                      <span>{LocationDetails}</span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};

export default UserProfile;
