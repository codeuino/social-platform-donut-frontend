import React from "react";
import Badge from "react-bootstrap/Badge";

const BadgeElement = (props) => {
  let badgeVariant = null;
  let text = null;
  switch (props.ticketState) {
    case "OPEN":
      badgeVariant = "primary";
      text = "Open"
      break;
    case "SOLVED":
      badgeVariant = "success";
      text = "Solved"
      break;
    case "ON_HOLD":
      badgeVariant = "secondary";
      text = "On Hold"
      break;
    case "PENDING":
      badgeVariant = "warning";
      text = "Pending"
      break;
    case "CLOSED":
      badgeVariant = "danger";
      text = "Closed"
      break;
    default:
      badgeVariant = "primary";
  }
  return (
    <div>
      <Badge pill variant={badgeVariant}>
        {props.ticketState}
      </Badge>
    </div>
  );
};

export default BadgeElement;
