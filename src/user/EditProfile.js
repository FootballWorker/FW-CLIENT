import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Box,
  Divider,
  Card,
  CardActions,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import ImageIcon from "@mui/icons-material/Image";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import { read, update } from "./api-user.js";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError.js";
import config from "./../config/config";

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
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    setProgress(true);
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
        console.log(data.error);
      } else {
        setValues(data);
        setProgress(false);
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
          setValues({ ...values, error: data.error });
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
    `${config.ServerURI}/api/users/photo/${
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
          <Button component="span" variant="contained" sx={{mb:2}} >
            Upload
            <ImageIcon />
          </Button>
        </label>
        <span>{values.photo ? values.photo.name : ""}</span>
        <Typography align="center" >Changing Photo would take some time.</Typography>
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
