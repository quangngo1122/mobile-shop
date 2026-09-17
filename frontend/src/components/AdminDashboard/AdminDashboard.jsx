import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
              <PieChartComponent data={orders?.data} />
            </PieCanvas>
          </ChartPanel>
        </ChartGrid>
      </DashboardShell>
    </DashboardPage>
  );
};

export default AdminDashboard;
