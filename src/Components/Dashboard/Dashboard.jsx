/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import InfoPopup from "../Popups/InfoPopup";
import axios from "axios";
import API_URL from "../../Common/config/config";

const Dashboard = () => {
  const [showInfoPopup, setShowInfoPopUp] = useState(true);
  const [cards, setCards] = useState([]);
  const [chart, setChart] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.post(`${API_URL}/startup/count`, {
        user_id: user._id,
      });

      if (res.data.success) {
        const cardData = res.data.cards.map((item) => ({
          title: item.title,
          value: item.count,
        }));

        const chartData = res.data.chart.map((item) => ({
          title: item.name,
          value: item.count,
        }));

        const registrationData = [
          { month: "Start", value: 0 },
          ...res.data.registrations.map((item) => ({
            month: item.date,
            value: item.count,
          })),
        ];

        setCards(cardData);
        setChart(chartData);
        setRegistrations(registrationData);
      }
    } catch (error) {
      console.log("Dashboard API Error:", error);
      return;
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ scale: 1.04 }}
              className="bg-gray-100 p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                  {item.title}
                </p>
                <span className="text-lg font-bold text-gray-900">
                  {item.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Institution Categories</h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="title"
                angle={-30}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: "16px", border: 0 }} />
              <Bar dataKey="value" fill="#084ab4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Registration Growth
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={registrations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#084ab4"
                strokeWidth={3}
                activeDot={{ stroke: "#6ba2fa" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showInfoPopup && (
        <>
          <div
            className="fixed min-h-screen inset-0 bg-black/50 backdrop-blur-sm z-35"
            onClick={() => setShowInfoPopUp(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <InfoPopup close={() => setShowInfoPopUp(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
