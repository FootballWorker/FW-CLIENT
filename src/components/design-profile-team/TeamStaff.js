import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import config from './../../config/config.js'

export default function TeamStaff(props) {
  return (
    <Stack
      spacing={3}
      sx={{
        borderRadius: "8px",
        boxShadow: 4,
        m: 0.4,
        pb: 2.5,
      }}
    >
      <Typography align="center" sx={{fontSize:14,fontWeight:500,color: '#51545B',p:2}} >There must be only one president and one manager.The other job fields has 5 FW at most! </Typography>
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
              <Link to={"/users/" + props.president._id}>
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
                color: "red",
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
        {props.vicepresidents ? (
          props.vicepresidents.map((item, i) => (
            <Box
              key={i}
              sx={{
                m: 1,
                display: "flex",
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
                <Link to={"/users/" + item._id}>{item.name}</Link>
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
                color: "red",
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
              <Link to={"/users/" + props.manager._id}>
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
                color: "red",
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
          {props.coach ? (
            props.coach.map((item, i) => (
              <Box
                key={i}
                sx={{
                  m: 1,
                  display: "flex",
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
                  <Link to={"/users/" + item._id}>{item.name}</Link>
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
                  color: "red",
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
          {props.scout ? (
            props.scout.map((item, i) => (
              <Box
                key={i}
                sx={{
                  m: 1,
                  display: "flex",
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
                  <Link to={"/users/" + item._id}>{item.name}</Link>
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
                  color: "red",
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
          {props.youth ? (
            props.youth.map((item, i) => (
              <Box
                key={i}
                sx={{
                  m: 1,
                  display: "flex",
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
                  <Link to={"/users/" + item._id}>{item.name}</Link>
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
                  color: "red",
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