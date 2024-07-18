// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logo.png';

const Logo = () => {
  const theme = useTheme();

  return (
    <div>
      <img id="logo" src={logo} alt="Berry"  width="190" style={{marginTop: "5px", marginLeft: "-10px"}}/>
    </div>
  );
};

export default Logo;
