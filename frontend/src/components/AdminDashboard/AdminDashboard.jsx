import React from "react";
import {
  AreaChart,
  Area,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartCanvas,
  ChartDescription,
  ChartGrid,
  ChartHeader,
  ChartPanel,
  ChartTitle,
  CustomTooltipBox,
  DashboardCard,
  DashboardCardBg,
  DashboardCardData,
  DashboardCardTittle,
  DashboardIntro,
  DashboardPage,
  DashboardShell,
  DashboardSubtitle,
  DashboardTitle,
  MetricCopy,
  MetricGrid,
  PieCanvas,
} from "./style";
import * as UserService from "../../services/UserService";
import * as ProductService from "../../services/ProductService";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import iconcard1 from "../../assets/images/icons8-users-60.png";
import iconcard2 from "../../assets/images/icons8-product-60.png";
import iconcard3 from "../../assets/images/icons8-cart-48.png";
import PieChartComponent from "../OrderAdmin/PieChart";
import { useInView } from "react-intersection-observer";

const AdminDashboard = () => {
  const user = useSelector((state) => state?.user);
  const getAllUser = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryUser = useQuery({ queryKey: ["users"], queryFn: getAllUser });
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });

  const { isPending: isPendingUsers, data: users } = queryUser;
  const { isPending: isPendingProducts, data: products } = queryProduct;
  const { isPending: isPendingOrders, data: orders } = queryOrder;
  const orderList = Array.isArray(orders?.data) ? orders.data : [];

  const { ref: cardRef, inView: isCardVisible } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const datachart = Array.isArray(products?.data)
    ? products.data.reduce((acc, product) => {
        const existingProduct = acc.find((item) => item.type === product.type);

        if (existingProduct) {
          existingProduct.countInStock += product.countInStock;
        } else {
          acc.push({
            type: product.type,
            countInStock: product.countInStock,
          });
        }
        return acc;
      }, [])
    : [];

  const revenueByMonth = orderList
    .reduce((monthlyTotals, order) => {
      const orderDate = new Date(order.createdAt);
      if (Number.isNaN(orderDate.getTime())) {
        return monthlyTotals;
      }

      const monthKey = `${orderDate.getFullYear()}-${String(
        orderDate.getMonth() + 1,
      ).padStart(2, "0")}`;
      const month = monthlyTotals.find((item) => item.monthKey === monthKey);
      const paidRevenue = order.isPaid ? Number(order.totalPrice) || 0 : 0;

      if (month) {
        month.revenue += paidRevenue;
        month.orderCount += 1;
      } else {
        monthlyTotals.push({
          monthKey,
          month: new Intl.DateTimeFormat("vi-VN", {
            month: "short",
            year: "numeric",
          }).format(orderDate),
          revenue: paidRevenue,
          orderCount: 1,
        });
      }
      return monthlyTotals;
    }, [])
    .sort((first, second) => first.monthKey.localeCompare(second.monthKey));

  const orderStatusData = [
    {
      status: "Thanh toán",
      completed: orderList.filter((order) => order.isPaid).length,
      pending: orderList.filter((order) => !order.isPaid).length,
    },
    {
      status: "Giao hàng",
      completed: orderList.filter((order) => order.isDelivered).length,
      pending: orderList.filter((order) => !order.isDelivered).length,
    },
  ];

  const formatCurrency = (value) =>
    `${Number(value).toLocaleString("vi-VN")} ₫`;
  const formatCompactCurrency = (value) => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
    }
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(0)} tr`;
    }
    return value.toLocaleString("vi-VN");
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltipBox>
          <p>{payload[0].payload.type}</p>
          <p>{`Số lượng: ${payload[0].value}`}</p>
        </CustomTooltipBox>
      );
    }
    return null;
  };

  return (
    <DashboardPage>
      <DashboardShell>
        <DashboardIntro>
          <DashboardTitle>Tổng quan hệ thống</DashboardTitle>
          <DashboardSubtitle>
            Theo dõi nhanh tình hình tài khoản, sản phẩm và đơn hàng của cửa
            hàng.
          </DashboardSubtitle>
        </DashboardIntro>

        <MetricGrid>
          <DashboardCard
            ref={cardRef}
            style={{
              opacity: isCardVisible ? 1 : 0,
              transform: isCardVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <DashboardCardBg src={iconcard1} alt="Tài khoản" />
            <MetricCopy>
              <DashboardCardTittle>Tài khoản</DashboardCardTittle>
              <DashboardCardData isPending={isPendingUsers}>
                {users?.data?.length || 0}
              </DashboardCardData>
            </MetricCopy>
          </DashboardCard>

          <DashboardCard
            ref={cardRef}
            style={{
              opacity: isCardVisible ? 1 : 0,
              transform: isCardVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <DashboardCardBg src={iconcard2} alt="Sản phẩm" />
            <MetricCopy>
              <DashboardCardTittle>Sản phẩm</DashboardCardTittle>
              <DashboardCardData isPending={isPendingProducts}>
                {products?.data?.length || 0}
              </DashboardCardData>
            </MetricCopy>
          </DashboardCard>

          <DashboardCard
            ref={cardRef}
            style={{
              opacity: isCardVisible ? 1 : 0,
              transform: isCardVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <DashboardCardBg src={iconcard3} alt="Đơn hàng" />
            <MetricCopy>
              <DashboardCardTittle>Đơn hàng</DashboardCardTittle>
              <DashboardCardData isPending={isPendingOrders}>
                {orders?.data?.length || 0}
              </DashboardCardData>
            </MetricCopy>
          </DashboardCard>
        </MetricGrid>

        <ChartGrid>
          <ChartPanel>
            <ChartHeader>
              <div>
                <ChartTitle>Doanh thu đã thanh toán</ChartTitle>
                <ChartDescription>
                  Tổng giá trị các đơn đã thanh toán theo tháng.
                </ChartDescription>
              </div>
            </ChartHeader>
            <ChartCanvas>
              <ResponsiveContainer>
                <AreaChart
                  data={revenueByMonth}
                  margin={{ top: 10, right: 16, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6eded" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis
                    tickFormatter={formatCompactCurrency}
                    tick={{ fontSize: 11 }}
                    width={62}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Doanh thu"
                    stroke="#287e78"
                    strokeWidth={2.5}
                    fill="#c5e7df"
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCanvas>
          </ChartPanel>

          <ChartPanel>
            <ChartHeader>
              <div>
                <ChartTitle>Tiến độ đơn hàng</ChartTitle>
                <ChartDescription>
                  So sánh số đơn hoàn tất và đang chờ xử lý.
                </ChartDescription>
              </div>
            </ChartHeader>
            <ChartCanvas>
              <ResponsiveContainer>
                <BarChart
                  data={orderStatusData}
                  margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6eded" />
                  <XAxis dataKey="status" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="completed"
                    name="Hoàn tất"
                    stackId="orders"
                    fill="#287e78"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="pending"
                    name="Đang chờ"
                    stackId="orders"
                    fill="#eaa34b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCanvas>
          </ChartPanel>

          <ChartPanel>
            <ChartHeader>
              <div>
                <ChartTitle>Số lượng sản phẩm</ChartTitle>
                <ChartDescription>
                  Tồn kho được phân bổ theo từng danh mục.
                </ChartDescription>
              </div>
            </ChartHeader>
            <ChartCanvas>
              <ResponsiveContainer>
                <AreaChart
                  data={datachart}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="countInStock"
                    stroke="#0d6b68"
                    strokeWidth={3}
                    fill="#a7dfd8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCanvas>
          </ChartPanel>

          <ChartPanel>
            <ChartHeader>
              <div>
                <ChartTitle>Phương thức thanh toán</ChartTitle>
                <ChartDescription>
                  Tỷ trọng các phương thức trong đơn hàng.
                </ChartDescription>
              </div>
            </ChartHeader>
            <PieCanvas>
              <PieChartComponent data={orderList} />
            </PieCanvas>
          </ChartPanel>
        </ChartGrid>
      </DashboardShell>
    </DashboardPage>
  );
};

export default AdminDashboard;
