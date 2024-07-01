import { Box, Typography } from "@mui/material";
const HeaderSection = ({ title}) => {
  return (
    <Box textAlign="center">
      <Typography
        variant="h6"
        fontWeight="bold"
        textTransform="uppercase"
        color="primary"
        fontStyle="italic"
        gutterBottom
      >
        {title}
      </Typography>
      <Box
        sx={{
          bgcolor: "primary.main",
          height: "4px",
          width: "96px",
          mx: "auto",
          mt: 1,
        }}
      ></Box>
    </Box>
  );
};

export default HeaderSection;