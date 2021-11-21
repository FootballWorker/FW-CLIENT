import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  Divider,
  Paper,
  TextField,
  Typography,
  MenuItem
} from "@mui/material";
import { Redirect } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import {read,update} from './api-team'
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError.js";
import Loading from "../components/loading/Loading";


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

const EditTeam = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    country: "",
    stadium: "",
    firstColor:"",
    secondColor:"",
    stadiumCapacity: "",
    error: "",
    redirectToProfile: false,
    redirectToSignin: false,
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    // SETTING SIGNAL
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    // GETTING INFORMATION ABOUT PROFIL
    read({ teamId: match.params.teamId }, signal).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, redirectToSignin: true });
        } else {
          setValues(data);
          setLoading(false);
        }
      }
    );

    // CLEANING DATA
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.teamId]);

  const clickSubmit = () => {
    setProgress(true);
    // Form Submission with the file attached
    const team = {
      name: values.name.toUpperCase() || undefined,
      country: values.country || undefined,
      stadium: values.stadium || undefined,
      firstColor: values.firstColor || undefined,
      secondColor: values.secondColor || undefined,
      stadiumCapacity: values.stadiumCapacity || undefined,
    };
    // UPDATE PROFIL
    update(
      { teamId: match.params.teamId },
      { t: jwt.token },
      team
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, id: data._id, redirectToProfile: true });
        setProgress(false);
      }
    });
  };

  const clearForm = () => {
    setValues({ name: "", country: "", stadium: "", budget: "",firstColor:"",secondColor:"" });
  };

  // Targeting value
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // userData.set(name,value)
    setValues({ ...values, [name]: value });
  };

  // REDIRECT AFTER ENDING EDITING
  if (values.redirectToSignin) {
    return <Redirect to={"/signin"} />;
  }

  // REDIRECT AFTER ENDING EDITING
  if (values.redirectToProfile) {
    return <Redirect to={"/teams/" + values.id} />;
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
        EDIT TEAM
      </Typography>
      <Divider variant="middle" />
      <Card>
        <TextField
          id="name"
          label="Name"
          fullWidth
          required
          value={values.name}
          onChange={handleChange("name")}
          variant="standard"
          sx={{
            m: 2,
          }}
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
          id="stadium"
          label="Stadium"
          fullWidth
          required
          variant="standard"
          value={values.stadium}
          onChange={handleChange("stadium")}
          sx={{
            m: 2,
          }}
        />
        <TextField
          id="stadiumCapacity"
          label="Stadium Capacity"
          fullWidth
          required
          value={values.stadiumCapacity}
          onChange={handleChange("stadiumCapacity")}
          variant="standard"
          sx={{
            m: 2,
          }}
        />
        <TextField
          id="firstColor"
          label="First Color"
          fullWidth
          required
          value={values.firstColor}
          onChange={handleChange("firstColor")}
          variant="standard"
          sx={{
            m: 2,
          }}
        />
        <TextField
          id="secondColor"
          label="Second Color"
          fullWidth
          required
          value={values.secondColor}
          onChange={handleChange("secondColor")}
          variant="standard"
          sx={{
            m: 2,
          }}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default EditTeam;
