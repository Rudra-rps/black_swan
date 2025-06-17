"use client"

import { useTheme } from "next-themes"
import { PolarArea } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export default function SwanRadar() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = {
    labels: ["Market Crash", "Inflation", "Interest Rate", "Liquidity", "Geopolitical", "Regulatory"],
    datasets: [
      {
        label: "Risk Level",
        data: [65, 42, 78, 30, 56, 48],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        pointLabels: {
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          font: {
            size: 12,
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Risk: ${context.raw}/100`,
        },
      },
    },
    animation: {
      duration: 2000,
    },
  }

  return (
    <div className="w-full max-w-md h-[350px] flex items-center justify-center">
      <PolarArea data={data} options={options} />
    </div>
  )
}
