import React, { Component } from "react";
import "./org-contact.scss";
import { Avatar, CardContent } from '@material-ui/core';
import { connect } from 'react-redux'
import { getOrgProfile } from '../../../actions/orgAction'
import { Card, ListGroup } from 'react-bootstrap';

class OrgContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            website: '',
            email: '',
            admins: [],
            moderators: []
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log('org contacts ', nextProps)
        const { contactInfo } = nextProps.org?.org
        this.setState({website: contactInfo?.website, email: contactInfo?.email })
    }
    render() {
        return (
            <div className="contact">
                <h2>Contact</h2>
                <Card className="contact-us">
                    <Card.Body>
                        <div className="contact__content">
                            <p className="initial">Email</p><br/>
                            <ListGroup className="contact__content__collection">
                                {this.props.admins.map(i => { return <ListGroup.Item className="contact_item"> <Avatar className="avatar" alt='Random'>R</Avatar> <div className="data_container"><span className="data">{i.email}</span> <span className="designation">{i.designation}</span></div> </ListGroup.Item>})}
                            </ListGroup>
                        </div>
                        <div className="contact__content">
                            <p className='initial'>Website</p>
                            <ListGroup className="contact__content__collection">
                                 <ListGroup.Item className="contact_item"> {this.state.website}</ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className='contact__content'>
                            <p className="initial">Community email</p>
                            <ListGroup className="contact__content__collection">
                                 <ListGroup.Item className="contact_item"> {this.state.email}</ListGroup.Item>
                            </ListGroup>
                            <p></p>
                        </div>
                        
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
// map state to props 
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
    org: state.org
})
export default connect(mapStateToProps,  { getOrgProfile })(OrgContact);
