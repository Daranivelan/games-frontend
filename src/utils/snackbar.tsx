import { Ticket, Tickets } from "lucide-react";
import { toast } from "react-toastify";

export const showSnackbar = (message: string, type: "success" | "error") => {
  toast(message, {
    className: type === "success" ? "my-custom-toast" : "my-custom-toast-error",
    icon: type === "success" ? <Ticket /> : <Tickets />,
  });
};
