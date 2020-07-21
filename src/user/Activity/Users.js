import React, { Component } from 'react'
import { Timeline } from "antd";
import "antd/dist/antd.css";
import './users.scss'
import { getMembers } from '../../actions/insightAction'
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { Pagination } from 'antd'
import { withRouter } from 'react-router-dom'

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

  render() {
    const { users } = this.state;
    return (
      <div className="activity__main__container">
        <div className="header__text">
          <p className="activity__header">Users activity</p>
        </div>
        <div className="timeline__container">
          <Timeline>
            {users.map((user, index) => (
              <Timeline.Item 
                key={index}
                onClick={() => this.props.history.push(`/activity/${user._id}`)}
              >
                <p className="activity__link">
                  {user.name.firstName + " " + user.name.lastName}
                </p>
                <p className="joined__on">
                  Joined on:{" "}
                  <Moment format="DD MMM YYYY">{user.createdAt}</Moment>
                </p>
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