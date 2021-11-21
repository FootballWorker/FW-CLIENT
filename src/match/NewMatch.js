import React , {useState} from 'react'
import {
  Card,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { DesktopDateTimePicker, MobileDateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import WebSiteLink from "../components/design-button/WebSiteLink.js";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import auth from "../auth/auth-helper.js";
import { create } from "./api-match";
import FormError from "../errorHandler/FormError.js";

const data = {
  seasons: [
    "2021/2022",
    "2022/2023",
    "2023/2024",
    "2024/2025",
    "2025/2026",
    "2026/2027",
    "2027/2028",
    "2028/2029",
    "2029/2030",
    "2030/2031",
    "2031/2032",
    "2032/2033",
    "2033/2034",
    "2034/2035",
    "2035/2036",
    "2036/2037",
    "2037/2038",
    "2038/2039",
    "2039/2040",
  ],
  sections: ["League", "Cup", "International"],
};

const NewMatch = ({match}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [progress, setProgress] = useState(false);
  const [values, setValues] = useState({
    title: "",
    season: "",
    section: "",
    date: new Date(),
    error: "",
    open:false
  });
  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues({
      title: "",
      season: "",
      section: "",
      date: new Date(),
      error:""
    });
  };

  const onclickMatch = () => {
    setProgress(true);
    let matchData = {
      title: values.title || undefined,
      season: values.season || undefined,
      section: values.section || undefined,
      date: values.date || undefined,
    };
    create({ teamId: match.params.teamId }, { t: jwt.token }, matchData).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
        setProgress(false);
      } else {
        setValues({
          ...values,
          error:"",
          open: true,
        });
        setProgress(false);
      }
    });
  };

  return (
    <div>
      <Paper
        elevation={12}
        sx={{
          margin: "auto",
          mt: 11,
          p: 0.5,
          maxWidth: 600,
          height: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h6"
          sx={{
            p: 3,
            fontWeight: "bold",
            fontFamily: "Monospace",
            letterSpacing: 3,
          }}
        >
          NEW MATCH
        </Typography>
        <Divider variant="middle" />
        <Card>
          <TextField
            id="title"
            fullWidth
            required
            label="Title"
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.title}
            onChange={handleChange("title")}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {matches ? (
              <DesktopDateTimePicker
                value={values.date}
                label="Choose Date"
                fullWidth
                required
                onChange={(newValue) => {
                  setValues({ ...values, date: newValue });
                }}
                renderInput={(params) => <TextField required {...params} />}
              />
            ) : (
              <MobileDateTimePicker
                fullWidth
                required
                value={values.date}
                label="Choose Date"
                onChange={(newValue) => {
                  setValues({ ...values, date: newValue });
                }}
                renderInput={(params) => <TextField required {...params} />}
              />
            )}
          </LocalizationProvider>
          <TextField
            id="season"
            select
            fullWidth
            required
            label="Select Season"
            value={values.season}
            onChange={handleChange("season")}
            sx={{
              m: 2,
            }}
            helperText="Please select season"
            variant="standard"
          >
            {data.seasons.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="section"
            select
            fullWidth
            required
            label="Select Section"
            value={values.section}
            onChange={handleChange("section")}
            sx={{
              m: 2,
            }}
            helperText="Please select section"
            variant="standard"
          >
            {data.sections.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {values.error && <FormError text={values.error} />}
          <CardActions
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CancelButton onClick={clearForm} text="Clear" />
            <WebSiteButton onClick={onclickMatch} text="Submit" />
          </CardActions>
        </Card>
      </Paper>
      <Dialog open={values.open}>
        <DialogTitle>New Match</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New match successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <WebSiteLink link="/home" text="Go Home" />
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default NewMatch
