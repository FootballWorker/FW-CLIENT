import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import PasswordIcon from "@mui/icons-material/Password";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import MenuItem from "@mui/material/MenuItem";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import PublicIcon from "@mui/icons-material/Public";
import YouTubeIcon from "@mui/icons-material/YouTube";

import Logo from "./../assets/images/orijinalLogo.png";
import { create } from "./api-user";
import { listByDepartment } from "./../job/api-jobs";
import { list } from "./../team/api-team";
import WebSiteButton from "./../components/design-button/WebSiteButton";
import WebSiteLink from "./../components/design-button/WebSiteLink";
import CancelButton from "./../components/design-button/CancelButton";
import FormError from "../errorHandler/FormError";
import SnackError from "../errorHandler/SnackError";
import PasswordSecure from "../components/PasswordSecure";

const countries = [
  "Andorra",
  "United Arab Emirates",
  "Afghanistan",
  "Antigua and Barbuda",
  "Anguilla",
  "Albania",
  "Armenia",
  "Angola",
  "Antarctica",
  "Argentina",
  "American Samoa",
  "Austria",
  "Australia",
  "Aruba",
  "Alland Islands",
  "Azerbaijan",
  "Bosnia and Herzegovina",
  "Barbados",
  "Bangladesh",
  "Belgium",
  "Burkina Faso",
  "Bulgaria",
  "Bahrain",
  "Burundi",
  "Benin",
  "Saint Barthelemy",
  "Bermuda",
  "Brunei Darussalam",
  "Bolivia",
  "Brazil",
  "Bahamas",
  "Bhutan",
  "Bouvet Island",
  "Botswana",
  "Belarus",
  "Belize",
  "Canada",
  "Cocos (Keeling) Islands",
  "Congo, Democratic Republic of the",
  "Central African Republic",
  "Congo, Republic of the",
  "Switzerland",
  "Cote d'Ivoire",
  "Cook Islands",
  "Chile",
  "Cameroon",
  "China",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Cape Verde",
  "Curacao",
  "Christmas Island",
  "Cyprus",
  "Czech Republic",
  "Germany",
  "Djibouti",
  "Denmark",
  "Dominica",
  "Dominican Republic",
  "Algeria",
  "Ecuador",
  "Estonia",
  "Egypt",
  "Western Sahara",
  "Eritrea",
  "Spain",
  "Ethiopia",
  "Finland",
  "Fiji",
  "Falkland Islands (Malvinas)",
  "Micronesia, Federated States of",
  "Faroe Islands",
  "France",
  "Gabon",
  "United Kingdom",
  "Grenada",
  "Georgia",
  "French Guiana",
  "Guernsey",
  "Ghana",
  "Gibraltar",
  "Greenland",
  "Gambia",
  "Guinea",
  "Guadeloupe",
  "Equatorial Guinea",
  "Greece",
  "South Georgia and the South Sandwich Islands",
  "Guatemala",
  "Guam",
  "Guinea-Bissau",
  "Guyana",
  "Hong Kong",
  "Heard Island and McDonald Islands",
  "Honduras",
  "Croatia",
  "Haiti",
  "Hungary",
  "Indonesia",
  "Ireland",
  "Israel",
  "Isle of Man",
  "India",
  "British Indian Ocean Territory",
  "Iraq",
  "Iran, Islamic Republic of",
  "Iceland",
  "Italy",
  "Jersey",
  "Jamaica",
  "Jordan",
  "Japan",
  "Kenya",
  "Kyrgyzstan",
  "Cambodia",
  "Kiribati",
  "Comoros",
  "Saint Kitts and Nevis",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Cayman Islands",
  "Kazakhstan",
  "Lao People's Democratic Republic",
  "Lebanon",
  "Saint Lucia",
  "Liechtenstein",
  "Sri Lanka",
  "Liberia",
  "Lesotho",
  "Lithuania",
  "Luxembourg",
  "Latvia",
  "Libya",
  "Morocco",
  "Monaco",
  "Moldova, Republic of",
  "Montenegro",
  "Saint Martin (French part)",
  "Madagascar",
  "Marshall Islands",
  "Macedonia, the Former Yugoslav Republic of",
  "Mali",
  "Myanmar",
  "Mongolia",
  "Macao",
  "Northern Mariana Islands",
  "Martinique",
  "Mauritania",
  "Montserrat",
  "Malta",
  "Mauritius",
  "Maldives",
  "Malawi",
  "Mexico",
  "Malaysia",
  "Mozambique",
  "Namibia",
  "New Caledonia",
  "Niger",
  "Norfolk Island",
  "Nigeria",
  "Nicaragua",
  "Netherlands",
  "Norway",
  "Nepal",
  "Nauru",
  "Niue",
  "New Zealand",
  "Oman",
  "Panama",
  "Peru",
  "French Polynesia",
  "Papua New Guinea",
  "Philippines",
  "Pakistan",
  "Poland",
  "Saint Pierre and Miquelon",
  "Pitcairn",
  "Puerto Rico",
  "Palestine, State of",
  "Portugal",
  "Palau",
  "Paraguay",
  "Qatar",
  "Reunion",
  "Romania",
  "Serbia",
  "Russian Federation",
  "Rwanda",
  "Saudi Arabia",
  "Solomon Islands",
  "Seychelles",
  "Sudan",
  "Sweden",
  "Singapore",
  "Saint Helena",
  "Slovenia",
  "Svalbard and Jan Mayen",
  "Slovakia",
  "Sierra Leone",
  "San Marino",
  "Senegal",
  "Somalia",
  "Suriname",
  "South Sudan",
  "Sao Tome and Principe",
  "El Salvador",
  "Sint Maarten (Dutch part)",
  "Syrian Arab Republic",
  "Swaziland",
  "Turks and Caicos Islands",
  "Chad",
  "French Southern Territories",
  "Togo",
  "Thailand",
  "Tajikistan",
  "Tokelau",
  "Timor-Leste",
  "Turkmenistan",
  "Tunisia",
  "Tonga",
  "Turkey",
  "Trinidad and Tobago",
  "Tuvalu",
  "Taiwan, Province of China",
  "United Republic of Tanzania",
  "Ukraine",
  "Uganda",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Holy See (Vatican City State)",
  "Saint Vincent and the Grenadines",
  "Venezuela",
  "British Virgin Islands",
  "US Virgin Islands",
  "Vietnam",
  "Vanuatu",
  "Wallis and Futuna",
  "Samoa",
  "Kosovo",
  "Yemen",
  "Mayotte",
  "South Africa",
  "Zambia",
  "Zimbabwe",
];

export default function Signup({ match }) {
  const [teams, setTeams] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    passwordSecond: "",
    country: "",
    job: "",
    favoriteTeam: "",
    open: "",
    error: "",
    message: "",
  });
  const [isError, setIsError] = React.useState({
    openSnack: false,
    error: "",
  });
  function validateEmail(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  // Load Jobs
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByDepartment({ departmentId: match.params.departmentId }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setJobs(data);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.departmentId]);

  // Load Teams
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setTeams(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const clearOut = () => {
    setValues({ name: "", email: "", password: "", job: "", favoriteTeam: "" });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    if (values.password !== values.passwordSecond) {
      return setValues({ ...values, error: "Passwords do not match!" });
    }

    if (!validateEmail(values.email)) {
      return setValues({ ...values, error: "Email do not proper!" });
    }

    if (values.job === "") {
      return setValues({ ...values, error: "You have to select a job!" });
    }

    if (values.favoriteTeam === "") {
      return setValues({ ...values, error: "You have to select a team!" });
    }

    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      country: values.country || undefined,
      department: match.params.departmentId || undefined,
      job: values.job || undefined,
      favoriteTeam: values.favoriteTeam || undefined,
      password: values.password || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true, message: data.message });
      }
    });
  };

  return (
    <Box
      sx={{
        pt: {
          xs: 0,
          sm: 1,
          md: 2,
          lg: 4,
        },
        pb: 0.1,
        bgcolor: "#FED829",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={8}
            sx={{
              margin: "auto",
              p: {
                xs: 0.1,
                sm: 1,
                md: 2,
                lg: 3,
              },
              width: 500,
              maxWidth: "100%",
              bgcolor: "#51545B",
            }}
          >
            <Typography
              align="center"
              gutterBottom
              sx={{
                p: 2,
                fontSize: {
                  xs: 18,
                  sm: 24,
                  md: 27,
                  lg: 29,
                },
                fontWeight: "bold",
                color: "#FED829",
              }}
            >
              Become Football Worker
            </Typography>
            <Card sx={{ bgcolor: "#51545B", p: 3 }}>
              <TextField
                id="name"
                label={
                  <Typography sx={{ color: "#FED829" }}>User Name</Typography>
                }
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#FED829" }} />
                    </InputAdornment>
                  ),
                }}
                value={values.name}
                onChange={handleChange("name")}
                color="warning"
                variant="standard"
                sx={{ mb: 2, bgcolor: "#51545B" }}
              />
              <TextField
                id="email"
                label={<Typography sx={{ color: "#FED829" }}>Email</Typography>}
                type="email"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon sx={{ color: "#FED829" }} />
                    </InputAdornment>
                  ),
                }}
                value={values.email}
                onChange={handleChange("email")}
                color="warning"
                variant="standard"
                sx={{ mb: 2, bgcolor: "#51545B" }}
              />
              <TextField
                id="country"
                required
                select
                fullWidth
                label={
                  <Typography sx={{ color: "#FED829" }}>Country</Typography>
                }
                value={values.country}
                onChange={handleChange("country")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicIcon sx={{ color: "#FED829" }} />
                    </InputAdornment>
                  ),
                }}
                color="warning"
                variant="standard"
                sx={{ mb: 2, bgcolor: "#51545B" }}
              >
                {countries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="job"
                select
                required
                fullWidth
                label={<Typography sx={{ color: "#FED829" }}>Job</Typography>}
                value={values.job}
                onChange={handleChange("job")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon sx={{ color: "#FED829" }} />
                    </InputAdornment>
                  ),
                }}
                color="warning"
                variant="standard"
                sx={{ mb: 2, bgcolor: "#51545B" }}
              >
                {jobs.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="favoriteTeam"
                select
                required
                fullWidth
                label={
                  <Typography sx={{ color: "#FED829" }}>Member Team</Typography>
                }
                placeholder="You will be member of this team!"
                value={values.favoriteTeam}
                onChange={handleChange("favoriteTeam")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupsIcon sx={{ color: "#FED829" }} />
                    </InputAdornment>
                  ),
                }}
                color="warning"
                variant="standard"
                sx={{ mb: 2, bgcolor: "#51545B" }}
              >
                {teams.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="password"
                label={
                  <Typography sx={{ color: "#FED829" }}>Password</Typography>
                }
                fullWidth
                type="password"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon sx={{ color: "#FED829" }} />
                    </InputAdornment>
                  ),
                }}
                value={values.password}
                onChange={handleChange("password")}
                color="warning"
                variant="standard"
                sx={{ mb: 0.5, bgcolor: "#51545B" }}
              />
              <PasswordSecure password={values.password} />
              <TextField
                id="passwordSecond"
                label={
                  <Typography sx={{ color: "#FED829" }}>
                    Password Again
                  </Typography>
                }
                fullWidth
                type="password"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon sx={{ color: "#FED829" }} />
                    </InputAdornment>
                  ),
                }}
                value={values.passwordSecond}
                onChange={handleChange("passwordSecond")}
                color="warning"
                variant="standard"
                sx={{ mb: 2, bgcolor: "#51545B" }}
              />
              {values.error && <FormError text={values.error} />}
              <CardActions
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                  p: 1,
                  border: "5px",
                  borderColor: "#51545B",
                  borderRadius: "5%",
                }}
              >
                <CancelButton onClick={clearOut} text="Clear" />
                <WebSiteButton onClick={clickSubmit} text="Submit" />
              </CardActions>
            </Card>
          </Paper>
          <Box
            sx={{
              margin: "auto",
              mt: 2,
              bgcolor: "#51545B",
              width: 400,
              maxWidth: "100%",
              p: 0,
              border: 1,
              borderRadius: "4%",
            }}
          >
            <Typography
              align="center"
              gutterBottom
              sx={{ p: 2, color: "#FED829" }}
            >
              If you already a FW
            </Typography>
            <Divider variant="center" />
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "#FED829" }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: "4%",
                  ":hover": { bgcolor: "#FED829", color: "#51545B" },
                }}
              >
                <Typography
                  align="center"
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  Sign In
                </Typography>
              </Box>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              mt: 7,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Grid
        container
        sx={{
          mt: {
            xs: 7,
            sm: 1,
            md: 5,
            lg: 12,
          },
          p: 2,
          gap: {
            xs: 5,
            sm: 0,
            md: 0,
            lg: 0,
          },
          maxWidth: "100%",
          bgcolor: "#51545B",
          color: "#FED829",
          borderTopLeftRadius: "1%",
          borderTopRightRadius: "1%",
        }}
      >
        <Grid
          xs={12}
          md={4}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography align="center" variant="h6" gutterBottom>
            Communication
          </Typography>
          <Divider variant="middle" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mt: 2,
            }}
          >
            <a
              href="https://www.facebook.com/Football-Worker-112095084621046"
              style={{ color: "#FED829" }}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/football_worker/"
              style={{ color: "#FED829" }}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://twitter.com/worker_football"
              style={{ color: "#FED829" }}
            >
              <TwitterIcon />
            </a>
            <a
              href="https://www.youtube.com/channel/UCQGyNzDVNOS27CCuv3nIrAg"
              style={{ color: "#FED829" }}
            >
              <YouTubeIcon />
            </a>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <Typography align="center" variant="body2" gutterBottom>
              footballworker@hotmail.com
            </Typography>
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: 100,
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                maxHeight: "100%",
              }}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography align="center" variant="h6" gutterBottom>
            Info & Rules
          </Typography>
          <Divider variant="middle" />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              - Users who curse or are accused of blasphemy to players and teams
              will not be a WORKER after the first warnings and his posts
              relating to cause him banned will be deleted!
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Users are allowed to use bad language with each other.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Users who share illegal media will not be Worker if they will
              continue to commit an offense after the first warnings then their
              posts relating to cause him banned will be deleted!
            </Typography>
            <Typography variant="body2" gutterBottom>
              - We are working on a program that users can use to show their
              tactical animations and images. Please wait for it patiently!
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <Typography align="center" variant="body2">
              2021 / Created by 3E
            </Typography>
            <CopyrightIcon />
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={values.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{values.message}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <WebSiteLink link="/home" text="Go Home" />
          <WebSiteLink link="/signin" text="Sign In" />
        </DialogActions>
      </Dialog>
    </Box>
  );
}
