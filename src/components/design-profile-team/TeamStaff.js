import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HelpIcon from '@mui/icons-material/Help';

import config from './../../config/config.js'
import InfoBox from "../fades/InfoBox.js";

export default function TeamStaff(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth:1000,
        bgcolor: props.secondColor,
        color: props.firstColor,
        borderRadius: "8px",
        boxShadow: 1,
        ml:{xs:1,md:0},
        mr:{xs:1,md:0},
        mb:1,
        pb: 2.5,
      }}
    >
      <Button sx={{justifyContent:'center', width:30,textAlign:'center',alignItems:'flex-start'}} onClick={handleOpen}> <HelpIcon /> </Button>
      <InfoBox
          open={open}
          handleClose={handleClose}
          textOne="- There must be only one president and one manager.The other job fields has 5 FW at most!"
          textTwo="- President hire and fire vice presidents and manager."
          textThree="- Manager hire and fire coaches , scouts and youth staffs."
          textFour="- Applications appear only to the president and manager."
        />
      {/* Presdient */}
      <Box
        sx={{
          margin: "auto",
          mb: 1,
          width: "100%",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{
            mt: 2,
            fontSize: {
              xs: 15,
              sm: 24,
            },
            fontWeight: "bold",
          }}
        >
          President
        </Typography>
        <Divider
          variant="middle"
          
          sx={{
            color: props.firstColor,
            mr: {
              xs: 7,
              sm: 30,
              md: 40,
            },
            ml: {
              xs: 7,
              sm: 30,
              md: 40,
            },
          }}
        />
        {props.president ? (
          <Box
            sx={{
              m: 1,
              display: "flex",
              gap:1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              src={
                props.president._id && config.ServerURI + "/api/users/photo/" + props.president._id
              }
              sx={{
                width: {
                  xs: 18,
                  sm: 21,
                  md: 24,
                },
                height: {
                  xs: 18,
                  sm: 21,
                  md: 24,
                },
                mr: 0.4,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 21,
                },
                display: "inline",
              }}
            >
              <Link to={"/users/" + props.president._id} style={{color:props.firstColor}} >
                {props.president.name}
              </Link>
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              m: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 21,
                },
                color: props.firstColor,
                fontWeight: 500,
              }}
            >
              None President !
            </Typography>
          </Box>
        )}
      </Box>
      {/* Vice Presdient */}
      <Box
        sx={{
          margin: "auto",
          mb: 1,
          width: "100%",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{
            fontSize: {
              xs: 15,
              sm: 23,
            },
            fontWeight: "bold",
          }}
        >
          Vice Presidents
        </Typography>
        <Divider
          variant="middle"
          sx={{
            mr: {
              xs: 7,
              sm: 30,
              md: 40,
            },
            ml: {
              xs: 7,
              sm: 30,
              md: 40,
            },
          }}
        />
        {props.vicepresidents?.length >= 1 ? (
          props.vicepresidents.map((item, i) => (
            <Box
              key={i}
              sx={{
                m: 1,
                display: "flex",
                gap:1,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src={item._id && config.ServerURI + "/api/users/photo/" + item._id}
                sx={{
                  width: {
                    xs: 18,
                    sm: 21,
                    md: 24,
                  },
                  height: {
                    xs: 18,
                    sm: 21,
                    md: 24,
                  },
                  mr: 0.4,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              />
              <Typography
                sx={{
                  fontSize: {
                    xs: 13,
                    sm: 21,
                  },
                  display: "inline",
                }}
              >
                <Link to={"/users/" + item._id} style={{color:props.firstColor}}>{item.name}</Link>
              </Typography>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              m: 1,
              display: "flex",
              gap:1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 21,
                },
                color: props.firstColor,
                fontWeight: 500,
              }}
            >
              None Vice President !
            </Typography>
          </Box>
        )}
      </Box>
      {/* Manager */}
      <Box
        sx={{
          margin: "auto",
          mb: 1,
          width: "100%",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{
            fontSize: {
              xs: 15,
              sm: 23,
            },
            fontWeight: "bold",
          }}
        >
          Manager
        </Typography>
        <Divider
          variant="middle"
          sx={{
            mr: {
              xs: 7,
              sm: 30,
              md: 40,
            },
            ml: {
              xs: 7,
              sm: 30,
              md: 40,
            },
          }}
        />
        {props.manager ? (
          <Box
            sx={{
              m: 1,
              display: "flex",
              gap:1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              src={props.manager._id && config.ServerURI + "/api/users/photo/" + props.manager._id}
              sx={{
                width: {
                  xs: 18,
                  sm: 21,
                  md: 24,
                },
                height: {
                  xs: 18,
                  sm: 21,
                  md: 24,
                },
                mr: 0.4,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 21,
                },
                display: "inline",
              }}
            >
              <Link to={"/users/" + props.manager._id} style={{color:props.firstColor}}>
                {props.manager.name}
              </Link>
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              m: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 21,
                },
                color: props.firstColor,
                fontWeight: 500,
              }}
            >
              None Manager !
            </Typography>
          </Box>
        )}
      </Box>
      {/* Technical */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 1,
        }}
      >
        {/* Coach */}
        <Box
          sx={{
            margin: "auto",
            mt: 1,
            width: "100%",
          }}
        >
          <Typography
            align="center"
            gutterBottom
            sx={{
              fontSize: {
                xs: 15,
                sm: 23,
              },
              fontWeight: "bold",
            }}
          >
            Coach
          </Typography>
          <Divider variant="middle" />
          {props.coach?.length >= 1 ? (
            props.coach.map((item, i) => (
              <Box
                key={i}
                sx={{
                  m: 1,
                  display: "flex",
                  gap:1,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src={item._id && config.ServerURI + "/api/users/photo/" + item._id}
                  sx={{
                    width: {
                      xs: 18,
                      sm: 21,
                      md: 24,
                    },
                    height: {
                      xs: 18,
                      sm: 21,
                      md: 24,
                    },
                    mr: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: {
                      xs: 13,
                      sm: 21,
                    },
                    display: "inline",
                  }}
                >
                  <Link to={"/users/" + item._id} style={{color:props.firstColor}}>{item.name}</Link>
                </Typography>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                m: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 13,
                    sm: 21,
                  },
                  color: props.firstColor,
                  fontWeight: 500,
                }}
              >
                None Coach !
              </Typography>
            </Box>
          )}
        </Box>
        {/* Scout */}
        <Box
          sx={{
            margin: "auto",
            mt: 1,
            width: "100%",
          }}
        >
          <Typography
            align="center"
            gutterBottom
            sx={{
              fontSize: {
                xs: 15,
                sm: 23,
              },
              fontWeight: "bold",
            }}
          >
            Scout
          </Typography>
          <Divider variant="middle" />
          {props.scout?.length >= 1  ? (
            props.scout.map((item, i) => (
              <Box
                key={i}
                sx={{
                  m: 1,
                  display: "flex",
                  gap:1,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src={item._id && config.ServerURI + "/api/users/photo/" + item._id}
                  sx={{
                    width: {
                      xs: 18,
                      sm: 21,
                      md: 24,
                    },
                    height: {
                      xs: 18,
                      sm: 21,
                      md: 24,
                    },
                    mr: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: {
                      xs: 13,
                      sm: 21,
                    },
                    display: "inline",
                  }}
                >
                  <Link to={"/users/" + item._id} style={{color:props.firstColor}}>{item.name}</Link>
                </Typography>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                m: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 13,
                    sm: 21,
                  },
                  color: props.firstColor,
                  fontWeight: 500,
                }}
              >
                None Scout !
              </Typography>
            </Box>
          )}
        </Box>
        {/* Youth */}
        <Box
          sx={{
            margin: "auto",
            mt: 1,
            width: "100%",
          }}
        >
          <Typography
            align="center"
            gutterBottom
            sx={{
              fontSize: {
                xs: 15,
                sm: 23,
              },
              fontWeight: "bold",
            }}
          >
            Youth
          </Typography>
          <Divider variant="middle" />
          {props.youth?.length >= 1  ? (
            props.youth.map((item, i) => (
              <Box
                key={i}
                sx={{
                  m: 1,
                  display: "flex",
                  gap:1,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src={item._id && config.ServerURI + "/api/users/photo/" + item._id}
                  sx={{
                    width: {
                      xs: 18,
                      sm: 21,
                      md: 24,
                    },
                    height: {
                      xs: 18,
                      sm: 21,
                      md: 24,
                    },
                    mr: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: {
                      xs: 13,
                      sm: 21,
                    },
                    display: "inline",
                  }}
                >
                  <Link to={"/users/" + item._id} style={{color:props.firstColor}}>{item.name}</Link>
                </Typography>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                m: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 13,
                    sm: 21,
                  },
                  color: props.firstColor,
                  fontWeight: 500,
                }}
              >
                None Youth Worker !
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
}


TeamStaff.propTypes = {
  president: PropTypes.object,
  vicepresidents: PropTypes.array,
  manager: PropTypes.object,
  coach: PropTypes.array,
  scout: PropTypes.array,
  youth: PropTypes.array
}