import "./global.css";
import {createMuiTheme} from "@material-ui/core";

export default (isDark) => {
  return createMuiTheme({
    palette: {
      type: isDark ? "dark" : "light",
    },
    typography: {
      useNextVariants: true,
    },
  });
};
