import React from 'react'
import { Line } from 'react-chartjs-2'
import formatter from '../util/formatter'

const Chart = ({ data }) => {
  return (
    <Line
      data={{
        labels: data.map((netWorth) => {
          return netWorth.date
        }),
        datasets: [
          {
            label: 'Net Worth (CAD)',
            data: data.map((netWorth) => {
              return netWorth.netWorth
            }),
            borderColor: ['rgba(255, 99, 132, 1)'],
            backgroundColor: 'rgba(0, 0, 0, .1)',
            borderWidth: 1,
          },
        ],
      }}
      width={100}
      height={50}
      options={{
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'year',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: (label, _) => {
                  return formatter.format(label)
                },
              },
            },
          ],
        },
      }}
    />
  )
}

export default Chart
