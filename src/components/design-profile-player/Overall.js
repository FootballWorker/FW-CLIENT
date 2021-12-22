import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import {
  useMediaQuery,
  useTheme,
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
import EditIcon from "@mui/icons-material/Edit";

import auth from "./../../auth/auth-helper";
import { create } from "../../attribute/api-attribute";
import DeleteAttribute from "./../../attribute/DeleteAttribute";
import { Box } from "@mui/system";
import FormError from "../../errorHandler/FormError";

const categories = ["Technical", "Mental", "Physical"];

export default function Overall(props) {
  const history = useHistory()
  const themes = useTheme()
  const matches = useMediaQuery(themes.breakpoints.up('md'))
  const [values, setValues] = useState({
    category: "",
    point: "",
    redirect: false,
  });
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
    editError: "",
  });
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    if (
      !values.point ||
      0 > parseInt(values.point) ||
      parseInt(values.point) > 100
    ) {
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
    let id = props.player?._id;
    setOpen(true);
    create({ playerId: id }, { t: jwt.token }, attribute).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error! Attribute cannot be created.",
        });
        setOpen(false);
      } else {
        setOpen(false);
        window.location.reload(false);
      }
    });
  };

  if (values.redirect) {
    return <Redirect to={"/teams/" + props.player.team._id} />;
  }

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };


  const attrbts = () => {
    props.loadAttributes();
    handleClickOpen();
  };

  return (
    <Paper elevation={12} sx={{ mt:0.4, p: {xs:1,sm:1,md:2,lg:4},bgcolor:'darkslateblue' }}>
      <Typography align="center" variant="h4" color="gainsboro" sx={{fontFamily: "'Merriweather', serif"}} >
        {props.player.name}
      </Typography>
      <Grid container spacing={1} >
        <Grid xs={12} md={8}>
          {props.average && (
            <div
              style={{
                width: "100%",
                maxHeight: "100%",
                margin: "auto",
              }}
            >
              <svg viewBox={matches ? "20 40 400 300" : "0 30 360 320"}>
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
                          fontSize: "15px",
                          fill: "#0f0f0f",
                        },
                        {
                          fontSize: "15px",
                          fill: "#013157",
                        },
                      ]}
                      text={({ datum }) => datum && `${datum.x}\n ${datum.y}`}
                    />
                  }
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: "10px", fill: "#f2f2f2" }}
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
            mt: { xs: 3, sm: 3, md: 5, lg: 15 },
            justifyContent: "center",
            p: 3,
            
          }}
        >
          <Box>
            <List sx={{ margin: "auto", maxWidth: 900 }}>
              {props.assessments &&
                props.assessments.map((item, i) => (
                  <ListItemButton
                    key={i}
                    sx={{ bgcolor: "darkseagreen", mb: 1,borderRadius:'8px' }}
                  >
                    <ListItemText
                      primary={item.point}
                      secondary={item.category}
                    />
                    <ListItemSecondaryAction
                      sx={{
                        display: "flex",
                        flexDirection: { md: "column", lg: "row" },
                        gap: 1,
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      
                      <IconButton onClick={()=>history.push("/attributes/edit/"+item._id)}>
                          <EditIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                ))}
            </List>
          </Box>

          {props.user?.job &&
          props.user?.department?.name === "TECHNIQUE" &&
          props.user?.team?._id === props.player?.team?._id ? (
            <Accordion sx={{bgcolor: "darkseagreen",borderRadius:'5px'}} >
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
                    {isError.error && <FormError text={isError.error} />}
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={clickSubmit}
                      variant="contained"
                      color="primary"
                      sx={{
                        p: 1,
                      }}
                    >
                      Save !
                    </Button>
                  </CardActions>
                </Card>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography
              align="center"
              sx={{
                mt: { xs: 3, sm: 3, md: 5, lg: 10 },
                justifyContent: "center",
                p: 3,
              }}
              variant="h6"
              color="silver"
            >
              Assessment is only for the technical staff of the team of this
              player!
            </Typography>
          )}

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          {props.user && props.user.role === "admin" && (
            <Box
              sx={{
                margin: "auto",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Button color="secondary" variant="contained" onClick={attrbts}> Attributes </Button>
              <Dialog open={dialogOpen} onClose={handleClose} fullWidth>
                <DialogTitle align="center"> Whole Attributes </DialogTitle>
                <DialogContent>
                  <List sx={{ margin: "auto", maxWidth: 600 }}>
                    {props.attributes &&
                      props.attributes.map((item, i) => (
                        <ListItemButton
                          key={i}
                          sx={{ bgcolor: "blanchedalmond", mb: 1 }}
                        >
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
                </DialogContent>
              </Dialog>
            </Box>
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
  assessments: PropTypes.array,
  removeAttribute: PropTypes.func,
  loadAttributes: PropTypes.func,
};
