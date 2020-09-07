import React, { Component } from "react";
import "./org-contact.scss";
import { Card, Avatar, CardContent } from '@material-ui/core';
import { connect } from 'react-redux'
import { getOrgProfile } from '../../../actions/orgAction'

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
                    <CardContent>
                        <div className="email-content">
                            <p className="initial">Email</p><br/>
                            <div className="email-info">
                                {this.props.admins.map(i => { return <div className='info'> <Avatar className="avatar" alt='Random'>R</Avatar> <p>{i.email}</p> </div> })}
                            </div>
                            <div className='designation'>
                                {this.props.admins.map(i => { return <p>{i.designation}</p> })}
                            </div>
                        </div>
                        <div className="email-content">
                            <p className='initial'>Website</p>
                            <p className='info'>{this.state.website}</p>
                            <p className='hidden'>Community</p>
                        </div>
                        <div className='email-content'>
                            <p className="initial">Community email</p>
                            <p className='info'>{this.state.email}</p>
                            <p></p>
                        </div>
                    </CardContent>
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
