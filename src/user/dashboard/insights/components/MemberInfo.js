import React, { Component } from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import MemberIcon from '../../../../images/member.png'
import './memberInfo.scss'

class MemberInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    }
  }
  onBlockClick = (e) => {
    e.preventDefault();
    console.log('Block clicked!')
  }

   onTabClick = (tabName) => {
     console.log(`${tabName} is clicked`);
     this.props.onTabChange(tabName);
   }

  render() {
    const { view } = this.props;
    const members = [
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
      { name: "Bessie Pena", desgn: "UI/UX", loc: "California, US" },
    ];
    let popOverContent = (
      <Popover>
        <Popover.Title as="h2">{`Options`}</Popover.Title>
        <Popover.Content>
          <div className="list_group" style={{ listStyle: "none" }}>
            <Button 
              className="btn-danger button-outline-danger overlay_list_btn"
              onClick={this.onBlockClick}
              >Block</Button>
          </div>
        </Popover.Content>
      </Popover>
    );
    let membersList = members.map((member, index) => (
      <div className="single_member" key={index}>
        <img src={MemberIcon} alt="user" className="member_image img-fluid" />
        <div className="member_details">
          <div className="member_name_with_icon">
            <div className="row">
              <div className="col-md-10">
                <p className="member_name">{member.name}</p>
                <p className="member_designation">{member.desgn}</p>
                <p className="member_location">{member.loc}</p>
              </div>
              <div className="col-md-2 hamburger">
                <span className="dotted_hamberger">
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popOverContent}
                    rootClose
                  >
                    <svg
                      width="16"
                      height="4"
                      viewBox="0 0 16 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2   4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM6 2C6 0.9 6.9 0 8 0C9.1 0 10 0.9 10 2C10 3.1 9.1 4 8 4C6.9 4 6 3.1 6 2Z"
                        fill="#1A73E8"
                        className="path-name"
                      />
                    </svg>
                  </OverlayTrigger>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="right_main_container">
        <div className="right_view_container">
          <div className="right_view">
            <p className="right_view_header">Insight</p>
            <div className="right_view_content">
              <div className="switch_btn">
                <Button
                  className={view === 'org' ? "active_btn" : "inactive_btn"}
                  onClick={() => this.onTabClick("org")}
                >
                  Organization
                </Button>
                <Button
                  className={view === 'member' ? "active_btn" : "inactive_btn"}
                  onClick={() => this.onTabClick("member")}
                >
                  Members
                </Button>
              </div>
              <div className="members_overview">
                <input
                  type="text"
                  placeholder="Search"
                  className="search_bar"
                />
                <div className="members_list">{membersList}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MemberInfo;