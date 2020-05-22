import React, { Component } from "react";
import "./DiscussionContent.scss";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import DiscussionComments from "./DiscussionComments/DiscussionComments";
import eventImg from "../../../../svgs/event-img-1.svg";

class DiscussionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="discussion-content">
        <div className="discussion-toppanel">
          <div className="discussion-title">
            <span className="title-text">Proposal Title Here</span>
          </div>
          <div className="discussion-desc"></div>
          <div className="discussion-buttons">
            <Button variant="primary" className="option-btn" size="sm" active>
              <span className="option-text">Edit</span>
            </Button>
          </div>
        </div>
        <div className="discussion-bottompanel">
          <div className="proposal-preview">
            <div className="proposal-text">
              <p>
                Fugiat esse aliquip sint culpa. Nulla amet ipsum non commodo
                veniam velit officia dolor laborum et aliquip ad velit veniam.
                Consequat mollit consequat adipisicing duis consectetur duis non
                fugiat et in elit consectetur sint. Mollit id aliqua commodo
                duis sint non. Officia sunt consectetur et officia officia ad
                officia aliquip qui enim aliquip officia minim. Minim consequat
                duis deserunt aliqua qui consectetur tempor ex aliquip occaecat
                ad veniam consectetur. Dolor et laboris sit esse laborum ex
                deserunt nisi magna eiusmod. Mollit non ipsum laboris nulla
                commodo enim elit magna amet. Quis officia incididunt aute elit
                veniam ullamco ea elit reprehenderit. Pariatur exercitation ut
                quis occaecat esse consectetur eu eiusmod ut et exercitation.
                Nisi pariatur eu deserunt aliqua cillum dolore. Dolore duis
                laboris occaecat incididunt minim aliqua.
              </p>
              <p>
                Heading Irure mollit mollit proident amet sunt ea deserunt do
                anim proident mollit. Aliquip fugiat quis ipsum est nisi ut
                magna excepteur aliquip reprehenderit occaecat. Ea enim officia
                labore consectetur et ad. Mollit ut duis nulla amet dolor minim
                laborum amet cillum velit. Incididunt elit quis ipsum velit esse
                eu adipisicing sint voluptate ea ipsum. Ullamco pariatur
                incididunt tempor qui voluptate id deserunt tempor. Consectetur
                mollit aute consequat ut non amet fugiat eiusmod. Cupidatat
                velit ea eu veniam proident irure ullamco dolor aliquip nisi
                minim. Nisi consequat sit ea anim duis in id mollit ipsum aute
                mollit commodo excepteur occaecat. Aliqua magna sunt in et duis
                veniam. Cillum in sunt sint officia. Dolor aliqua irure dolor
                adipisicing et culpa. Heading Cupidatat pariatur exercitation
                enim adipisicing qui labore officia cupidatat. Proident amet
                minim cupidatat proident velit in ea sint velit. Duis
                adipisicing excepteur cupidatat consequat ex non cupidatat ea
                non. Commodo ad anim. Cupidatat pariatur exercitation enim
                adipisicing qui labore officia cupidatat. Proident amet minim
                cupidatat proident velit in ea sint velit. Duis adipisicing
                excepteur cupidatat consequat ex non cupidatat ea non. Commodo
                ad anim.Cupidatat pariatur exercitation enim adipisicing qui
                labore officia cupidatat. Proident amet minim cupidatat proident
                velit in ea sint velit. Duis adipisicing excepteur cupidatat
                consequat ex non cupidatat ea non. Commodo ad anim.
              </p>
              <p>
                Heading Irure mollit mollit proident amet sunt ea deserunt do
                anim proident mollit. Aliquip fugiat quis ipsum est nisi ut
                magna excepteur aliquip reprehenderit occaecat. Ea enim officia
                labore consectetur et ad. Mollit ut duis nulla amet dolor minim
                laborum amet cillum velit. Incididunt elit quis ipsum velit esse
                eu adipisicing sint voluptate ea ipsum. Ullamco pariatur
                incididunt tempor qui voluptate id deserunt tempor. Consectetur
                mollit aute consequat ut non amet fugiat eiusmod. Cupidatat
                velit ea eu veniam proident irure ullamco dolor aliquip nisi
                minim. Nisi consequat sit ea anim duis in id mollit ipsum aute
                mollit commodo excepteur occaecat. Aliqua magna sunt in et duis
                veniam. Cillum in sunt sint officia. Dolor aliqua irure dolor
                adipisicing et culpa. Heading Cupidatat pariatur exercitation
                enim adipisicing qui labore officia cupidatat. Proident amet
                minim cupidatat proident velit in ea sint velit. Duis
                adipisicing excepteur cupidatat consequat ex non cupidatat ea
                non. Commodo ad anim. Cupidatat pariatur exercitation enim
                adipisicing qui labore officia cupidatat. Proident amet minim
                cupidatat proident velit in ea sint velit. Duis adipisicing
                excepteur cupidatat consequat ex non cupidatat ea non. Commodo
                ad anim.Cupidatat pariatur exercitation enim adipisicing qui
                labore officia cupidatat. Proident amet minim cupidatat proident
                velit in ea sint velit. Duis adipisicing excepteur cupidatat
                consequat ex non cupidatat ea non. Commodo ad anim.
              </p>
            </div>
            <div className="attached-images">
              <div className="images-title">Attached Images</div>
              <Row>
                <Image src={eventImg} rounded className="image-item" />
                <Image src={eventImg} rounded className="image-item" />
              </Row>
            </div>
          </div>
          <div className="comments">
            <DiscussionComments />
          </div>
        </div>
      </div>
    );
  }
}

export default DiscussionContent;
