import { FC, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<"login" | "register">("login");
  const isLogin = type === "login";

  const onSwitchType = () => {
    setType(isLogin ? "register" : "login");
  };

  // При закрытии возвращаемся к входу: при следующем открытии пользователь ждёт именно его
  const handleClose = () => {
    onClose();
    setType("login");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        aria-describedby={undefined}
        className="w-[450px] bg-white p-6 sm:p-10"
      >
        <DialogTitle className="sr-only">
          {isLogin ? "Вход в аккаунт" : "Регистрация"}
        </DialogTitle>

        {isLogin ? <LoginForm onClose={handleClose} /> : <RegisterForm />}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("github", { callbackUrl: "/", redirect: true })
            }
            type="button"
            className="h-12 flex-1 gap-2 p-2"
          >
            <FaGithub size={24} aria-hidden="true" />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: true })
            }
            type="button"
            className="h-12 flex-1 gap-2 p-2"
          >
            <FcGoogle size={24} aria-hidden="true" />
            Google
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {isLogin ? "Регистрация" : "У меня есть аккаунт"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
