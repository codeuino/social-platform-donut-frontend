import React, { Component } from "react";
import "./TicketContent.scss";
import { Image } from "react-bootstrap";
import BadgeElement from './BadgeElement';
import { withRouter } from "react-router-dom";
import DataTable from "react-data-table-component";
import customStyles from './DataTableCustomStyles';
import userIcon2 from "../../../../assets/images/userIcon2.jpg";

class TicketContent extends Component {
  
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
        format: (row) => `${row.plot.slice(0, 100)}...`,
      },
      {
        name: "Status",
        grow: 1,
        // eslint-disable-next-line react/no-array-index-key
        cell: (row) => (
          <div>
            {row.genres.map((genre, i) => (
              <BadgeElement ticketState={genre} />
            ))}
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
            <span className="profile-text">Devesh Verma</span>
          </div>
        ),
      },
      {
        name: "Created At"
      },
      {
        name: "Comments"
      }
    ];

    return (
      <DataTable
        // title={this.state.selectedState}
        columns={columns}
        data={this.props.tickets}
        customStyles={customStyles}
        pagination
        paginationPerPage={Math.floor((window.innerHeight - 220) / 85)}
        highlightOnHover={true}
        pointerOnHover={true}
        paginationRowsPerPageOptions={[]}
        onRowClicked={this.handleRowClick}
      />
    );
  }
}

export default withRouter(TicketContent);
