import { format } from "date-fns";

export const formatDate = (string) => {
  return format(
    new Date(
      string.substring(0, 4),
      string.substring(4, 6) - 1,
      string.substring(6, 8)
    ),
    "MMM. d, yyyy"
  );
};

export const transformToDate = (string) => {
  return new Date(
    string.substring(0, 4),
    string.substring(4, 6) - 1,
    string.substring(6, 8)
  );
};
