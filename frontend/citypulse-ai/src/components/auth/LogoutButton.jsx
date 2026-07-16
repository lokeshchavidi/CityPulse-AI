import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button/Button";
import useAuth from "@/hooks/useAuth";

const LogoutButton = ({ variant = "ghost", size = "md", className = "" }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      leftIcon={<LogOut size={18} />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
