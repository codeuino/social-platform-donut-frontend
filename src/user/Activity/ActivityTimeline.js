import React from 'react'
import { Timeline } from "antd";
import "antd/dist/antd.css";
import './activityTimeline.scss'
import { Pagination } from 'antd'

export default function ActivityTimeline() {
  const activity = [{
      type: "Post",
      text: "User X created a post!",
    },
    {
      type: "Project",
      text: "User X created a Project!",
    },
    {
      type: "Event",
      text: "User X created an Event!",
    },
    {
      type: "Comment",
      text: "User X commented on GSOC !",
    },
    {
      type: "Post",
      text: "User X created a post!",
    },
    {
      type: "Event",
      text: "User X created an Event!",
    },
    {
      type: "Comment",
      text: "User X commented on GSOC !",
    },
    {
      type: "Post",
      text: "User X created a post!",
    },
    {
      type: "Event",
      text: "User X created an Event!",
    },
    {
      type: "Comment",
      text: "User X commented on GSOC !",
    },
    {
      type: "Post",
      text: "User X created a post!",
    },
    {
      type: "Event",
      text: "User X created an Event!",
    },
    {
      type: "Comment",
      text: "User X commented on GSOC !",
    },
  ];

  const onShowSizeChange = (currentPage, pageSize) => {
    console.log('currentPage pageSize ', currentPage, pageSize)
    // this.props.getMembers(pageSize, currentPage)
  }

  const handlePagination = (pageNumber) => {
    console.log('page number ', pageNumber);
    // this.props.getMembers(10, pageNumber)
  }

  return (
    <div className="activity__timeline">
      <div className="activity__timeline__header__container">
        <p className="activity__timeline__header">User activity</p>
      </div>
      <div className="activities__list">
        <Timeline>
          {activity.map((act, index) => (
            <Timeline.Item
              key={index}
            >
              <p className="activity__link">{act.text}</p>
            </Timeline.Item>
          ))}
        </Timeline>
        <div className="pagination__container">
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              total={500}
              onChange={handlePagination}
            />
          </div>
      </div>
    </div>
  )
}
