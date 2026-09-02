import React, { useEffect, useState } from "react";
import {
  AddressSection,
  AvatarFrame,
  AvatarHint,
  AvatarImage,
  AvatarPlaceholder,
  FormActions,
  FormField,
  FormGrid,
  FormSectionTitle,
  PageEyebrow,
  PageSubtitle,
  PageTitle,
  ProfileAside,
  ProfileContent,
  ProfileEmail,
  ProfileForm,
  ProfileName,
  ProfilePageWrapper,
  ProfileShell,
  SaveButton,
  StatusMessage,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button } from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [city, setCity] = useState("");
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const dispatch = useDispatch();
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
    setCity(user?.city);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnchangeCity = (value) => {
    setCity(value);
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      city,
      avatar,
      access_token: user?.access_token,
    });
  };
  return (
    <ProfilePageWrapper>
      <ProfileShell>
        <WrapperHeader>
          <PageEyebrow>Account settings</PageEyebrow>
          <PageTitle>Thông tin cá nhân</PageTitle>
          <PageSubtitle>
            Quản lý thông tin để trải nghiệm mua sắm thuận tiện hơn.
          </PageSubtitle>
        </WrapperHeader>
        <Loading isPending={isPending}>
          <ProfileContent>
            <ProfileAside>
              <AvatarFrame>
                {avatar ? (
                  <AvatarImage src={avatar} alt="Ảnh đại diện" />
                ) : (
                  <AvatarPlaceholder>
                    {(name || "P").charAt(0).toUpperCase()}
                  </AvatarPlaceholder>
                )}
              </AvatarFrame>
              <ProfileName>{name || "Thành viên Phone Plaza"}</ProfileName>
              <ProfileEmail>{email || "Chưa cập nhật email"}</ProfileEmail>
              <AvatarHint>
                Cập nhật ảnh đại diện để hồ sơ của bạn trở nên nổi bật hơn.
              </AvatarHint>
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button icon={<UploadOutlined />}>Đổi ảnh đại diện</Button>
              </WrapperUploadFile>
            </ProfileAside>
            <ProfileForm>
              <FormSectionTitle>Thông tin tài khoản</FormSectionTitle>
              <FormGrid>
                <FormField>
                  <WrapperLabel htmlFor="name">
                    <UserOutlined /> Tên hiển thị
                  </WrapperLabel>
                  <WrapperInput>
                    <InputForm
                      id="name"
                      size="large"
                      value={name}
                      onChange={handleOnchangeName}
                    />
                  </WrapperInput>
                </FormField>
                <FormField>
                  <WrapperLabel htmlFor="email">
                    <MailOutlined /> Email
                  </WrapperLabel>
                  <WrapperInput>
                    <InputForm
                      id="email"
                      size="large"
                      value={email}
                      onChange={handleOnchangeEmail}
                    />
                  </WrapperInput>
                </FormField>
                <FormField>
                  <WrapperLabel htmlFor="phone">
                    <PhoneOutlined /> Số điện thoại
                  </WrapperLabel>
                  <WrapperInput>
                    <InputForm
                      id="phone"
                      size="large"
                      value={phone}
                      onChange={handleOnchangePhone}
                    />
                  </WrapperInput>
                </FormField>
              </FormGrid>
              <AddressSection>
                <FormSectionTitle>Địa chỉ giao hàng</FormSectionTitle>
                <FormGrid>
                  <FormField>
                    <WrapperLabel htmlFor="address">
                      <HomeOutlined /> Địa chỉ
                    </WrapperLabel>
                    <WrapperInput>
                      <InputForm
                        id="address"
                        size="large"
                        value={address}
                        onChange={handleOnchangeAddress}
                      />
                    </WrapperInput>
                  </FormField>
                  <FormField>
                    <WrapperLabel htmlFor="city">
                      <EnvironmentOutlined /> Thành phố
                    </WrapperLabel>
                    <WrapperInput>
                      <InputForm
                        id="city"
                        size="large"
                        value={city}
                        onChange={handleOnchangeCity}
                      />
                    </WrapperInput>
                  </FormField>
                </FormGrid>
              </AddressSection>
              {data?.status === "ERR" && (
                <StatusMessage>{data?.message}</StatusMessage>
              )}
              <FormActions>
                <SaveButton type="button" onClick={handleUpdate}>
                  Lưu thay đổi
                </SaveButton>
              </FormActions>
            </ProfileForm>
          </ProfileContent>
        </Loading>
      </ProfileShell>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
