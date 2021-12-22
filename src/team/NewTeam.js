import React,{useState} from 'react'
import { Redirect } from 'react-router-dom'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";

import auth from '../auth/auth-helper.js'
import {create} from './api-team'
import WebSiteLink from '../components/design-button/WebSiteLink.js';
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from '../errorHandler/FormError.js';


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

const NewTeam = () => {
  const [values, setValues] = useState({
    name: "",
    country: "",
    stadium: "",
    firstColor: "",
    secondColor: "",
    redirectToSignin: false,
    error: "",
    open: false,
  });
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated()


  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? 
        event.target.files[0] : 
        event.target.value
    setValues({...values,[name]: value})
  }

  const clearForm = () => {
    setValues({ name: "",country:"",stadium: "",firstColor:"",secondColor:"" });
  };

  const clickSubmit = async () => {
    setProgress(true);
    const team = {
      name: values.name.toUpperCase() || undefined,
      country: values.country || undefined,
      stadium: values.stadium || undefined,
      firstColor: values.firstColor || undefined,
      secondColor: values.secondColor || undefined,
    };

    create(
      {t: jwt.token},
      team
    ).then(data => {
      if(data && data.error){
        setValues({...values,error: "500 Server Error. Team could not be created."})
      }else{
        setValues({
          ...values,open: true
        })
        setProgress(false);
      }
    })
  }

  if(values.redirectToSignin){
    return <Redirect to="/signin" />
  }

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
          NEW TEAM
        </Typography>
        <Divider variant="middle" />
        <Card>
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
            required
            fullWidth
            value={values.stadium}
            onChange={handleChange("stadium")}
            variant="standard"
            sx={{
              m: 2,
            }}
          />
          <TextField
            id="firstColor"
            label="First Color"
            required
            fullWidth
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
            required
            fullWidth
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
      </Paper>
      <Dialog open={values.open}>
        <DialogTitle>New Team</DialogTitle>
        <DialogContent>
          <DialogContentText>New team successfully created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <WebSiteLink link="/" text="Go Home" />
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



export default NewTeam