import React from "react";
import "./History.scss";
import "antd/dist/antd.css";
import { Timeline } from "antd";
import Moment from 'react-moment'

const History = (props) => {
  const { page, view } = props;
  return (
    <div className="history">
      <Timeline>
        {page.history.map((ele, index) => {
          const body = JSON.parse(ele.body);
          return (
            <Timeline.Item key={index}>
              <div className="history-item" onClick={() => view(body.commit)}>
                <div className="line">
                  <h5>{ele.user.login}</h5>
                  <h5><Moment format="DD MMM YYYY">{ele.created_at}</Moment></h5>
                </div>
                <div className="line">
                  <p>{body.comment}</p>
                  <a
                    href={`${ele.html_url.substring(
                      0,
                      ele.html_url.indexOf("/issues")
                    )}/commit/${body.commit}`}
                  >
                    <p>{body.commit.substring(0, 8)}</p>
                  </a>
                </div>
              </div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
};

export default History;
