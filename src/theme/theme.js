import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
                font-display: swap;
                font-family: 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue';
                font-style: normal;
                font-weight: 400;
            }
            `,
        },
    },
    palette: {
        action: {
            activatedOpacity: "12%",
            disabledBackgroundOpacity: "24%",
            disabledOpacity: "48%",
            focusOpacity: "12%",
            hoverOpacity: "8%",
            selectedOpacity: "8%",
        },
        background: { default: "#f0f2f5" },
        chip: {
            background: {
                active: "#D7E9FF",
                completed: "#54D62C29",
                failed: "#FFE2E1",
                stopped: "#FFF7CD",
            },
            color: {
                active: "#0381B7",
                completed: "#438256",
                failed: "#B72136",
                stopped: "#7A4F01",
            },
        },
        error: { main: "#eb2f06" },
        grey: {
            100: "#FFF",
            200: "#F4F6F8",
            300: "#DFE3E8",
            400: "#C4CDD5",
            500: "#919EAB",
            600: "#637381",
            700: "#454F5B",
            800: "#212B36",
            900: "#161C24",
            901: "rgba(0, 0, 0, 0.54)",
            902: "rgba(0, 0, 0, 0.1)",
            903: "linear-gradient(180deg, rgba(32, 30, 31, 0.63) 0%, rgba(41, 45, 50, 0) 76.56%)",
            904: "#E0E0E0",
            905: "#000",
        },
        mode: "light",
        pending: { main: "#FAE316" },
        primary: { main: "#41b7ff" },
        progressBar: {
            background: {
                active: "#D7E9FF",
                completed: "#C8FACD",
                failed: "#FFE7D9",
            },
            color: {
                active: "#57c9fd",
                completed: "#3fe5be",
                failed: "#FF4842",
            },
        },
        secondary: { main: "#61dfef" },
        snackbar: {
            background: {
                error: "#FFE7D9",
                info: "#FFF7CD",
                success: "#E9FCD4",
            },
            color: {
                error: "#7A0C2E",
                info: "#7A4F01",
                success: "#08660D",
            },
        },
        success: { main: "#54D62C" },
        warning: { main: "#FFC107" },
    },
});

export const darkTheme = createTheme({
    components: {
        MuiBox: {
            styleOverrides: {
                root: {
                    backgroundColor: "#212B36",
                    color: "#E0E0E0",
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
          @font-face {
              font-display: swap;
              font-family: 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue';
              font-style: normal;
              font-weight: 400;
          }
        `,
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#E0E0E0",
                },
            },
        },
    },
    palette: {
        action: {
            activatedOpacity: "12%",
            disabledBackgroundOpacity: "24%",
            disabledOpacity: "48%",
            focusOpacity: "12%",
            hoverOpacity: "8%",
            selectedOpacity: "8%",
        },
        background: {
            default: "#161C24",
        },
        chip: {
            background: {
                active: "#D7E9FF",
                completed: "#54D62C29",
                failed: "#FFE2E1",
                stopped: "#FFF7CD",
            },
            color: {
                active: "#0381B7",
                completed: "#438256",
                failed: "#B72136",
                stopped: "#7A4F01",
            },
        },
        error: { main: "#eb2f06" },
        grey: {
            100: "#FFF",
            200: "#F4F6F8",
            300: "#DFE3E8",
            400: "#C4CDD5",
            500: "#919EAB",
            600: "#637381",
            700: "#454F5B",
            800: "#212B36",
            900: "#161C24",
            901: "rgba(255, 255, 255, 0.54)",
            902: "rgba(255, 255, 255, 0.1)",
            903: "linear-gradient(180deg, rgba(32, 30, 31, 0.63) 0%, rgba(41, 45, 50, 0) 76.56%)",
            904: "#E0E0E0",
            905: "#000",
        },
        mode: "dark",
        pending: { main: "#FAE316" },
        primary: { main: "#41b7ff" },
        progressBar: {
            background: {
                active: "#D7E9FF",
                completed: "#C8FACD",
                failed: "#FFE7D9",
            },
            color: {
                active: "#57c9fd",
                completed: "#3fe5be",
                failed: "#FF4842",
            },
        },
        secondary: { main: "#61dfef" },
        snackbar: {
            background: {
                error: "#FFE7D9",
                info: "#FFF7CD",
                success: "#E9FCD4",
            },
            color: {
                error: "#7A0C2E",
                info: "#7A4F01",
                success: "#08660D",
            },
        },
        success: { main: "#54D62C" },
        warning: { main: "#FFC107" },
    },
});
