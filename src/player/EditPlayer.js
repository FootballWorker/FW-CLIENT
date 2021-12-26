import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import Loading from "../components/loading/Loading";
import auth from "./../auth/auth-helper.js";
import { read, update } from "./api-player";
import { list } from "./../team/api-team";
import { listPositions } from "./../position/api-position";
import FormError from "../errorHandler/FormError.js";
import SnackError from "../errorHandler/SnackError.js";
import { config } from "./../config/config.js";
import defaultPic from "./../assets/images/profile-pic.png";

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
          error: "500 Server Error. Player data could not be uploaded.",
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
          error: "500 Server Error. Teams could not be uploaded.",
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
          error: "500 Server Error. Positions could not be uploaded.",
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
    if (values.team === "") {
      return setValues({ ...values, error: "You have to select Team" });
    }
    if (values.position === "") {
      return setValues({ ...values, error: "You have to select Position" });
    }
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
          setValues({
            ...values,
            error: "500 Server Error. Player could not be edited.",
          });
          setProgress(false);
        } else {
          setValues({ ...values, redirectToProfile: true });
          setProgress(false);
        }
      }
    );
  };

  const photoUrl = match.params.playerId
    ? `${config.ServerURI}/players/photo/${
        match.params.playerId
      }?${new Date().getTime()}`
    : defaultPic;

  // REDIRECT AFTER ENDING EDITING
  if (values.redirectToProfile) {
    return <Redirect to={"/players/" + match.params.playerId} />;
  }

  if (loading) {
    return <Loading text="Player Data Loading..." />;
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
      <Card sx={{m:2}} >
        <Typography sx={{ m: 2 }} align="center">
          Not allowed to add profile photos for now!
        </Typography>
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
