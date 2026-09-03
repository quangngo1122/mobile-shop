import { Checkbox, Form } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  AddressValue,
  ChangeAddress,
  CheckoutButton,
  OrderHeader,
  OrderLayout,
  OrderPageWrapper,
  OrderShell,
  PageEyebrow,
  PageTitle,
  PriceLine,
  PriceValue,
  ProductIdentity,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductTotal,
  QuantityButton,
  RemoveButton,
  SummaryTitle,
  TotalValue,
  VatNote,
  WrapperCountOrder,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDelivery,
  WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepConponent/StepComponent";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onChange = (e) =>
    setListChecked(
      listChecked.includes(e.target.value)
        ? listChecked.filter((item) => item !== e.target.value)
        : [...listChecked, e.target.value],
    );
  const handleChangeCount = (type, idProduct) => {
    dispatch(
      type === "increase"
        ? increaseAmount({ idProduct })
        : decreaseAmount({ idProduct }),
    );
  };
  const handleDeleteOrder = (idProduct) =>
    dispatch(removeOrderProduct({ idProduct }));
  const handleOnchangeCheckAll = (e) =>
    setListChecked(
      e.target.checked
        ? order?.orderItems?.map((item) => item?.product) || []
        : [],
    );

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked, dispatch]);
  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);
  useEffect(() => {
    if (isOpenModalUpdateInfo)
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
  }, [isOpenModalUpdateInfo, user]);

  const priceMemo = useMemo(
    () =>
      order?.orderItemsSelected?.reduce(
        (total, cur) => total + cur.price * cur.amount,
        0,
      ),
    [order],
  );
  const discountMemo = useMemo(
    () =>
      order?.orderItemsSelected?.reduce(
        (total, cur) =>
          total + (cur.price * cur.amount * (cur.discount || 0)) / 100,
        0,
      ) || 0,
    [order],
  );
  const deliveryPriceMemo = useMemo(
    () =>
      priceMemo >= 200000 && priceMemo < 500000
        ? 15000
        : priceMemo >= 500000 || order?.orderItemsSelected?.length === 0
          ? 0
          : 30000,
    [priceMemo, order],
  );
  const totalPriceMemo = useMemo(
    () => Number(priceMemo) - Number(discountMemo) + Number(deliveryPriceMemo),
    [priceMemo, discountMemo, deliveryPriceMemo],
  );
  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0)
      dispatch(removeAllOrderProduct({ listChecked }));
  };
  const handleAddCard = () => {
    if (!order?.orderItemsSelected?.length)
      message.error("Vui lòng chọn sản phẩm");
    else if (!user?.phone || !user?.address || !user?.name || !user?.city)
      setIsOpenModalUpdateInfo(true);
    else navigate("/payment");
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return UserService.updateUser(id, rests, token);
  });
  const { isPending, data } = mutationUpdate;
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
  const handleUpdateInfoUser = () => {
    const { name, address, phone, city } = stateUserDetails;
    if (name && address && phone && city)
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, phone, city }));
            setIsOpenModalUpdateInfo(false);
          },
        },
      );
  };
  const handleOnChangeDetails = (e) =>
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  const itemsDelivery = [
    { title: "Ship 30K", description: "Dưới 200.000 VND" },
    { title: "Ship 15K", description: "Từ 200.000 VND đến dưới 500.000 VND" },
    { title: "Free ship", description: "Trên 500.000 VND" },
  ];

  return (
    <OrderPageWrapper>
      <OrderShell>
        <OrderHeader>
          <PageEyebrow>Shopping bag</PageEyebrow>
          <PageTitle>Giỏ hàng</PageTitle>
        </OrderHeader>
        <OrderLayout>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <StepComponent
                items={itemsDelivery}
                current={
                  deliveryPriceMemo === 15000
                    ? 1
                    : deliveryPriceMemo === 30000
                      ? 0
                      : order.orderItemsSelected.length === 0
                        ? 0
                        : 2
                }
              />
            </WrapperStyleHeaderDelivery>
            <WrapperStyleHeader>
              <span>
                <Checkbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                />{" "}
                <span>Tất cả ({order?.orderItems?.length || 0} sản phẩm)</span>
              </span>
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Thành tiền</span>
              <RemoveButton
                aria-label="Xóa sản phẩm đã chọn"
                onClick={handleRemoveAllOrder}
              >
                <DeleteOutlined />
              </RemoveButton>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((item) => (
                <WrapperItemOrder key={item?.product}>
                  <ProductIdentity>
                    <Checkbox
                      onChange={onChange}
                      value={item?.product}
                      checked={listChecked.includes(item?.product)}
                    />
                    <ProductImage src={item?.image} alt={item?.name} />
                    <ProductName>{item?.name}</ProductName>
                  </ProductIdentity>
                  <ProductPrice>{convertPrice(item?.price)}</ProductPrice>
                  <WrapperCountOrder>
                    <QuantityButton
                      aria-label="Giảm số lượng"
                      onClick={() =>
                        handleChangeCount("decrease", item?.product)
                      }
                    >
                      <MinusOutlined />
                    </QuantityButton>
                    <WrapperInputNumber
                      defaultValue={item?.amount}
                      value={item?.amount}
                      size="small"
                    />
                    <QuantityButton
                      aria-label="Tăng số lượng"
                      onClick={() =>
                        handleChangeCount("increase", item?.product)
                      }
                    >
                      <PlusOutlined />
                    </QuantityButton>
                  </WrapperCountOrder>
                  <ProductTotal>
                    {convertPrice(item?.price * item?.amount)}
                  </ProductTotal>
                  <RemoveButton
                    aria-label={`Xóa ${item?.name}`}
                    onClick={() => handleDeleteOrder(item?.product)}
                  >
                    <DeleteOutlined />
                  </RemoveButton>
                </WrapperItemOrder>
              ))}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <SummaryTitle>Tóm tắt đơn hàng</SummaryTitle>
            <div>
              <div>
                <span>Địa chỉ giao hàng: </span>
                <AddressValue>{`${user?.address || "Chưa cập nhật"} - ${user?.city || ""}`}</AddressValue>
                <ChangeAddress
                  type="button"
                  onClick={() => setIsOpenModalUpdateInfo(true)}
                >
                  Thay đổi
                </ChangeAddress>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid #edf1f2",
                marginTop: 16,
                paddingTop: 12,
              }}
            >
              <PriceLine>
                <span>Tạm tính</span>
                <PriceValue>{convertPrice(priceMemo)}</PriceValue>
              </PriceLine>
              <PriceLine>
                <span>Giảm giá</span>
                <PriceValue>{convertPrice(discountMemo)}</PriceValue>
              </PriceLine>
              <PriceLine>
                <span>Phí giao hàng</span>
                <PriceValue>{convertPrice(deliveryPriceMemo)}</PriceValue>
              </PriceLine>
            </div>
            <WrapperTotal>
              <span>Tổng tiền</span>
              <TotalValue>
                {convertPrice(totalPriceMemo)}
                <VatNote>Đã bao gồm VAT nếu có</VatNote>
              </TotalValue>
            </WrapperTotal>
            <CheckoutButton type="button" onClick={handleAddCard}>
              Tiến hành đặt hàng
            </CheckoutButton>
          </WrapperRight>
        </OrderLayout>
      </OrderShell>
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
            {[
              ["Tên", "name"],
              ["Thành phố", "city"],
              ["Số điện thoại", "phone"],
              ["Địa chỉ", "address"],
            ].map(([label, name]) => (
              <Form.Item
                key={name}
                label={label}
                name={name}
                rules={[
                  { required: true, message: `Please input your ${name}!` },
                ]}
              >
                <InputComponent
                  value={stateUserDetails[name]}
                  onChange={handleOnChangeDetails}
                  name={name}
                />
              </Form.Item>
            ))}
          </Form>
        </Loading>
      </ModalComponent>
    </OrderPageWrapper>
  );
};

export default OrderPage;
