import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";

export default function Graph({ data }) {
  function compare(a, b) {
    if (a.dt > b.dt) {
      return -1;
    } else return 1;
  }
  data.sort(compare);
  // console.log("G:", data);

  return (
    <div className="p-8">
      <LineChart width={1000} height={400} data={data}>
        <Line type="monotone" dataKey="temp" stroke="#8884d8"></Line>
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
      </LineChart>
      <div className="m-4">
        <Link className="ring-2 p-4 bg-blue-300" to="/">
          Go Back
        </Link>
      </div>
    </div>
  );
}
