import { toast } from 'sonner';

const ToastNotification = (code, message) => {
  console.log("Toast Code:", code);
  if (code === 1) {
    toast.success(message);
    console.log("Toast success:", message);
  } else if (code === 0) {
    toast.warning(message);
    console.log("Toast warning:", message);
  } else {
    toast.error(message);
    console.log("Toast error:", message);
  }
};

export default ToastNotification;
