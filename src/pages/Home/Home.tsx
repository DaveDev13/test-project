import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./home.module.scss";

export const Home = () => {
    return (
        <main className={style.main}>
            <Typography mb={3} variant="h1">Главная страница</Typography>

            <Typography variant="body1">Для отображения пользователей <Link to="/users" className={style.link}>перейти к списку</Link></Typography>
        </main>
    );
};
