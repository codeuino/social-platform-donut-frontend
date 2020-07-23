import React, { useState, useEffect } from "react";
import CustomDatePicker from "./DatePicker";
import { queryReport } from "./queryReport";
import { ClockLoader } from "react-spinners";
import "./PageviewsReport.scss";
import moment from "moment";

const PageviewsReport = (props) => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().add(-10, "days").toDate()
  );
  const [endDate, setEndDate] = useState(moment().toDate());
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    setTotalPages(queryResult.length);
    const total = response.result.reports[0].data.totals[0].values[0];
    let newReportData = [];
    queryResult.forEach((row, idx) => {
      if (idx < 10) {
        let tempObj = {
          path: row.dimensions[0],
          views: row.metrics[0].values[0],
          perc: `${parseFloat((row.metrics[0].values[0] / total) * 100).toFixed(
            1
          )}%`,
        };
        newReportData.push(tempObj);
      }
    });
    setLoading(false);
    setReportData(newReportData);
  };

  useEffect(() => {
    setLoading(true);
    const request = {
      startDate,
      endDate,
      metrics: "ga:pageviews",
      dimensions: ["ga:pagePath"],
      orderBy: {
        fieldName: "ga:pageViews",
        order: "DESCENDING",
      },
      filter: "ga:pagePath!=/homepage",
    };
    setTimeout(() => {
      queryReport(request)
        .then((resp) => displayResults(resp))
        .catch((error) => console.error(error));
    }, 1000);
  }, [startDate, endDate]);

  return (
    <div className="report-wrapper">
      <h2 className="chart-title">Top 10 Proposals by Views</h2>
      {/* <h3 className="chart-subtitle">{`Total pages - ${totalPages}`}</h3> */}
      <div className="datepicker-content">
        <CustomDatePicker
          placeholder={"Start date"}
          date={startDate}
          handleDateChange={(date) => setStartDate(date)}
        />
        <CustomDatePicker
          placeholder={"End date"}
          date={endDate}
          handleDateChange={(date) => setEndDate(date)}
        />
      </div>

      {isLoading ? (
        <div className="loader">
          <ClockLoader
            color={"#1DA9DF"}
            loading={isLoading}
            size={50}
            css="display: block;
              margin: 0 auto;"
          />
        </div>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) => (
              <tr key={id}>
                <td className="left-align">{row.path}</td>
                <td>{row.views}</td>
                <td>{row.perc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PageviewsReport;
