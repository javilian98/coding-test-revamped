import { Button, styled } from "@mui/material";

const ButtonBase = styled("button")({
  textAlign: "center",
  color: "white",
  backgroundColor: "var(--color-primary)",
  padding: "10px 15px",
  marginLeft: "10px",
  borderRadius: "8px",
  transition: "all .4s",
  transform: "translateY(0)",
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(1.2)",
    boxShadow: "0 7px 15px rgba(0,0,0, 0.2)",
    transform: "translateY(5px)",
  },
});

function PrimaryButton({ children, handleClick, fullWidth, disabled }) {
  return (
    <Button
      variant="contained"
      sx={{
        width: fullWidth ? "100%" : "unset",
        display: "inline-flex",
        gap: "5px",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        backgroundColor: "var(--color-primary)",
        padding: "10px 15px",
        marginLeft: "10px",
        borderRadius: "8px",
        transition: "all .4s",
        transform: "translateY(0)",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "var(--color-primary)",
          filter: "brightness(1.2)",
          boxShadow: "0 7px 15px rgba(0,0,0, 0.2)",
          transform: "translateY(5px)",
        },
      }}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
