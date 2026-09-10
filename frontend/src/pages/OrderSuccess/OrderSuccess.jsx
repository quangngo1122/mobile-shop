import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Actions,
  AmountSummary,
  InfoPanel,
  MetaLabel,
  MetaList,
  MetaRow,
  MetaValue,
  OrderSuccessShell,
  OrderSuccessWrapper,
  Panel,
  PrimaryButton,
  ProductBody,
  ProductCard,
  ProductList,
  ProductMetaGroup,
  ProductMetaLabel,
  ProductMetaValue,
  ProductName,
  ProductThumb,
  SecondaryButton,
  SectionBadge,
  SectionHeader,
  SectionTitle,
  SidePanel,
  SideTitle,
  SuccessBadge,
  SuccessGrid,
  SuccessHeader,
  SuccessSubtitle,
  SuccessTitle,
  SummaryRow,
  SummaryValue,
  TotalRow,
  TotalValue,
  ValueHighlight,
} from "./style";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";
import { orderContant } from "../../contant";
import iconsuccess from "../../assets/images/icons8-success-50.png";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const orders = state?.orders || order?.orderItemsSelected || [];
  const deliveryLabel = orderContant.delivery[state?.delivery] || "FAST";
  const paymentLabel =
    orderContant.payment[state?.payment] || "Thanh toán khi nhận hàng";

  return (
    <OrderSuccessWrapper>
      <Loading isPending={false}>
        <OrderSuccessShell>
          <SuccessHeader>
            <SuccessBadge>
              <img
                src={iconsuccess}
                alt="icon-success"
                style={{ width: "26px", height: "26px" }}
              />
            </SuccessBadge>
            <div>
              <SuccessTitle>Đơn hàng đặt thành công!</SuccessTitle>
              <SuccessSubtitle>
                Cảm ơn bạn đã tin tưởng mua sắm tại cửa hàng của chúng tôi.
                Chúng tôi đã nhận được đơn hàng và đang chuẩn bị giao đến bạn.
              </SuccessSubtitle>
            </div>
          </SuccessHeader>

          <SuccessGrid>
            <InfoPanel>
              <SectionHeader>
                <SectionTitle>Thông tin đơn hàng</SectionTitle>
                <SectionBadge>Đã xác nhận</SectionBadge>
              </SectionHeader>

              <MetaList>
                <MetaRow>
                  <MetaLabel>Phương thức giao hàng</MetaLabel>
                  <ValueHighlight>{deliveryLabel}</ValueHighlight>
                </MetaRow>
                <MetaRow>
                  <MetaLabel>Phương thức thanh toán</MetaLabel>
                  <MetaValue>{paymentLabel}</MetaValue>
                </MetaRow>
              </MetaList>

              <ProductList>
                {orders.map((item) => (
                  <ProductCard
                    key={`${item?.name}-${item?.product || item?.id}`}
                  >
                    <ProductThumb src={item?.image} alt={item?.name} />
                    <ProductBody>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <ProductName>{item?.name}</ProductName>
                        <ProductMetaGroup>
                          <span>
                            <ProductMetaLabel>Giá:</ProductMetaLabel>{" "}
                            <ProductMetaValue>
                              {convertPrice(item?.price)}
                            </ProductMetaValue>
                          </span>
                          <span>
                            <ProductMetaLabel>Số lượng:</ProductMetaLabel>{" "}
                            <ProductMetaValue>{item?.amount}</ProductMetaValue>
                          </span>
                        </ProductMetaGroup>
                      </div>
                    </ProductBody>
                  </ProductCard>
                ))}
              </ProductList>
            </InfoPanel>

            <SidePanel as={Panel}>
              <SideTitle>Tóm tắt thanh toán</SideTitle>
              <AmountSummary>
                <SummaryRow>
                  <span>Tạm tính</span>
                  <SummaryValue>
                    {convertPrice(state?.totalPriceMemo || 0)}
                  </SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <span>Giảm giá</span>
                  <SummaryValue>
                    {convertPrice(state?.discountMemo || 0)}
                  </SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <span>Phí giao hàng</span>
                  <SummaryValue>
                    {convertPrice(state?.deliveryPriceMemo || 0)}
                  </SummaryValue>
                </SummaryRow>
              </AmountSummary>

              <TotalRow>
                <span>Tổng tiền</span>
                <TotalValue>
                  {convertPrice(state?.totalPriceMemo || 0)}
                </TotalValue>
              </TotalRow>

              <Actions>
                <PrimaryButton onClick={() => navigate("/")}>
                  Về trang chủ
                </PrimaryButton>
                <SecondaryButton onClick={() => navigate("/my-order")}>
                  Theo dõi đơn hàng
                </SecondaryButton>
              </Actions>
            </SidePanel>
          </SuccessGrid>
        </OrderSuccessShell>
      </Loading>
    </OrderSuccessWrapper>
  );
};

export default OrderSuccess;
