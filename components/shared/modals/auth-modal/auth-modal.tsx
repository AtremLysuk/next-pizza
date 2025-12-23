import {FC, useState} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui";
import {signIn} from "next-auth/react";
import {LoginForm} from "./forms/login-form";
import {RegisterForm} from "./forms/register-form";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: FC<Props> = ({open, onClose}) => {
  const [type, setType] = useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <FaGithub size={24} />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >

            <FcGoogle size={24} />
            Google
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {type === "login" ? "Войти" : "Регистрация"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
