import { Box, Divider, List, Stack, Typography } from "@mui/material";
import * as React from "react";
import Link from "next/link";
import SideBarItem from "./SidebarModule";
import { drawerItems } from "@/utils/drawerData";
const Sidebar = () => {
  return (
    <Box>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        sx={{
          py: 1,
          mt: 3,
          ml: 1,
        }}
        component={Link}
        href="/"
      >
        <Typography variant="h6" component="h1">
          Admin Dashboard
        </Typography>
      </Stack>
      <Divider />
      <List sx={{ mt: 2 }}>
        {drawerItems().map((item, index) => (
          <SideBarItem key={index} item={item} index={0} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
