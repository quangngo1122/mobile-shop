import { Badge, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {
  AccountAvatar,
  AccountFallback,
  AccountName,
  AccountTrigger,
  CartButton,
  HeaderActions,
  HeaderBar,
  HeaderSearch,
  LoginButton,
  WrapperHeader,
  WrapperLogoHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopover,
} from "./style";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import logo from "../../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState("");
  const order = useSelector((state) => state.order);
  const [pending, setPending] = useState(false);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setPending(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setPending(false);
    navigate("/");
  };

  useEffect(() => {
    setPending(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setPending(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopover
        onClick={() => handleClickNavigate("profile-user")}
      >
        Thông tin người dùng
      </WrapperContentPopover>
      {user?.isAdmin && (
        <WrapperContentPopover onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopover>
      )}
      <WrapperContentPopover onClick={() => handleClickNavigate("my-order")}>
        Đơn hàng của tôi
      </WrapperContentPopover>
      <WrapperContentPopover onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopover>
    </div>
  );
  const handleClickNavigate = (type) => {
    if (type === "profile-user") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <HeaderBar>
      <WrapperHeader>
        <WrapperLogoHeader onClick={() => navigate("/")}>
          <img src={logo} alt="Mobile Shop" />
        </WrapperLogoHeader>
        <HeaderSearch>
          <ButtonInputSearch
            size="large"
            placeholder="Bạn đang tìm gì?"
            onChange={onSearch}
          />
        </HeaderSearch>
        <HeaderActions>
          <Loading isPending={pending}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <AccountAvatar src={userAvatar} alt="Ảnh đại diện" />
              ) : (
                <AccountFallback>
                  <UserOutlined />
                </AccountFallback>
              )}
              {user?.access_token ? (
                <Popover content={content} trigger="click" open={isOpenPopup}>
                  <AccountTrigger
                    onClick={() => setIsOpenPopup((prev) => !prev)}
                  >
                    <AccountName>
                      {userName?.length ? userName : user?.email}
                    </AccountName>
                  </AccountTrigger>
                </Popover>
              ) : (
                <LoginButton type="button" onClick={handleNavigateLogin}>
                  Đăng nhập
                </LoginButton>
              )}
            </WrapperHeaderAccount>
          </Loading>
          <CartButton type="button" onClick={() => navigate("/order")}>
            <Badge count={order?.orderItems?.length} size="small">
              <ShoppingCartOutlined />
            </Badge>
            <WrapperTextHeaderSmall className="header-cart-label">
              Giỏ hàng
            </WrapperTextHeaderSmall>
          </CartButton>
        </HeaderActions>
      </WrapperHeader>
    </HeaderBar>
  );
};

export default HeaderComponent;
