import React, { useEffect, useState } from "react";
import {
  BrandDescription,
  BrandEyebrow,
  BrandMark,
  BrandTitle,
  FieldGroup,
  FieldLabel,
  FormFooter,
  FormSubtitle,
  FormTitle,
  PasswordField,
  SignInCard,
  SignInPageWrapper,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogin from "../../assets/images/logo-login.png";
import { Image } from "antd";
import {
  EyeFilled,
  EyeInvisibleFilled,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isPending, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };
  return (
    <SignInPageWrapper>
      <SignInCard>
        <WrapperContainerLeft>
          <BrandEyebrow>Phone Plaza</BrandEyebrow>
          <FormTitle>Chào mừng trở lại</FormTitle>
          <FormSubtitle>
            Đăng nhập để tiếp tục trải nghiệm mua sắm của bạn.
          </FormSubtitle>
          <FieldGroup>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputForm
              id="email"
              size="large"
              prefix={<MailOutlined />}
              placeholder="name@example.com"
              value={email}
              onChange={handleOnchangeEmail}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
            <PasswordField>
              <InputForm
                id="password"
                size="large"
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={handleOnchangePassword}
              />
              <button
                type="button"
                className="password-toggle"
                aria-label={isShowPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </button>
            </PasswordField>
          </FieldGroup>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isPending={isPending}>
            <ButtonComponent
              isDisabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: "#0d6b68",
                height: "50px",
                width: "100%",
                border: "none",
                borderRadius: "8px",
                margin: "14px 0 20px",
                boxShadow: "0 10px 18px rgba(13, 107, 104, 0.2)",
              }}
              textbutton={"Đăng nhập"}
              styletextbutton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </Loading>
          <FormFooter>
            <span>Bạn chưa có tài khoản?</span>
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Tạo tài khoản
            </WrapperTextLight>
          </FormFooter>
          <p style={{ margin: "28px 0 0", textAlign: "center" }}>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <BrandMark>
            <Image
              src={imageLogin}
              preview={false}
              alt="Phone Plaza"
              height="118px"
              width="118px"
            />
          </BrandMark>
          <BrandTitle>Mua sắm thông minh</BrandTitle>
          <BrandDescription>
            Khám phá những sản phẩm công nghệ mới nhất dành riêng cho bạn.
          </BrandDescription>
        </WrapperContainerRight>
      </SignInCard>
    </SignInPageWrapper>
  );
};

export default SignInPage;
