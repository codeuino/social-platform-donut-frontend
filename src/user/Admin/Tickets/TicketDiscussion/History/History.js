import React, { Component } from "react";
import Moment from "react-moment";
import { Timeline } from "antd";

class History extends Component {
  view = () => {};
  render() {
    return (
      <div style={{padding: "10px 2rem", overflowY: "scroll", height: "75vh"}}>
        <Timeline>
          {this.props.ticket.history.map((ele, index) => {
            return (
              <Timeline.Item key={index}>
                <div className="history-item" onClick={() => this.view()}>
                  <div className="line">
                    <h5>{ele.updatedBy}</h5>
                    <h5>
                      <Moment format="DD MMM YYYY">{ele.updatedAt}</Moment>
                    </h5>
                  </div>
                  <div className="line">
                    <p>{ele.content}</p>
                  </div>
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    );
  }
}

export default History;
