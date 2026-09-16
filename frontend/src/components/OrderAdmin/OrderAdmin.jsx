import React from "react";
import {
  AdminOrderPage,
  HeaderContent,
  HeaderSubtitle,
  PageShell,
  PriceValue,
  StatCard,
  StatLabel,
  StatValue,
  StatusTag,
  TableBody,
  TableHeader,
  TablePanel,
  TableTitle,
  TopStats,
  WrapperHeader,
} from "./style";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../utils";
import { orderContant } from "../../contant";

const OrderAdmin = () => {
  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const { isPending: isPendingOrders, data: orders } = queryOrder;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt,
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps("isPaid"),
    },
    {
      title: "Giao hàng",
      dataIndex: "isDelivered",
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps("isDelivered"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    },
  ];
  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        paymentMethod: orderContant.payment[order?.paymentMethod],
        isPaid: order?.isPaid,
        isDelivered: order?.isDelivered,
        totalPrice: convertPrice(order?.totalPrice),
      };
    });

  const paidOrders = orders?.data?.filter((order) => order?.isPaid).length || 0;
  const deliveredOrders =
    orders?.data?.filter((order) => order?.isDelivered).length || 0;

  const orderColumns = columns.map((column) => {
    if (column.dataIndex === "isPaid") {
      return {
        ...column,
        render: (value) => (
          <StatusTag $success={value}>
            {value ? "Đã thanh toán" : "Chưa thanh toán"}
          </StatusTag>
        ),
      };
    }
    if (column.dataIndex === "isDelivered") {
      return {
        ...column,
        render: (value) => (
          <StatusTag $success={value}>
            {value ? "Đã giao hàng" : "Chưa giao hàng"}
          </StatusTag>
        ),
      };
    }
    if (column.dataIndex === "totalPrice") {
      return {
        ...column,
        render: (value) => <PriceValue>{value}</PriceValue>,
      };
    }
    return column;
  });

  return (
    <AdminOrderPage>
      <PageShell>
        <HeaderContent>
          <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
          <HeaderSubtitle>
            Theo dõi trạng thái xử lý, thanh toán và giao hàng của tất cả đơn
            hàng.
          </HeaderSubtitle>
        </HeaderContent>

        <TopStats>
          <StatCard>
            <StatLabel>Tổng đơn hàng</StatLabel>
            <StatValue>{orders?.data?.length || 0}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Đã thanh toán</StatLabel>
            <StatValue>{paidOrders}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Đã giao hàng</StatLabel>
            <StatValue>{deliveredOrders}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Đang xử lý</StatLabel>
            <StatValue>
              {Math.max((orders?.data?.length || 0) - deliveredOrders, 0)}
            </StatValue>
          </StatCard>
        </TopStats>

        <TablePanel>
          <TableHeader>
            <TableTitle>Danh sách đơn hàng</TableTitle>
          </TableHeader>
          <TableBody>
            <TableComponent
              columns={orderColumns}
              isPending={isPendingOrders}
              data={dataTable}
            />
          </TableBody>
        </TablePanel>
      </PageShell>
    </AdminOrderPage>
  );
};

export default OrderAdmin;
