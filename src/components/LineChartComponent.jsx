import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const dataAr = [
  {
    id: "1",
    name: "May",
    patients: 4000,
    appointments: 2400,
    amt: 2400,
  },
  {
    id: "2",
    name: "June",
    patients: 3000,
    appointments: 1398,
    amt: 2210,
  },
  {
    id: "3",
    name: "July",
    patients: 2000,
    appointments: 9800,
    amt: 2290,
  },
  {
    id: "4",
    name: "August",
    patients: 2780,
    appointments: 3908,
    amt: 2000,
  },
  {
    id: "5",
    name: "September",
    patients: 1890,
    appointments: 4800,
    amt: 2181,
  },
  {
    id: "6",
    name: "October",
    patients: 2390,
    appointments: 3800,
    amt: 2500,
  },
  {
    id: "7",
    name: "November",
    patients: 3490,
    appointments: 4300,
    amt: 2100,
  },
  {
    id: "8",
    name: "December",
    patients: 3000,
    appointments: 4200,
    amt: 2200,
  },
];
const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={700} height={300} data={dataAr}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          dataKey={"patients"}
          type="monotone"
           fill="#7366ff"
          stroke="#7366ff"
        />
        <Line
          dataKey={"appointments"}
          type="monotone"
          fill="#dc3545"
          stroke="#dc3545"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
