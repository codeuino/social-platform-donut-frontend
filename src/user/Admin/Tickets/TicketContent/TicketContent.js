import React, { Component } from "react";
import "./TicketContent.scss";
import Moment from "react-moment";
import BadgeElement from "./BadgeElement";
import { withRouter } from "react-router-dom";
import { Image, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import customStyles from "./DataTableCustomStyles";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";

class TicketContent extends Component {
  handleRowClick = (arg1) => {
    console.log("Row Clicked!");
    console.log(arg1);
    this.props.viewTicket(arg1._id);
  };

  render() {
    const CustomTitle = ({ row }) => {
      console.log(row);
      return (
        <div className="Ticket-dashboard-ticket">
          <div className="status">
            <BadgeElement ticketState={row.status} />
          </div>
          <div>
            <div className="Ticket-dashboard-title">
              {row.title}
            </div>
            <div className="Ticket-dashboard-shortDesciption">{`${row.shortDescription.slice(
              0,
              100
            )}...`}</div>
          </div>
        </div>
      );
    };

    const columns = [
      {
        name: "",
        grow: 5,
        selector: "title",
        cell: (row) => <CustomTitle row={row} />,
      },
      {
        grow: 3,
        cell: (row) => (row.tags.map((ele, index) => (
          <Badge
            pill
            variant="info"
            style={{ fontSize: "13px", margin: "2px" }}
          >
            <span style={{ verticalAlign: "middle" }}>{ele}</span>
          </Badge>
        )))
      },
      {
        name: "Created",
        sortable: true,
        selector: "createdAt",
        cell: (row) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={userIcon2}
              alt="icon"
              rounded
              className="profile-img"
              roundedCircle
            />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
              <div className="profile-text">{row.createdBy.name}</div>
              <Moment format="DD MMM YYYY">{row.createdAt}</Moment>
            </div>
          </div>
        ),
      },
      {
        name: "Comments",
        sortable: true,
        selector: "comments",
        center: "true",
        cell: (row) => (
          <div>
            {row.comments}
            <ChatBubbleOutlinedIcon style={{ marginLeft: "5px", color: "rgba(0,0,0,0.5)" }}/>
          </div>
        ),
      },
    ];

    return (
      <DataTable
        pagination
        columns={columns}
        pointerOnHover={true}
        highlightOnHover={true}
        data={this.props.tickets}
        customStyles={customStyles}
        paginationRowsPerPageOptions={[]}
        onRowClicked={this.handleRowClick}
        paginationPerPage={Math.floor((window.innerHeight - 220) / 85)}
      />
    );
  }
}

export default withRouter(TicketContent);
