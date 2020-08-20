import React, { Component } from "react";
import DataTable from "react-data-table-component";
import data from "../../../assets/jsonData/tickets";

class TicketContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Button = () => <button type="button">Download</button>;

    const CustomTitle = ({ row }) => (
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        <div>{row.title}</div>
        <div>
          <div
            style={{
              color: "grey",
              overflow: "hidden",
              whiteSpace: "wrap",
              textOverflow: "ellipses",
            }}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {row.plot}
          </div>
        </div>
      </div>
    );

    const columns = [
      {
        name: "Ticket Title",
        selector: "titler",
        sortable: true,
        maxWidth: "600px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: (row) => <CustomTitle row={row} />,
      },
      {
        name: "Ticket Description",
        selector: "plot",
        wrap: true,
        sortable: true,
        format: (row) => `${row.plot.slice(0, 200)}...`,
      },
      {
        name: "Genres",
        // eslint-disable-next-line react/no-array-index-key
        cell: (row) => (
          <div>
            {row.genres.map((genre, i) => (
              <div key={i}>{genre}</div>
            ))}
          </div>
        ),
      },
      {
        name: "User",
        grow: 0,
        cell: (row) => (
          <img height="84px" width="56px" alt={row.name} src={row.posterUrl} />
        ),
      },
      {
        name: "Poster Link",
        button: true,
        cell: (row) => (
          <a href={row.posterUrl} target="_blank" rel="noopener noreferrer">
            Download
          </a>
        ),
      },
      {
        name: "Poster Button",
        button: true,
        cell: () => <Button>Download Poster</Button>,
      },
    ];

    return <DataTable title="All Tickets" columns={columns} data={data} />;
  }
}

export default TicketContent;
