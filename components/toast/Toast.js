import { toast } from "react-toastify";
import { Notification } from "./Notification";


const success = (
  title,
  description,
  config
) => {
  toast.success(<Notification title={title} description={description} />, {
    progressClassName: "!bg-orange",
    className: "!bg-grey-500",
    ...config,
  });
};

const error = (
  title,
  description,
  config
) => {
  toast.error(<Notification title={title} description={description} />, {
    progressClassName: "!bg-alert-red",
    className: "!bg-grey-500",
    ...config,
  });
};

export const Toast = { success, error };
