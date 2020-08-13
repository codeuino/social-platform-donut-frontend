import React, { Component } from "react";
import Navigation from "../dashboard/navigation/navigation";
import { Grid, CardActions, Card } from "@material-ui/core";
import { Row, Col, Button } from "react-bootstrap";
import "./events.scss";
import Popups from "./popups/popups";
import DeleteEvent from "./popups/DeleteEvent";
import EditEvent from "./popups/EditEvent";
import { connect } from "react-redux";
import { getAllEvents } from "../../actions/eventAction";
import { checkDeleteRights } from "../dashboard/utils/checkDeleteRights";
import { getOrgProfile } from "../../actions/orgAction";
import { Pagination } from "antd";
import Moment from "react-moment";
import { canEditCheck } from "../projects/Utils/CanEdit";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: true,
      modalShow: false,
      optionValue: {},
      delete: false,
      edit: false,
      allEvents: [],
      eventId: "",
      singleEvent: {},
      editAllowed: true,
      editingLimit: "",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getAllEvents(); // by default 6 events per page
      this.props.getOrgProfile();
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("events nextProps", nextProps);
    const { allEvents } = nextProps.event;
    this.setState(
      {
        allEvents: allEvents,
        isAdmin: nextProps.auth?.isAdmin,
        editAllowed: nextProps.org.org?.options?.settings?.canEdit,
        editingLimit: nextProps.org.org?.options?.settings?.editingLimit,
      },
      () => {
        console.log("updating all events ", this.state);
      }
    );
  }

  onShowSizeChange = (currentPage, pageSize) => {
    console.log("currentPage pageSize ", currentPage, pageSize);
    this.props.getAllEvents(pageSize, currentPage);
  };

  handlePagination = (pageNumber) => {
    console.log("page number ", pageNumber);
    this.props.getAllEvents(6, pageNumber);
  };

  render() {
    const { allEvents, editingLimit } = this.state;

    const handleToggle = (eventId, event) => {
      console.log("-handletoggel", eventId);
      this.setState({ modalShow: true, eventId: eventId, singleEvent: event });
    };

    const editEvent = (eventId, eventInfo) => {
      console.log("eventId ", eventId);
      this.setState({
        modalShow: false,
        edit: true,
        eventId: eventId,
        singleEvent: eventInfo,
      });
    };

    const handleDelete = (eventId) => {
      console.log("eventId ", eventId);
      this.setState({ modalShow: false, delete: true, eventId: eventId });
    };

    const cancel = () => {
      this.setState({ delete: false, edit: false });
    };

    const FooterOfEvents = ({ Item }) => {
      return (
        <div className="row">
          <div className="footer__buttons col-md-6 col-sm-12 col-lg-6">
            <span>
              {checkDeleteRights(Item.createdBy._id) ? (
                <div>
                  <span
                    className={
                      !canEditCheck(editingLimit, Item.createdAt)
                        ? "disable__edit mr-3"
                        : "footer__btn mr-3"
                    }
                    onClick={editEvent.bind(this, Item._id, Item)}
                  >
                    Edit
                  </span>
                  <span
                    className="footer__btn"
                    onClick={handleDelete.bind(this, Item._id)}
                  >
                    Delete
                  </span>
                </div>
              ) : null}
            </span>
          </div>
          <div className="col-md-6">
            <Button
              size="sm"
              variant="light"
              onClick={handleToggle.bind(this, Item._id, Item)}
              style={{ float: "right" }}
              id={Item._id}
            >
              <span style={{ color: "#007bff" }}>See More</span>
            </Button>
          </div>
        </div>
      );
    };

    let Events = allEvents?.map((Item, index) => (
      <Grid item xs={6} sm={4} key={index} className="card__container">
        {Date.parse(Item.eventDate) >= Date.parse(new Date()) ? (
          <Card>
            <CardActions>
              <Grid container spacing={1}>
                <Row>
                  <Col xs={1}>
                    {Item.isCancelled ? (
                      <div className="cancelled">{""}</div>
                    ) : (
                      <div className="div-upcoming">{""}</div>
                    )}
                  </Col>
                  <Col sm={3} xs={12}>
                    <Moment className="div2" format="D" withTitle>
                      {Item?.eventDate}
                    </Moment>
                  </Col>
                  <Col sm={5} xs={12}>
                    <div className="div3">
                      <Moment format="ddd, MMM YYYY">{Item?.eventDate}</Moment>
                    </div>
                  </Col>
                </Row>
                <div className="inside">
                  <Grid item xs={12}>
                    <p className="eventName">{Item?.eventName}</p>
                    <p className="short-des">
                      {Item?.description?.shortDescription}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    <p className="short-des">
                      Time :
                      {Item.isCancelled ? (
                        <span className="timing3">
                          <Moment format="hh:mm A">{Item?.eventDate}</Moment>
                        </span>
                      ) : (
                        <span className="timing1">
                          <Moment format="hh:mm A">{Item?.eventDate}</Moment>
                        </span>
                      )}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    {!Item?.isCancelled ? (
                      Item?.isOnline ? (
                        <p className="event-location1">
                          <span className="timing1">Online</span>
                        </p>
                      ) : (
                        <p className="event-location1">
                          <span className="timing1">{Item?.location}</span>
                        </p>
                      )
                    ) : (
                      <p className="timing3">CANCELLED</p>
                    )}
                  </Grid>
                  <Grid item sm={12}>
                    <FooterOfEvents Item={Item} />
                  </Grid>
                </div>
              </Grid>
            </CardActions>
          </Card>
        ) : (
          <Card>
            <CardActions>
              <Grid container spacing={1}>
                <Row>
                  <Col xs={1}>
                    {Item.isCancelled ? (
                      <div className="cancelled">{""}</div>
                    ) : (
                      <div className="div-past">{""}</div>
                    )}
                  </Col>
                  <Col sm={3} xs={12}>
                    <Moment className="div2" format="D" withTitle>
                      {Item?.eventDate}
                    </Moment>
                  </Col>
                  <Col sm={5} xs={12}>
                    <div className="div3">
                      <Moment format="ddd, MMM YYYY">{Item?.eventDate}</Moment>
                    </div>
                  </Col>
                </Row>
                <div className="inside">
                  <Grid item xs={12}>
                    <p className="eventName">{Item.eventName}</p>
                    <p className="short-des">
                      {Item.description.shortDescription}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    <p className="short-des">
                      Time :
                      {Item.isCancelled ? (
                        <span className="timing3">
                          <Moment format="hh:mm A">{Item?.eventDate}</Moment>
                        </span>
                      ) : (
                        <span className="timing1">
                          <Moment format="hh:mm A">{Item?.eventDate}</Moment>
                        </span>
                      )}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    {!Item.isCancelled ? (
                      Item.isOnline ? (
                        <p className="event-location1">
                          <span className="timing2">Online</span>
                        </p>
                      ) : (
                        <p className="event-location1">
                          <span className="timing2">{Item.location}</span>
                        </p>
                      )
                    ) : (
                      <p className="timing3">CANCELLED</p>
                    )}
                  </Grid>
                  <Grid item sm={12}>
                    <FooterOfEvents Item={Item} />
                  </Grid>
                </div>
              </Grid>
            </CardActions>
          </Card>
        )}
      </Grid>
    ));

    return (
      <div className="organization">
        <div className="navigation">
          <Navigation event={this.state.event}></Navigation>
        </div>
        <div className="events">
          <h1 className="event_header">All Events</h1>
          <Grid container spacing={3}>
            {Events}
          </Grid>

          <div className="event__pagination__container">
            <Pagination
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              defaultCurrent={1}
              total={100}
              onChange={this.handlePagination}
            />
          </div>
        </div>
        <Popups
          option={this.state.option}
          optionValue={this.state.optionValue}
          modalShow={this.state.modalShow}
          eventInfo={this.state.singleEvent}
        />
        <DeleteEvent
          show={this.state.delete}
          onHide={cancel}
          eventId={this.state.eventId}
        />
        <EditEvent
          show={this.state.edit}
          onHide={cancel}
          eventId={this.state.eventId}
          eventInfo={this.state.singleEvent}
        />
      </div>
    );
  }
}
// map state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  event: state.event,
  org: state.org,
});

export default connect(mapStateToProps, { getAllEvents, getOrgProfile })(
  Events
);
