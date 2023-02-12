import { Typography, Link as LinkMui, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <Box component="main">
            <Typography mb={3} variant="h1">Главная страница</Typography>

            <Typography>Для отображения пользователей <LinkMui component={Link} to="/users">перейти к списку</LinkMui></Typography>
        </Box>
    );
};
