import React, { Component } from 'react'
import { Timeline } from "antd";
import "antd/dist/antd.css";
import './users.scss'
import { getMembers } from '../../actions/insightAction'
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { Pagination } from 'antd'
import { withRouter } from 'react-router-dom'
import Img from '../../assets/images/userIcon2.jpg'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      error: "",
      hashMore: false,
    };
  }

  componentDidMount() {
    this.props.getMembers();
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps ", nextProps);
    const { insight } = nextProps;
    this.setState({
      users: insight?.allMembers,
    });
  }

  onShowSizeChange = (currentPage, pageSize) => {
    console.log('currentPage pageSize ', currentPage, pageSize)
    this.props.getMembers(pageSize, currentPage)
  }

  handlePagination = (pageNumber) => {
    console.log('page number ', pageNumber);
    this.props.getMembers(10, pageNumber)
  }

  handleViewOption = (name, userId) => {
    this.props.history.push(`/activity/${userId}`);
    this.props.handleOption.changeOption(name)
  }

  render() {
    const { users } = this.state;
    return (
      <div className="activity__main__container">
        <div className="header__text">
          <p className="activity__header">Users List</p>
        </div>
        <div className="timeline__container">
          <Timeline>
            {users.map((user, index) => (
              <Timeline.Item 
                key={index}
                onClick={() => this.handleViewOption("details", user._id)}
              >
                <div className="user__wrapper">
                  <img src={Img} alt="user_image" className="user__image mr-2"/>
                  <div className="name_wrapper">
                    <p className="activity__link">
                      {user.name.firstName + " " + user.name.lastName}
                    </p>
                    <p className="joined__on">
                      Joined on:{" "}
                      <Moment format="DD MMM YYYY">{user.createdAt}</Moment>
                    </p>
                  </div>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
          <div className="pagination__container">
            <Pagination
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              defaultCurrent={1}
              total={500}
              onChange={this.handlePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  insight: state.insight
})

export default connect(mapStateToProps, { getMembers })(withRouter(Users));