import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Drawer, Typography, Avatar, Stack, Badge, Small } from "@mui/material";
// hooks
// components
import Logo from "../../components/general/Logo";
import Scrollbar from "../../components/general/Scrollbar";
import NavSection from "../../components/general/NavSection";
//
import sidebarConfig from "./SidebarConfig";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "60%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""'
        }
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0
        }
    }
}));

const AccountStyle = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
    const { pathname } = useLocation();

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                "& .simplebar-content": { height: 1, display: "flex", flexDirection: "column" }
            }}
        >
            <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
                <Logo />
            </Box>

            <Box sx={{ mb: 5, mx: 2.5 }}>
                <AccountStyle>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                    >
                        <Avatar
                            alt="Ilan Teitelbaum"
                           // src="/static/avatar.jfif"
                            sx={{ width: 60, height: 60 }}
                        />
                    </StyledBadge>
                    <Box sx={{ mr: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: "#ffd" }}>
                             גוקו                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            מנהל האתר
                        </Typography>
                    </Box>
                </AccountStyle>
            </Box>

            <NavSection navConfig={sidebarConfig} />

            <Box sx={{ flexGrow: 1 }} />

            {/* <Box sx={{ px: 2.5, pb: 3, mt: 10,  }}>
        <Stack
          alignItems="center"
          spacing={2}
          justifyContent="space-evenly"
          direction='row'
          sx={{ pt: 5, borderRadius: 2, backgroundColor: 'background.paper' }}
        >
          <Box
            component="img"
            src="https://smps.co.il/wp-content/uploads/2021/08/1542876630call-center-services.png"
            sx={{ width: 100 }}
          />
        </Stack>
      </Box> */}
        </Scrollbar>
    );

    return (
        <RootStyle>
            <Drawer
                open
                variant="persistent"
                PaperProps={{
                    sx: {
                        width: DRAWER_WIDTH,
                        bgcolor: "#000",
                        borderRightStyle: "dashed"
                    }
                }}
                anchor="right"
            >
                {renderContent}
            </Drawer>
        </RootStyle>
    );
}
