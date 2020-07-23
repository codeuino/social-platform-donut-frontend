import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { colors } from "./styles";
import { addDays } from "date-fns";
import CustomDatePicker from "./DatePicker";
import { queryReport } from "./queryReport";
import { ClockLoader } from "react-spinners";

const CountriesReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
    colors: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalCoutries, setTotalCountries] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    setTotalUsers(response.result.reports[0].data.totals[0].values[0]);
    setTotalCountries(queryResult.length);
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, idx) => {
      labels.push(row.dimensions[0]);
      values.push(row.metrics[0].values[0]);
      bgColors.push(colors[idx]);
    });
    setReportData({
      ...reportData,
      labels,
      values,
      colors: bgColors,
    });
    setLoading(false);
  };

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        data: reportData.values,
        backgroundColor: reportData.colors,
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data.labels[tooltipItem["index"]];
        },
      },
    },
  };

  useEffect(() => {
    setLoading(true);
    const request = {
      viewID: "224508578",
      startDate,
      endDate,
      metrics: "ga:users",
      dimensions: ["ga:country"],
      orderBy: {
        fieldName: "ga:users",
        order: "DESCENDING",
      },
      filter: `ga:pagePath==/${props.proposalId}`,
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      1000
    );
  }, [startDate, endDate]);

  return (
    <div className="report-wrapper">
      <h2 className="chart-title">User Countries</h2>
      <div className="datepicker-content"></div>
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
        <ClockLoader
          color={"#1DA9DF"}
          loading={isLoading}
          size={50}
          css="display: block;
        margin: 0 auto;"
        />
      ) : (
        <div className="piechart-wrapper">
          <Pie data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default CountriesReport;
