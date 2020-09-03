import React, { Component } from "react";
import "./TicketContent.scss";
import Moment from 'react-moment';
import { Image } from "react-bootstrap";
import BadgeElement from './BadgeElement';
import { withRouter } from "react-router-dom";
import DataTable from "react-data-table-component";
import customStyles from './DataTableCustomStyles';
import userIcon2 from "../../../../assets/images/userIcon2.jpg";

class TicketContent extends Component {
  
  handleRowClick = (arg1) => {
    console.log("Row Clicked!")
    console.log(arg1)
    this.props.viewTicket(arg1._id)
  }

  render() {

    const CustomTitle = ({ row }) => (
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        <div style={{ fontWeight: "bold" }}>{row.title}</div>
      </div>
    );

    const columns = [
      {
        name: "Title",
        grow: 2,
        selector: "titler",
        sortable: true,
        maxWidth: "600px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: (row) => <CustomTitle row={row} />,
      },
      {
        name: "Description",
        grow: 3,
        selector: "plot",
        wrap: true,
        sortable: true,
        format: (row) => `${row.shortDescription.slice(0, 100)}...`,
      },
      {
        name: "Status",
        grow: 1,
        // eslint-disable-next-line react/no-array-index-key
        cell: (row) => (
          <div>
            <BadgeElement ticketState={row.status} />
          </div>
        ),
      },
      {
        name: "User",
        grow: 1,
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
        name: "Created At",
        cell: (row) => (
          <div>
            <Moment format="DD MMM YYYY">{row.createdAt}</Moment>
          </div>
        )
      },
      {
        name: "Comments",
        sortable: true,
        cell: (row) => (
          <div>
            {row.comments}
          </div>
        )
      }
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
