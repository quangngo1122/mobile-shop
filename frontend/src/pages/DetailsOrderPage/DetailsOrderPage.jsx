import React, { useMemo } from "react";
import {
  AccentText,
  DetailsOrderLayout,
  DetailsOrderShell,
  InfoCard,
  InfoContent,
  InfoGrid,
  InfoLabel,
  OrderContent,
  OrderContentHeader,
  OrderContentTitle,
  PageIntro,
  PageSubtitle,
  PageTitle,
  ProductCell,
  ProductIdentity,
  ProductImage,
  ProductName,
  ProductRow,
  ProductTable,
  ProductTableHeader,
  Summary,
  SummaryRow,
  TotalRow,
  TotalValue,
} from "./style";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details", id],
    queryFn: fetchDetailsOrder,
    enabled: !!id,
  });

  const { isPending, data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <Loading isPending={isPending}>
      <DetailsOrderLayout>
        <DetailsOrderShell>
          <PageIntro>
            <PageTitle>Chi tiết đơn hàng</PageTitle>
            <PageSubtitle>
              Kiểm tra thông tin giao nhận, sản phẩm và tổng thanh toán của đơn
              hàng.
            </PageSubtitle>
          </PageIntro>

          <InfoGrid>
            <InfoCard>
              <InfoLabel>Địa chỉ người nhận</InfoLabel>
              <InfoContent>
                <div className="name-info">
                  {data?.shippingAddress?.fullName}
                </div>
                <div>
                  <span>Địa chỉ: </span>
                  {`${data?.shippingAddress?.address || ""} ${data?.shippingAddress?.city || ""}`}
                </div>
                <div>
                  <span>Điện thoại: </span>
                  {data?.shippingAddress?.phone}
                </div>
              </InfoContent>
            </InfoCard>

            <InfoCard>
              <InfoLabel>Hình thức giao hàng</InfoLabel>
              <InfoContent>
                <div>
                  <AccentText>FAST</AccentText> Giao hàng tiết kiệm
                </div>
                <div>
                  <span>Phí giao hàng: </span>
                  {convertPrice(data?.shippingPrice || 0)}
                </div>
                <div>
                  <span>Trạng thái: </span>
                  {data?.isDelivered ? "Đã giao hàng" : "Đang xử lý"}
                </div>
              </InfoContent>
            </InfoCard>

            <InfoCard>
              <InfoLabel>Hình thức thanh toán</InfoLabel>
              <InfoContent>
                <div>
                  {orderContant.payment[data?.paymentMethod] || "Chưa cập nhật"}
                </div>
                <div>
                  <AccentText>
                    {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </AccentText>
                </div>
              </InfoContent>
            </InfoCard>
          </InfoGrid>

          <OrderContent>
            <OrderContentHeader>
              <OrderContentTitle>Sản phẩm trong đơn hàng</OrderContentTitle>
            </OrderContentHeader>
            <ProductTable>
              <ProductTableHeader>
                <div>Sản phẩm</div>
                <div>Giá</div>
                <div>Số lượng</div>
                <div>Giảm giá</div>
              </ProductTableHeader>
              {data?.orderItems?.map((order) => (
                <ProductRow key={order?._id}>
                  <ProductIdentity>
                    <ProductImage
                      src={order?.image}
                      alt={order?.name || "Sản phẩm"}
                    />
                    <ProductName>{order?.name}</ProductName>
                  </ProductIdentity>
                  <ProductCell>{convertPrice(order?.price)}</ProductCell>
                  <ProductCell>{order?.amount}</ProductCell>
                  <ProductCell $strong>
                    {order?.discount
                      ? convertPrice((priceMemo * order?.discount) / 100)
                      : "0 VND"}
                  </ProductCell>
                </ProductRow>
              ))}
            </ProductTable>

            <Summary>
              <SummaryRow>
                <span>Tạm tính</span>
                <span>{convertPrice(priceMemo || 0)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Phí vận chuyển</span>
                <span>{convertPrice(data?.shippingPrice || 0)}</span>
              </SummaryRow>
              <TotalRow>
                <span>Tổng cộng</span>
                <TotalValue>{convertPrice(data?.totalPrice || 0)}</TotalValue>
              </TotalRow>
            </Summary>
          </OrderContent>
        </DetailsOrderShell>
      </DetailsOrderLayout>
    </Loading>
  );
};

export default DetailsOrderPage;
