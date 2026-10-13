import { notification } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";

const notices = {
  success: {
    title: "Thành công",
    defaultDescription: "Thao tác đã được thực hiện thành công.",
    color: "#16845b",
    background: "#f2fbf6",
    border: "#c7ead5",
    icon: CheckCircleFilled,
    duration: 4,
  },
  error: {
    title: "Không thể hoàn tất",
    defaultDescription: "Đã xảy ra lỗi. Vui lòng thử lại.",
    color: "#c63f36",
    background: "#fff5f3",
    border: "#f3d0cb",
    icon: CloseCircleFilled,
    duration: 6,
  },
  warning: {
    title: "Cần chú ý",
    defaultDescription: "Vui lòng kiểm tra lại thông tin trước khi tiếp tục.",
    color: "#a86c08",
    background: "#fff9ec",
    border: "#f0dfb7",
    icon: ExclamationCircleFilled,
    duration: 5,
  },
};

const showNotice = (type, description) => {
  const notice = notices[type];
  const Icon = notice.icon;

  notification.open({
    message: notice.title,
    description: description || notice.defaultDescription,
    icon: <Icon style={{ color: notice.color, fontSize: 20 }} />,
    placement: "topRight",
    duration: notice.duration,
    pauseOnHover: true,
    style: {
      width: 360,
      maxWidth: "calc(100vw - 32px)",
      padding: "15px 18px",
      border: `1px solid ${notice.border}`,
      borderLeft: `4px solid ${notice.color}`,
      borderRadius: 10,
      background: notice.background,
      boxShadow: "0 12px 32px rgba(24, 45, 54, 0.16)",
    },
  });
};

const success = (description) => showNotice("success", description);
const error = (description) => showNotice("error", description);
const warning = (description) => showNotice("warning", description);

export { success, error, warning };
