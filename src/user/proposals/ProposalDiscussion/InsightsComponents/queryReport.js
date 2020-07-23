import moment from "moment";

export const queryReport = (props) => {
  const {
    viewID,
    startDate,
    endDate,
    metrics,
    dimensions,
    orderBy,
    filter,
  } = props;

  const VIEW_ID = "224508578";
  const QUERY_PATH = "/v4/reports:batchGet";
  const QUERY_ROOT = "https://analyticsreporting.googleapis.com/";

  const requestDimensions = (dimensions) => {
    let result = [];
    dimensions.forEach((item) => {
      result.push({
        name: item,
      });
    });
    return result;
  };
  return window.gapi.client.request({
    path: QUERY_PATH,
    root: QUERY_ROOT,
    method: "POST",
    body: {
      reportRequests: [
        {
          viewId: VIEW_ID,
          filtersExpression: filter,
          dateRanges: [
            {
              startDate: moment(startDate).format("YYYY-MM-DD"),
              endDate: moment(endDate).format("YYYY-MM-DD"),
            },
          ],
          metrics: [
            {
              expression: metrics,
            },
          ],
          dimensions: requestDimensions(dimensions),
          orderBys: orderBy
            ? [
                {
                  fieldName: orderBy.fieldName,
                  sortOrder: orderBy.order,
                },
              ]
            : [],
        },
      ],
    },
  });
};
