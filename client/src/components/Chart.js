import { Bar } from "react-chartjs-2";

export default function ({ data }) {
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
        borderRadius: 6,
        barThickness: 20,
        barPercentage: 0.5,
      },
      {
        label: "Income",
        backgroundColor: "#1aae76",
        data: [],
        borderRadius: 6,
        barPercentage: 0.6,
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
        scales: {
          yAxis: [
            {
              ticks: {
                callback: function (label, index, labels) {
                  console.log(label);
                  return label / 1000 + "k";
                },
              },
              scaleLabel: {
                display: true,
                labelString: "1k = 1000",
              },
            },
          ],
        },
      }}
    />
  );
}
