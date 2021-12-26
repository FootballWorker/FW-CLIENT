import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";

import auth from "./../auth/auth-helper.js";
import { read, update } from "./api-user.js";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError.js";
import {config} from "./../config/config";
import Loading from "../components/loading/Loading.js";

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

const EditProfile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    photo: "",
    country: "",
    facebook: "",
    twitter: "",
    instagram: "",
    blog: "",
    error: "",
    redirectToProfile: false,
    redirectToSignup: false,
    id: "",
  });
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(false)
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    setLoading(true);
    // SETTING SIGNAL
    const abortController = new AbortController();
    const signal = abortController.signal;

    // GETTING INFORMATION ABOUT PROFIL
    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. User could not be uploaded."
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
  }, [match.params.userId]);

  // Clear Form
  const clearForm = () => {
    setValues({
      name: "",
      facebook: "",
      country: "",
      twitter: "",
      instagram: "",
      blog: "",
    });
  };

  // Targeting value
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // userData.set(name,value)
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    if (!values.name || !values.country) {
      return setValues({
        ...values,
        error: "Fill the name and country fields!",
      });
    }
    // Form Submission with the file attached
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.country && userData.append("country", values.country);
    values.photo && userData.append("photo", values.photo);
    values.facebook && userData.append("facebook", values.facebook);
    values.twitter && userData.append("twitter", values.twitter);
    values.instagram && userData.append("instagram", values.instagram);
    values.blog && userData.append("blog", values.blog);

    // UPDATE PROFIL
    update({ userId: match.params.userId }, { t: jwt.token }, userData).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: "500 Server Error. User could not be edited." });
          setProgress(false);
        } else {
          setValues({ ...values, redirectToProfile: true });
          setProgress(false);
        }
      }
    );
  };

  const photoUrl =
    match.params.userId &&
    `${config.ServerURI}/users/photo/${
      match.params.userId
    }?${new Date().getTime()}`;

  // REDIRECT AFTER ENDING EDITING
  if (values.redirectToProfile) {
    return <Redirect to={"/users/" + match.params.userId} />;
  }

  // Redirect to Signup Page
  if (match.params.userId !== jwt.user._id) {
    return <Redirect to="/" />;
  }

  if(loading){
    return <Loading text="User Data Loading..." />
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
        EDIT PROFILE
      </Typography>
      <Divider variant="middle" />
      <Card sx={{ mt: 3 }}>
        <Box>
          <img
            src={photoUrl}
            alt="Profile"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Box>
        <br />
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
          <Button component="span" variant="contained" sx={{ mb: 2 }}>
            Upload
            <ImageIcon />
          </Button>
        </label>
        <span>{values.photo ? values.photo.name : ""}</span>
        <Typography align="center">
          Changing Photo would take some time.
        </Typography>
        <br />
        <TextField
          id="name"
          fullWidth
          variant="standard"
          label="Name"
          sx={{
            m: 2,
          }}
          value={values.name}
          onChange={handleChange("name")}
        />
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
          id="facebook"
          fullWidth
          variant="standard"
          label="Facebook Link"
          sx={{
            m: 2,
          }}
          value={values.facebook}
          onChange={handleChange("facebook")}
        />
        <TextField
          id="twitter"
          fullWidth
          variant="standard"
          label="Twitter Link"
          sx={{
            m: 2,
          }}
          value={values.twitter}
          onChange={handleChange("twitter")}
        />
        <TextField
          id="instagram"
          fullWidth
          variant="standard"
          label="Instagram Link"
          sx={{
            m: 2,
          }}
          value={values.instagram}
          onChange={handleChange("instagram")}
        />
        <TextField
          id="blog"
          fullWidth
          variant="standard"
          label="Blog Link"
          sx={{
            m: 2,
          }}
          value={values.blog}
          onChange={handleChange("blog")}
        />
        {values.error && <FormError text={values.error} />}
        <CardActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CancelButton onClick={clearForm} text="Clear" />
          {values.name !== "" && values.name.length > 3 && (
            <WebSiteButton onClick={clickSubmit} text="Submit" />
          )}
        </CardActions>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default EditProfile;
