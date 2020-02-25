import React, { Component } from "react";
import { Row, Col} from "react-bootstrap";
import user1 from "../../../images/user1.png";
import user2 from "../../../images/user2.png";
import "./Contact.scss";

class Contact extends Component{
    render(){
        return(
            <div>
                <div className="header">Contact</div>
                <div className="container contact">
                <Row className="row">
                    <Col xs={2}className="contact-title">Email</Col>
                    <Col className="p-0">
                    <div className="contact-body"><img src={user1} alt="icon"/>hello@codeuino.com</div>
                    <div className="contact-body"><img src={user2} alt="icon"/>ricardo.murphy.@gmail.com</div>
                    <div className="contact-body"><img src={user2} alt="icon"/>ricardo.murphy.@gmail.com</div>
                    </Col>
                    <Col xs={3} className="p-0">
                    <div className="contact-tag">COMMUNITY</div>
                    <div className="contact-tag">ADMIN</div>
                    <div className="contact-tag">MODERATOR</div>
                    </Col>
                </Row>
                <Row className="row">
                    <Col xs={2}className="contact-title">Website</Col>
                    <Col>www.codeuino.com</Col>
                </Row>
                <Row className="row">
                    <Col xs={2}className="contact-title">Contact</Col>
                    <Col>
                    <div className="contact-body">Ricardo Murphy : +9080706050</div>
                    <div className="contact-body">Ricardo Murphy 2 : +9080706050</div>
                    </Col>
                </Row>
                </div>
            </div>
        );
    }
}

export default Contact;

