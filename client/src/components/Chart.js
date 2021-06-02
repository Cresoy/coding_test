import { Bar } from "react-chartjs-2";

export default function Chart({ data }) {
  const state = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Expense",
        backgroundColor: "#fda245",
        data: [],
        borderRadius: 8,
      },
      {
        label: "Income",
        backgroundColor: "#1aae76",
        data: [],
        borderRadius: 8,
      },
    ],
  };

  if (data?.expense)
    Object.entries(data.expense)?.forEach(([key, value]) => {
      state.datasets[0].data.push(value);
    });
  if (data?.income)
    Object.entries(data.income)?.forEach(([key, value]) => {
      state.datasets[1].data.push(value);
    });

  return (
    <Bar
      data={state}
      options={{
        title: {
          display: true,
          text: "Average Rainfall per month",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",
        },
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        layout: {
          left: 220,
        },
        scales: {
          x: {
            grid: {
              display: true,
              drawBorder: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderWidth: 0,
            },
            ticks: {
              padding: 20,
            },
          },
          y: {
            paddingRight: 200,
            right: 200,
            paddingBottom: 200,
            bottom: 100,
            grid: {
              borderDash: [10, 10],
              drawBorder: false,
              drawOnChartArea: true,
              drawTicks: true,
              borderWidth: 0,
            },
            ticks: {
              // stepSize: 5000,
              // mirror: true,
              // padding: 50,
              callback: function (val, index) {
                val = val >= 1000 ? `${val / 1000}k` : val;
                return `$${val}`;
              },
            },
          },
        },
      }}
    />
  );
}
