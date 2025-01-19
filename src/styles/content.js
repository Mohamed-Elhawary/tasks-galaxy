import styled from "@emotion/styled";

const StyledContent = styled("main")(({ theme }) => ({
    "& .MuiContainer-root": {
        "@media(max-width: 700px) ": { padding: 20 },
        "@media(min-width: 700px) ": { padding: 30 },
        backgroundColor: theme.palette.mode === "dark" ? theme.palette?.grey[800] : theme.palette?.grey[100],
        borderRadius: "15px",
        maxWidth: "96%",
        minHeight: "90vh",
    },
    flexGrow: 1,
    marginBottom: 50,
    marginTop: 50,
    transition: theme?.transitions?.create(
        ["width", "margin"],
        {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        },
    ),
    width: "100%",
}));

export default StyledContent;
