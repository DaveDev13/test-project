import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Toolbar, Divider, List, Box, ListItemButton, ListItemIcon, ListItemText, Typography, Drawer, AppBar, IconButton } from "@mui/material";
import { ReactComponent as BurgerIcon } from "../../assets/images/icons/burger.svg";
import { ReactComponent as PeopleIcon } from "../../assets/images/icons/peoples.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/icons/home.svg";
import useBreakpoint from "../../helpers/useBreakpoints";
import { observer } from "mobx-react";

const drawerWidth = 240;

const LandingLayout = observer(() => {
    const breakpoint = useBreakpoint();
    const [show, setShow] = useState(["xs", "sm"].includes(breakpoint));
    const [open, setOpen] = useState(!["xs", "sm"].includes(breakpoint));

    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };

    useEffect(() => {
        setShow(["xs", "sm"].includes(breakpoint));
        setOpen(!["xs", "sm"].includes(breakpoint));
    }, [breakpoint]);

    return (
        <Box sx={{ display: "flex" }}>
            {show && (
                <AppBar
                    position="fixed"
                    sx={{
                        paddingLeft: open ? `${drawerWidth}px` : 0,
                    }}
                >
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer} edge="start">
                            <BurgerIcon
                                style={{
                                    width: "24px",
                                    height: "24px",
                                }}
                            />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}
            {/* Левое меню */}
            <Drawer
                open={open}
                variant={open ? "permanent" : "persistent"}
                sx={{
                    width: open ? `${drawerWidth}px` : 0,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? `${drawerWidth}px` : 0,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="h2">
                        MUI project
                    </Typography>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <NavLink to="/">
                        {({ isActive }) => (
                            <ListItemButton selected={isActive} color="primary">
                                <ListItemIcon>
                                    <HomeIcon
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Главная" />
                            </ListItemButton>
                        )}
                    </NavLink>
                    <NavLink to="/users">
                        {({ isActive }) => (
                            <ListItemButton selected={isActive} color="primary">
                                <ListItemIcon>
                                    <PeopleIcon
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                        }}
                                    />
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
                    flexGrow: 1,
                    minHeight: "var(--vh)",
                    padding: 3,
                    backgroundColor: "#f3f6f9"
                }}
            >
                {show && <Toolbar />}

                <Outlet />
            </Box>
        </Box>
    );
});

export default LandingLayout;
