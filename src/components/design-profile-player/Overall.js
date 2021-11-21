import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory";
import {
  Grid,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMore from "@mui/icons-material/ExpandMore";

import auth from "./../../auth/auth-helper";
import { create } from "../../attribute/api-attribute";
import DeleteAttribute from "./../../attribute/DeleteAttribute";
import SnackError from "../../errorHandler/SnackError";

const categories = ["Technical", "Mental", "Physical"];

export default function Overall(props) {
  const [values, setValues] = useState({
    category: "",
    point: "",
    redirect: false,
  });
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    if (0 > values.point || values.point > 100) {
      return setIsError({
        ...isError,
        openSnack: true,
        error: "Your points are not in the valid range!",
      });
    }
    if (values.category === "") {
      return setIsError({
        ...isError,
        openSnack: true,
        error: "You must select a category!",
      });
    }
    const attribute = {
      category: values.category || undefined,
      point: values.point || undefined,
    };
    let id = props.player && props.player._id;
    setOpen(true);
    create({ playerId: id }, { t: jwt.token }, attribute).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
        setOpen(false);
      } else {
        setValues({ ...values, redirect: true });
        setOpen(false);
      }
    });
  };

  if (values.redirect) {
    return <Redirect to={"/teams/" + props.player.team._id} />;
  }

  return (
    <Paper elevation={12} sx={{ p: 5 }}>
      <Typography align="center" variant="h4" sx={{fontFamily: "'Merriweather', serif"}} >
        
        {props.player.name}
      </Typography>
      <Grid container spacing={1}>
        <Grid xs={12} md={8}>
          {props.average && (
            <div
              style={{
                width: "100%",
                maxHeight: "100%",
                margin: "auto",
                paddingBottom: "10px",
              }}
            >
              <svg viewBox="0 0 360 300">
                <VictoryPie
                  standalone={false}
                  data={props.average && props.average.avgAtt}
                  innerRadius={45}
                  theme={VictoryTheme.material}
                  labelRadius={({ innerRadius }) => innerRadius + 9}
                  labelComponent={
                    <VictoryLabel
                      angle={0}
                      style={[
                        {
                          fontSize: "1rem",
                          fill: "#0f0f0f",
                        },
                        {
                          fontSize: "1rem",
                          fill: "#013157",
                        },
                      ]}
                      text={({ datum }) => datum && `${datum.x}\n ${datum.y}`}
                    />
                  }
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: 12, fill: "#8b8b8b" }}
                  x={175}
                  y={170}
                  text={`Attributes \nper Category`}
                />
              </svg>
            </div>
          )}
        </Grid>
        <Grid
          xs={12}
          md={4}
          sx={{
            mt: { xs: 3, sm: 3, md: 18, lg: 25 },
            justifyContent: "center",
            p: 3,
          }}
        >
          {props.user?.job &&
          props.user?.department?.name === "TECHNIQUE" &&
          props.user?.team?._id === props.player?.team?._id ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Assessment</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Card
                  sx={{
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    <TextField
                      required
                      id="category"
                      select
                      label="Select"
                      value={values.category}
                      onChange={handleChange("category")}
                      helperText="Please select category"
                      variant="standard"
                      sx={{ m: 1 }}
                    >
                      {categories &&
                        categories.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                      required
                      id="point"
                      label="Point"
                      type="number"
                      min="0"
                      max="100"
                      value={values.point}
                      onChange={handleChange("point")}
                      helperText="Your assessment must be between 0 and 100"
                      variant="standard"
                      sx={{
                        m: 1,
                      }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={clickSubmit}
                      contained
                      sx={{
                        p: 1,
                        bgcolor: "DarkSlateGray  ",
                        color: "Gainsboro ",
                        ":hover": {
                          bgcolor: "Gainsboro",
                          color: "DarkSlateGray ",
                        },
                      }}
                    >
                      Save!
                    </Button>
                  </CardActions>
                </Card>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography
              align="center"
              sx={{
                mt: { xs: 3, sm: 3, md: 10, lg: 20 },
                justifyContent: "center",
                p: 3,
              }}
              variant="h6"
            >
              
              Assessment is only for the technical staff of the team of this
              player!
            </Typography>
          )}
          <SnackError open={isError.openSnack} text={isError.error} />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {props.user && props.user.role === "admin" && (
            <List container>
              {props.attributes &&
                props.attributes.map((item, i) => (
                  <ListItemButton key={i}>
                    <ListItemText
                      primary={item.point}
                      secondary={item.recordedBy && item.recordedBy.name}
                    />
                    <ListItemSecondaryAction>
                      <DeleteAttribute
                        attribute={item}
                        onRemove={props.removeAttribute}
                      />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                ))}
            </List>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

Overall.propTypes = {
  player: PropTypes.object,
  user: PropTypes.object,
  attributes: PropTypes.array,
  average: PropTypes.array,
  removeAttribute: PropTypes.func,
};
