import moment from "moment";

export const formatDate = (string) => {
  return moment(string).format("MMM Do YYYY");
};
