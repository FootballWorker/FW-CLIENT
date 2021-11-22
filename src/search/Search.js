import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import SwipeableViews from "react-swipeable-views";
import {  useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from './../auth/auth-helper'
import {listJobs} from './../job/api-jobs'
import {listCountries,searchForTeams} from './../team/api-team'
import {searchForPlayer} from './../player/api-player'
import {searchForUser} from './../user/api-user'
import {searchForMatch} from './../match/api-match'
import {listPositions} from './../position/api-position'
import SearchResults from "./SearchResults";
import SnackError from "../errorHandler/SnackError";




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            mb: 1,
            p: {
              xs: 1.2,
              sm: 2,
              md: 3,
            },
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Search(props) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0));
  const [countries, setCountries] = useState([])
  const [positions, setPositions] = useState([])
  const [jobs, setJobs] = useState([])
  const [values, setValues] = useState({
    result: [],
    search: '',
    country: '',
    position: '',
    job:'',
    searched: false
  })
  const [progress, setProgress] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  

  // Load Jobs Data
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listJobs(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setJobs(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };

  }, [])

  // Load Countries Data
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listCountries(signal).then((data)=> {
      if(data && data.error){
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      }else{
        setCountries(data)
      }
    })

    return () => {
      abortController.abort()
    }
  }, [])

  // Load Positions Data
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listPositions(signal).then((data)=>{
      if(data && data.error){
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      }else{
        setPositions(data)
      }
    })

    return () => {
      abortController.abort()
    }
  }, [])


  // Tab Controllers
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    setValues({search: '', country: '',position: '',job: ""})
    setFirstDay(new Date(y, m, 1));
    setLastDay(new Date(y, m + 1, 1));
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  // Date Range Handler

  const handleSearchFieldChange = (name) => (date) => {
    if (name === "firstDay") {
      setFirstDay(date);
    } else {
      setLastDay(date);
    }
  };


  // Search Functionality
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const searchTeam = () => {
    setProgress(true);
    searchForTeams({
      search: values.search || undefined,
      country: values.country,
    }).then((data) => {
      if (data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
        setProgress(false);
      } else {
        setValues({ ...values, result: data, searched: true });
        setProgress(false);
      }
    });
  }

  const searchPlayer = () => {
    setProgress(true);
    searchForPlayer({
      search: values.search || undefined,
      position: values.position,
    }).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
        setProgress(false);
      } else {
        setValues({ ...values, result: data, searched: true });
        setProgress(false);
      }
    });
  }

  const searchUser = () => {
    setProgress(true);
    searchForUser({ search: values.search || undefined , job: values.job }).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
        setProgress(false);
      } else {
        setValues({ ...values, result: data, searched: true });
        setProgress(false);
      }
    });
  }

  const searchMatch = () => {
    setProgress(true);
    searchForMatch({
      search: values.search,
      firstDay: firstDay,
      lastDay: lastDay,
    }).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
        setProgress(false);
      } else {
        setValues({ ...values, result: data, searched: true });
        setProgress(false);
      }
    });
  }


  return (
    <div >
      <AppBar position="static" color="primary" >
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: 9,
                    sm: 12,
                    md: 15,
                    lg: 18,
                  }
                }}
                color="secondary"
              >
                Search Team
              </Typography>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: 9,
                    sm: 12,
                    md: 15,
                    lg: 18,
                  },
                }}
                color="secondary"
              >
                Search Player
              </Typography>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: 9,
                    sm: 12,
                    md: 15,
                    lg: 18,
                  },
                }}
                color="secondary"
              >
                Search Match
              </Typography>
            }
            {...a11yProps(2)}
          />
          {
            auth.isAuthenticated() && (
              <Tab
                label={
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 9,
                        sm: 12,
                        md: 15,
                        lg: 18,
                      },
                    }}
                    color="secondary"
                  >
                    Search User
                  </Typography>
                }
                {...a11yProps(3)}
              />
              )
            }
          </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="select-country"
              select
              label="Country"
              value={values.country}
              onChange={handleChange("country")}
              size="small"
              sx={{
                mr: {
                  xs: 0.1,
                  sm: 0.5,
                  md: 1,
                },
                width: "190px",
              }}
            >
              {countries &&
                countries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
            <Divider orientation="vertical" flexItem />
            <TextField
              id="search"
              label="Search"
              type="search"
              value={values.search}
              onChange={handleChange("search")}
              size="small"
              sx={{
                mr: {
                  xs: 0.1,
                  sm: 0.5,
                  md: 1,
                },
                width: "140px",
              }}
            />
            <Button onClick={searchTeam}>
              <SearchIcon />
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="select-position"
              select
              label="Position"
              value={values.position}
              onChange={handleChange("position")}
              size="small"
              sx={{
                mr: {
                  xs: 0.3,
                  sm: 0.5,
                  md: 1,
                },
                width: "190px",
              }}
            >
              <MenuItem value="All">All</MenuItem>
              {positions &&
                positions.map((option, i) => (
                  <MenuItem key={i} value={option._id}>
                    {option.title}
                  </MenuItem>
                ))}
            </TextField>
            <Divider orientation="vertical" flexItem />
            <TextField
              id="search"
              label="Search"
              type="search"
              value={values.search}
              onChange={handleChange("search")}
              size="small"
              sx={{
                mr: {
                  xs: 0.9,
                  sm: 1.1,
                  md: 1.3,
                },
                width: "130px",
              }}
            />
            <IconButton onClick={searchPlayer}>
              <SearchIcon />
            </IconButton>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box
            sx={{
              display: "flex",
              flexDirection:'column',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                // flexDirection: {
                //   xs: "column",
                //   sm: "row",
                // },
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="FROM"
                  value={firstDay}
                  onChange={handleSearchFieldChange("firstDay")}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="TO"
                  value={lastDay}
                  onChange={handleSearchFieldChange("lastDay")}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{display:'flex',alignItems:'center'}} >
              <TextField
                id="search"
                label="Search Here..."
                type="search"
                value={values.search}
                onChange={handleChange("search")}
                size="small"
                sx={{ m: 1 }}
              />
              <IconButton onClick={searchMatch}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </TabPanel>
        {auth.isAuthenticated() && (
          <TabPanel value={value} index={3}
            dir={theme.direction}
            disabled={auth.isAuthenticated() ? false : true}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                id="job"
                select
                label="Job"
                value={values.job}
                onChange={handleChange("job")}
                size="small"
                sx={{
                  mr: {
                    xs: 0.3,
                    sm: 0.5,
                    md: 1,
                  },
                  width: "190px",
                }}
              >
                <MenuItem value="All">All</MenuItem>
                {jobs &&
                  jobs.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.title}
                    </MenuItem>
                  ))}
              </TextField>
              <Divider orientation="vertical" flexItem />
              <TextField
                id="search"
                label="Search"
                type="search"
                value={values.search}
                onChange={handleChange("search")}
                size="small"
                sx={{
                  mr: {
                    xs: 0.9,
                    sm: 1.1,
                    md: 1.3,
                  },
                  width: "120px",
                }}
              />
              <IconButton onClick={searchUser}>
                <SearchIcon />
              </IconButton>
            </Box>
          </TabPanel>
        )}
      </SwipeableViews>
      <Divider sx={{mb:2}} />
      <SearchResults
        results={values.result}
        searched={values.searched}
        posts={props.posts}
      />
      <SnackError open={isError.openSnack} text={isError.error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}


Search.propTypes = {
  posts : PropTypes.array
}