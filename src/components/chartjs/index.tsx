import styled from "styled-components";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

import { Radar } from "react-chartjs-2";
import CommonContainer from "../layout/CommonContainer";

const ChartContainer = styled.article`
  padding: 2rem;
  background-color: white;
`;

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data: ChartData<"radar"> = {
  labels: [
    "소수의 덧셈과 뺄셈",
    "수직과 평행",
    "다각형",
    "어림 하기",
    "꺾은선 그래프",
  ],
  datasets: [
    {
      label: "나의 위치",
      data: [10, 7.5, 10, 10, 7.5],
      fill: true, // 선 안쪽 색상 채워짐
      backgroundColor: "rgb(251, 251, 3, 0.3)",
      borderColor: "#f60000",
      pointRadius: 2,
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#f60000",
    },
    {
      label: "응시생 평균",
      data: [7.5, 8.5, 7.5, 7.0, 7.5],
      fill: false,
      backgroundColor: "rgba(98, 181, 255, 0.2)",
      borderColor: "#377EF8",
      pointRadius: 2,
      // pointBackgroundColor: 'rgb(255, 99, 132)',
      // pointBorderColor: '#fff',
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#377EF8",
    },
  ],
};

const options: ChartOptions<"radar"> = {
  responsive: true,
  scales: {
    r: {
      type: "radialLinear",
      beginAtZero: true,
      max: 10,
      min: 0,
      grid: {
        circular: false,
      },
      ticks: {
        stepSize: 1,
      },
      pointLabels: {
        font: {
          size: 13,
        },
        color: "#a14747",
        // color: [
        //   "#a14747",
        //   "#a14747",
        //   "#a14747",
        //   "#a14747",
        //   "#a14747",
        //   "#a14747",
        // ],
      },
    },
  },
  plugins: {
    //꼭다리
    legend: {
      display: true,
    },
    tooltip: {
      enabled: true, // 툴팁 활성화
      mode: "index", // 툴팁 모드 설정 (예: 'index', 'nearest')
      callbacks: {
        label: (context) => {
          // 툴팁에 표시할 내용 커스터마이즈
          const label = context.dataset.label || "";
          const value = context.raw; // 데이터 값
          return `${label}: ${value}%`; // 예시: "나의 위치: 10"
        },
      },
    },
  },

  elements: {
    line: {
      borderWidth: 1, //선의 굵기
      //tension: 3,       //선의 굴곡 비율
    },
  },
};

const Chart = () => {
  return (
    <CommonContainer>
      <ChartContainer>
        chart
        <Radar data={data} options={options} width={500} height={500} />
      </ChartContainer>
    </CommonContainer>
  );
};

export default Chart;
