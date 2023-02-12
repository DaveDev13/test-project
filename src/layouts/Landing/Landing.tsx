import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import style from "./Landing.module.scss";
import { Toolbar, IconButton, Divider, List, Box, Container, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactComponent as PeopleIcon } from "../../assets/images/icons/peoples.svg";
import { ReactComponent as BurgerIcon } from "../../assets/images/icons/burger.svg";
import { ReactComponent as ArrowIcon } from "../../assets/images/icons/arrow.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/icons/home.svg";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const Landing: React.FC = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* Хейдер меню */}
            {/* <AppBar position="static" open={open}>
                <Toolbar variant="dense">
                    <IconButton
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                        color="primary"
                    >
                        <BurgerIcon width="24" height="24" />
                    </IconButton>
                </Toolbar>
            </AppBar> */}
            {/* Левое меню */}
            <Drawer variant="permanent" open={open}>
                <Toolbar className={style.toolbar}>
                    <IconButton aria-label="hide drawer" onClick={toggleDrawer} color="primary">
                        <ArrowIcon width="24" height="24" />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <NavLink to="/">
                        {({ isActive }) => (
                            <ListItemButton selected={isActive} color="primary">
                                <ListItemIcon>
                                    <HomeIcon width="24" height="24" />
                                </ListItemIcon>
                                <ListItemText primary="Главная" />
                            </ListItemButton>
                        )}
                    </NavLink>
                    <NavLink to="/users">
                        {({ isActive }) => (
                            <ListItemButton selected={isActive} color="primary">
                                <ListItemIcon>
                                    <PeopleIcon width="24" height="24" />
                                </ListItemIcon>
                                <ListItemText primary="Пользователи" />
                            </ListItemButton>
                        )}
                    </NavLink>
                </List>
            </Drawer>

            {/* Основной контенйер */}
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />

                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Outlet />
                </Container>
            </Box>
        </>
    );
};

export default Landing;
