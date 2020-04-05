import React, { Component } from "react";
import "./org-contact.scss";
import { Card, Avatar, CardContent } from '@material-ui/core';

class OrgContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="contact">
                <h2>Contact</h2>
                <Card className="contact-us">
                    <CardContent>
                        <div className="email-content">
                            <p className="initial">Email</p>
                            <div className="email-info">
                                {this.props.admins.map(i => { return <div className='info'> <Avatar className="avatar" alt='Random'>R</Avatar> <p>{i.email}</p> </div> })}
                            </div>
                            <div className='designation'>
                                {this.props.admins.map(i => { return <p>{i.designation}</p> })}
                            </div>
                        </div>
                        <div className="email-content">
                            <p className='initial'>Website</p>
                            <p className='info'>{this.props.website}</p>
                            <p className='hidden'>Community</p>
                        </div>
                        <div className='email-content'>
                            <p className="initial">Contact</p>
                            <p className='info'>{this.props.contactinfo}</p>
                            <p></p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default OrgContact;
