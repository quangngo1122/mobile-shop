import React, { useEffect } from "react";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/LoadingComponent/Loading";
import {
  ActionGroup,
  EmptyState,
  OrderAction,
  OrderCount,
  OrderPageShell,
  PageIntro,
  PageSubtitle,
  PageTitle,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductQuantity,
  StatusGroup,
  StatusHeading,
  StatusTag,
  TotalBlock,
  TotalLabel,
  TotalValue,
  WrapperContainer,
  WrapperFooterItem,
  WrapperHeaderItem,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperStatus,
} from "./style";
import { convertPrice } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import imgEmtyCart from "../../assets/images/icons8-clear-shopping-cart-96.png";
import { useSelector } from "react-redux";

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const userId = state?.id || user?.id;
  const accessToken = state?.access_token || state?.token || user?.access_token;

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(userId, accessToken);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders", userId],
    queryFn: fetchMyOrder,
    enabled: !!userId && !!accessToken,
  });
  const { isPending, data } = queryOrder;
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: accessToken,
      },
    });
  };
  const mutation = useMutationHooks((data) => {
    const { id, token, orderItems } = data;
    const res = OrderService.cancelOrder(id, token, orderItems);
    return res;
  });

  const handleCanceOrder = (order) => {
    mutation.mutate(
      { id: order._id, token: accessToken, orderItems: order?.orderItems },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      },
    );
  };
  const {
    isPending: isPendingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancel,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success();
    } else if (isErrorCancel) {
      message.error();
    }
  }, [isErrorCancel, isSuccessCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
          <ProductImage src={order?.image} alt={order?.name || "Sản phẩm"} />
          <ProductInfo>
            <ProductName>{order?.name}</ProductName>
            <ProductQuantity>Số lượng: {order?.amount || 1}</ProductQuantity>
          </ProductInfo>
          <ProductPrice>{convertPrice(order?.price)}</ProductPrice>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <Loading isPending={isPending || isPendingCancel}>
      <WrapperContainer>
        <OrderPageShell>
          <PageIntro>
            <PageTitle>Đơn hàng của tôi</PageTitle>
            <PageSubtitle>
              Theo dõi trạng thái và xem lại các sản phẩm bạn đã đặt.
              {data?.length > 0 && (
                <OrderCount> {data.length} đơn hàng</OrderCount>
              )}
            </PageSubtitle>
          </PageIntro>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <StatusHeading>Trạng thái đơn hàng</StatusHeading>
                    <StatusGroup>
                      <StatusTag $success={order.isDelivered}>
                        {order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}
                      </StatusTag>
                      <StatusTag $success={order.isPaid}>
                        {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                      </StatusTag>
                    </StatusGroup>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <TotalBlock>
                      <TotalLabel>Tổng tiền</TotalLabel>
                      <TotalValue>{convertPrice(order?.totalPrice)}</TotalValue>
                    </TotalBlock>
                    <ActionGroup>
                      <OrderAction
                        type="button"
                        onClick={() => handleCanceOrder(order)}
                      >
                        Hủy đơn hàng
                      </OrderAction>
                      <OrderAction
                        type="button"
                        $primary
                        onClick={() => handleDetailsOrder(order?._id)}
                      >
                        Xem chi tiết
                      </OrderAction>
                    </ActionGroup>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>

          {data?.length === 0 && (
            <EmptyState>
              <img src={imgEmtyCart} alt="Chưa có đơn hàng" />
              <strong>Bạn chưa có đơn hàng nào</strong>
              <span>Những đơn hàng của bạn sẽ xuất hiện ở đây.</span>
            </EmptyState>
          )}
        </OrderPageShell>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
