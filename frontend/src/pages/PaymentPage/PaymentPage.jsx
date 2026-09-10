import { Form, Radio } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  AddressAction,
  AddressBlock,
  AddressText,
  CheckoutCard,
  CheckoutLayout,
  DeliveryOption,
  HeaderGroup,
  Lable,
  OrderButtonWrap,
  PageEyebrow,
  PageTitle,
  PayPalWrap,
  PaymentPageWrapper,
  PaymentShell,
  SectionHeader,
  SectionTag,
  SectionTitle,
  SummaryCard,
  SummaryList,
  SummaryRow,
  SummaryValue,
  TotalHint,
  TotalLabel,
  TotalValue,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from "../../services/PaymentService";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const discountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      const discountAmount = (cur.price * cur.amount * totalDiscount) / 100;
      return total + discountAmount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 200000 && priceMemo < 500000) {
      return 15000;
    } else if (priceMemo >= 500000) {
      return 0;
    } else {
      return 30000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(discountMemo) + Number(deliveryPriceMemo);
  }, [priceMemo, discountMemo, deliveryPriceMemo]);

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: deliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        email: user?.email,
      });
    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const { isPending, data } = mutationUpdate;
  const {
    data: dataAdd,
    isPending: isPendingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const arrayOrdered = [];
      order?.orderItemsSelected?.forEach((element) => {
        arrayOrdered.push(element.product);
      });
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      message.success("Đặt hàng thành công");
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSelected,
          totalPriceMemo: totalPriceMemo,
          deliveryPriceMemo: deliveryPriceMemo,
          discountMemo: discountMemo,
        },
      });
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      createdAt: "",
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemsSelected,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      city: user?.city,
      paymentMethod: payment,
      itemsPrice: priceMemo,
      shippingPrice: deliveryPriceMemo,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email,
    });
  };

  const handleUpdateInfoUser = () => {
    const { name, address, phone, city } = stateUserDetails;
    if (name && address && phone && city) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, phone, city }));
            setIsOpenModalUpdateInfo(false);
          },
        },
      );
    }
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    <PaymentPageWrapper>
      <Loading isPending={isPendingAddOrder}>
        <PaymentShell>
          <HeaderGroup>
            <PageEyebrow>Checkout</PageEyebrow>
            <PageTitle>Thanh toán</PageTitle>
          </HeaderGroup>

          <CheckoutLayout>
            <WrapperLeft>
              <CheckoutCard>
                <SectionHeader>
                  <SectionTitle>Phương thức giao hàng</SectionTitle>
                  <SectionTag>Delivery</SectionTag>
                </SectionHeader>
                <WrapperInfo>
                  <Lable>Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDelivery} value={delivery}>
                    <Radio value="fast">
                      <DeliveryOption>
                        <span>FAST</span>
                        Giao hàng tiết kiệm
                      </DeliveryOption>
                    </Radio>
                    <Radio value="gojek">
                      <DeliveryOption>
                        <span>GO_JEK</span>
                        Giao hàng nhanh trong ngày
                      </DeliveryOption>
                    </Radio>
                  </WrapperRadio>
                </WrapperInfo>
              </CheckoutCard>

              <CheckoutCard>
                <SectionHeader>
                  <SectionTitle>Phương thức thanh toán</SectionTitle>
                  <SectionTag>Payment</SectionTag>
                </SectionHeader>
                <WrapperInfo>
                  <Lable>Chọn hình thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">
                      <DeliveryOption>
                        <span>COD</span>
                        Thanh toán tiền mặt khi nhận hàng
                      </DeliveryOption>
                    </Radio>
                    <Radio value="paypal">
                      <DeliveryOption>
                        <span>PAYPAL</span>
                        Thanh toán bằng ví PayPal
                      </DeliveryOption>
                    </Radio>
                  </WrapperRadio>
                </WrapperInfo>
              </CheckoutCard>
            </WrapperLeft>

            <WrapperRight>
              <SummaryCard>
                <SectionHeader>
                  <SectionTitle>Địa chỉ nhận hàng</SectionTitle>
                  <SectionTag>Info</SectionTag>
                </SectionHeader>
                <WrapperInfo>
                  <AddressBlock>
                    <AddressText>
                      {`${user?.address || "Chưa có địa chỉ"} - ${
                        user?.city || "Chưa cập nhật"
                      }`}
                    </AddressText>
                    <AddressAction onClick={handleChangeAddress} type="button">
                      Thay đổi
                    </AddressAction>
                  </AddressBlock>
                </WrapperInfo>
              </SummaryCard>

              <SummaryCard>
                <SectionHeader>
                  <SectionTitle>Tóm tắt thanh toán</SectionTitle>
                  <SectionTag>Summary</SectionTag>
                </SectionHeader>
                <WrapperInfo>
                  <SummaryList>
                    <SummaryRow>
                      <span>Tạm tính</span>
                      <SummaryValue>{convertPrice(priceMemo)}</SummaryValue>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Giảm giá</span>
                      <SummaryValue>{convertPrice(discountMemo)}</SummaryValue>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Phí giao hàng</span>
                      <SummaryValue>
                        {convertPrice(deliveryPriceMemo)}
                      </SummaryValue>
                    </SummaryRow>
                  </SummaryList>

                  <WrapperTotal>
                    <TotalLabel>Tổng tiền</TotalLabel>
                    <TotalValue>
                      <span>{convertPrice(totalPriceMemo)}</span>
                      <TotalHint>(Đã bao gồm VAT nếu có)</TotalHint>
                    </TotalValue>
                  </WrapperTotal>
                </WrapperInfo>
              </SummaryCard>

              {payment === "paypal" && sdkReady ? (
                <PayPalWrap>
                  <PayPalButton
                    amount={Math.round(totalPriceMemo / 30000)}
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert("Error");
                    }}
                  />
                </PayPalWrap>
              ) : (
                <OrderButtonWrap>
                  <ButtonComponent
                    onClick={() => handleAddOrder()}
                    size={40}
                    styleButton={{
                      background:
                        "linear-gradient(135deg, #0d6b68 0%, #0f4d63 100%)",
                      height: "50px",
                      width: "100%",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 16px 30px rgba(13, 107, 104, 0.22)",
                    }}
                    textbutton={"Đặt hàng"}
                    styletextbutton={{
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  ></ButtonComponent>
                </OrderButtonWrap>
              )}
            </WrapperRight>
          </CheckoutLayout>
        </PaymentShell>

        <ModalComponent
          forceRender
          title="Cập nhật thông tin giao hàng"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancelUpdate}
          onOk={handleUpdateInfoUser}
        >
          <Loading isPending={isPending}>
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <InputComponent
                  value={stateUserDetails["name"]}
                  onChange={handleOnChangeDetails}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="Thành phố"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <InputComponent
                  value={stateUserDetails["city"]}
                  onChange={handleOnChangeDetails}
                  name="city"
                />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.phone}
                  onChange={handleOnChangeDetails}
                  name="phone"
                />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.address}
                  onChange={handleOnChangeDetails}
                  name="address"
                />
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>
      </Loading>
    </PaymentPageWrapper>
  );
};

export default PaymentPage;
