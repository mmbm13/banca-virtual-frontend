import { defaultTheme } from "react-admin";
import { palette } from "./palette";

export const myTheme = {
  ...defaultTheme,
  sidebar: {
    width: 240,
    closedWidth: 55,
  },
  palette,
  components: {
    ...defaultTheme.components,
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          color: "white",
          borderLeft: "3px solid transparent",
          "&.RaMenuItemLink-active": {
            borderLeft: `10px solid ${palette.secondary.main}`,
            color: "white",
          },
          "& .RaMenuItemLink-icon": {
            color: "white",
          },
          "&:hover": {
            backgroundColor: "rgba(128, 151, 239, 0.15)",
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          "&.Mui-active": {
            "& .MuiStepConnector-line": {
              borderColor: palette.primary.main,
            },
          },
          "&.Mui-completed": {
            "& .MuiStepConnector-line": {
              borderColor: palette.primary.main,
            },
          },
        },
        line: {
          borderTopWidth: 5,
          borderRadius: 1,
        },
        alternativeLabel: {
          zIndex: -1,
          left: "calc(-50% + 11px)",
          right: "calc(50% + 11px)",
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          position: "relative",
          transform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          marginTop: "5px",
        },
        notchedOutline: {
          "& legend span": {
            display: "none",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          maxWidth: "230px",
        },
        paddingCheckbox: {
          display: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        selectLabel: {
          display: "none",
        },
        selectIcon: {
          display: "none",
        },
        select: {
          display: "none",
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: {
          "& .RaList-actions": {
            width: "100%",
            justifyContent: "flex-start",
            padding: "10px",
            backgroundColor: "white",
          },
        },
      },
    },
    RaEdit: {
      styleOverrides: {
        root: {
          "& .MuiToolbar-root": {
            width: "100%",
            justifyContent: "flex-start",
            padding: "10px 10px 0",
            backgroundColor: "white",
          },
        },
      },
    },
    RaCreate: {
      styleOverrides: {
        root: {
          "& .MuiToolbar-root": {
            width: "100%",
            justifyContent: "flex-start",
            padding: "10px 10px 0",
            backgroundColor: "white",
          },
        },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          "& .RaDatagrid-headerCell": {
            position: "relative",
          },
        },
      },
    },
    RaTopToolbar: {
      styleOverrides: {
        root: {
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'NovaScript';
          font-style: normal;
          font-display: swap;
          font-weight: normal;
          src: local('NovaScript'), url(@/static/fonts/NovaScript-Regular.ttf) format('ttf');
        }
      `,
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Libre Baskerville",
      "serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
      "Action Jackson",
    ].join(","),
  },
};
