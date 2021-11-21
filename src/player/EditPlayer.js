import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import {
  Box,
  Card,
  CardActions,
  TextField,
  Typography,
  Paper,
  Divider,
  MenuItem,
  Button,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ImageIcon from "@mui/icons-material/Image";

import Loading from "../components/loading/Loading";
import auth from "./../auth/auth-helper.js";
import { read, update } from "./api-player";
import { list } from "./../team/api-team";
import { listPositions } from "./../position/api-position";
import FormError from "../errorHandler/FormError.js";
import SnackError from "../errorHandler/SnackError.js";
import config from './../config/config.js'
import defaultPic from './../assets/images/profile-pic.png'

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "South Korea",
  "North Korea",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "UAE",
  "UK",
  "United States Minor Outlying Islands",
  "USA",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
];

const EditPlayer = ({ match }) => {
  const [positions, setPositions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [values, setValues] = useState({
    name: "",
    birthday: new Date(),
    photo: "",
    country: "",
    position: "",
    team: "",
    salary: "",
    value: "",
    error: "",
    redirectToProfile: false,
    redirectToSignin: false,
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Load Player Data
  useEffect(() => {
    setLoading(true);
    // SETTING SIGNAL
    const abortController = new AbortController();
    const signal = abortController.signal;

    // GETTING INFORMATION ABOUT PROFIL
    read({ playerId: match.params.playerId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setValues(data);
        setLoading(false);
      }
    });

    // CLEANING DATA
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.playerId]);

  // Load Teams
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Positions
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listPositions(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setPositions(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Targeting value
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // userData.set(name,value)
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues({
      name: "",
      birthday: new Date(),
      country: "",
      positon: "",
      team: "",
      salary: "",
      value: "",
    });
  };

  // Update Function
  const clickSubmit = () => {
    setProgress(true);
    // Form Submission with the file attached
    let player = new FormData();
    values.name && player.append("name", values.name);
    values.country && player.append("country", values.country);
    values.birthday && player.append("birthday", values.birthday);
    values.photo && player.append("photo", values.photo);
    values.position && player.append("position", values.position);
    values.team && player.append("team", values.team);
    values.salary && player.append("salary", values.salary);
    values.value && player.append("value", values.value);

    // UPDATE PROFIL
    update({ playerId: match.params.playerId }, { t: jwt.token }, player).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
          setProgress(false);
        } else {
          setValues({ ...values, redirectToProfile: true });
          setProgress(false);
        }
      }
    );
  };

  const photoUrl = match.params.playerId
    ? `${config.ServerURI}/api/players/photo/${match.params.playerId}?${new Date().getTime()}`
    : defaultPic;

  // REDIRECT AFTER ENDING EDITING
  if (values.redirectToProfile) {
    return <Redirect to={"/players/" + match.params.playerId} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
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
        EDIT PLAYER
      </Typography>
      <Divider variant="middle" />
      <Card>
        <Box>
          <img
            src={photoUrl}
            alt="News Logo"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Box>
        <input
          accept="image/*"
          onChange={handleChange("photo")}
          style={{
            display: "none",
          }}
          id="photo"
          type="file"
        />
        <label htmlFor="photo">
          <Button component="span">
            Upload
            <ImageIcon />
          </Button>
        </label>
        <span>{values.photo ? values.photo.name : ""}</span>
        <TextField
          id="name"
          fullWidth
          required
          label="Name"
          variant="standard"
          sx={{
            m: 2,
          }}
          value={values.name}
          onChange={handleChange("name")}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            fullWidth
            required
            label="Birthday"
            value={values.birthday}
            onChange={(newValue) => {
              setValues({ ...values, birthday: newValue });
            }}
            sx={{
              m: 2,
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="country"
          required
          select
          fullWidth
          required
          label="Select Country"
          value={values.country}
          onChange={handleChange("country")}
          sx={{
            m: 2,
          }}
          helperText="Please select country"
          variant="standard"
        >
          {countries.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="position"
          select
          fullWidth
          required
          label="Select Position"
          value={values.positon}
          onChange={handleChange("position")}
          sx={{
            m: 2,
          }}
          helperText="Please select position"
          variant="standard"
        >
          {positions.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="team"
          select
          fullWidth
          required
          label="Select Team"
          value={values.team}
          onChange={handleChange("team")}
          sx={{
            m: 2,
          }}
          helperText="Change if player transfered to another team. "
          variant="standard"
        >
          {teams.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          required
          label="Salary"
          id="salary"
          variant="standard"
          sx={{
            m: 2,
          }}
          value={values.salary}
          onChange={handleChange("salary")}
        />
        <TextField
          fullWidth
          required
          label="Value"
          id="value"
          variant="standard"
          sx={{
            m: 2,
          }}
          value={values.value}
          onChange={handleChange("value")}
        />
        {values.error && <FormError text={values.error} />}
        <CardActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CancelButton onClick={clearForm} text="Clear" />
          <WebSiteButton onClick={clickSubmit} text="Submit" />
        </CardActions>
      </Card>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default EditPlayer;
