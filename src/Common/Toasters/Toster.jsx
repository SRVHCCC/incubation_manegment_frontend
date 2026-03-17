import toast from "react-hot-toast";

export const SuccessToast = ({ content }) => {
  toast.success(content, {
    position: "bottom-right",
    icon: "✅",
  });
};
export const ErrorToast = ({ content }) => {
  toast.error(content, {
    position: "bottom-right",
    icon: "❌",
  });
};
export const WarningToast = ({ content }) => {
  toast.warning(content, {
    position: "bottom-right",
    icon: "⚠️",
  });
};
