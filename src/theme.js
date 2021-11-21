import { createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";


const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#51545B",
      main: "#51545B",
      dark: "#51545B",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FED829",
      main: "#FED829",
      dark: "#FED829",
      contrastText: "#000",
    },
    openTitle: "#3f4771",
    protectedTitle: yellow["400"],
    type: "light",
  },
});
export default theme;
