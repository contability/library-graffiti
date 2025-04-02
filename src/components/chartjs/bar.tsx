import {
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import CommonContainer from "../layout/CommonContainer";
import styled from "styled-components";

const ChartBarContainer = styled.article`
  background-color: white;
`;

/**
 * ChartJS 플러그인 활용 : 
  options.plugins에 필요한 ChartJS 의 컴포넌트나 
  그 외 다양한 컴포넌트들을 react-chartjs-2와 함께 쓰기 위한 것들을 꼭! 등록해줘야 함.
 */
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartBar = () => {
  const labels = ["하", "중", "상"];

  // data : 라벨과 수치 등의 데이터
  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "나",
        data: [100, 78, 100],
        backgroundColor: "rgba(255, 0, 55, 0.5)",
      },
      {
        label: "응시생",
        data: [80, 70, 63],
        backgroundColor: "rgba(0, 141, 235, 0.5)",
      },
      {
        label: "재원생",
        data: [82, 77, 81],
        backgroundColor: "rgba(4, 80, 0, 0.5)",
      },
    ],
  };

  //  options : 차트 안에 그려지는 형태나, 범례, 그리드 등등의 전반적인 옵션
  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
        mode: "point",
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}%`;
          },
        },
      },
      title: {
        display: true,
        text: "난이도 별 해결력 비교",
      },
    },
  };
  return (
    <CommonContainer>
      <ChartBarContainer>
        <Bar
          data={data}
          options={options}
          style={{
            width: "500px",
          }}
        />
      </ChartBarContainer>
    </CommonContainer>
  );
};

export default ChartBar;
