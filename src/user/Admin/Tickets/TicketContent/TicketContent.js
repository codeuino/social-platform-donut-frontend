import React, { Component } from "react";
import "./TicketContent.scss";
import Moment from "react-moment";
import { Image } from "react-bootstrap";
import BadgeElement from "./BadgeElement";
import { withRouter } from "react-router-dom";
import DataTable from "react-data-table-component";
import customStyles from "./DataTableCustomStyles";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";

class TicketContent extends Component {
  handleRowClick = (arg1) => {
    console.log("Row Clicked!");
    console.log(arg1);
    this.props.viewTicket(arg1._id);
  };

  render() {
    const CustomTitle = ({ row }) => (
      <div className="Ticket-dashboard-ticket">
        <div className="status">
          <BadgeElement ticketState={row.status} />
        </div>
        <div>
          <div className="Ticket-dashboard-title">{row.title}</div>
          <div className="Ticket-dashboard-shortDesciption">{`${row.shortDescription.slice(
            0,
            100
          )}...`}</div>
        </div>
      </div>
    );

    const columns = [
      {
        name: "",
        grow: 5,
        selector: "title",
        cell: (row) => <CustomTitle row={row} />,
      },
      {
        selector: "createdBy.name",
        cell: (row) => (
          <div>
            <Image
              src={userIcon2}
              alt="icon"
              rounded
              className="profile-img"
              roundedCircle
            />
            <span className="profile-text">{row.createdBy.name}</span>
          </div>
        ),
      },
      {
        name: "Created",
        sortable: true,
        selector: "createdAt",
        cell: (row) => (
          <div>
            <Moment format="DD MMM YYYY">{row.createdAt}</Moment>
          </div>
        ),
      },
      {
        name: "Comments",
        sortable: true,
        selector: "comments",
        cell: (row) => <div>{row.comments}</div>,
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
