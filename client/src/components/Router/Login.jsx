//Login Button Functionality and Register Route
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";



function Login() {
    const navigate = useNavigate();
    return (
      <div>
      <button>Login</button>
      <Button
            variant="secondary"
            className="ml-2"
            onClick={() => navigate(`/register`)}
          >
            Register New Account
          </Button>
      </div>
    );
  };
  
  export default Login;