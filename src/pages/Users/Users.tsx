import { FC, Fragment, useEffect, useState } from "react";
import { Avatar, Box, Divider, List, ListItemButton, ListItemAvatar, ListItemText, Typography, Button } from "@mui/material";
import style from "./users.module.scss";
import { Link } from "react-router-dom";
import  { UserStructure } from "../../data/users/UsersApi";
import { observer } from "mobx-react";
import userStore from "../../stores/UserStore";

interface IUser {
    data: UserStructure;
}

const UserCard: FC<IUser> = ({ data }) => {
    return (
        <ListItemButton>
            <ListItemAvatar>
                <Avatar alt={data.name} />
            </ListItemAvatar>
            <ListItemText primary={data.name} />
            <Link to={`/users/${data.id}`} className={style.card__link}></Link>
        </ListItemButton>
    );
};

export const Users: FC = observer(() => {
    const {usersList, activeUsers, changeUserStatus, getUsersList, pagination, isLoading} = userStore;

    useEffect(() => {
        if (!usersList.length) {
            getUsersList(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeStatus = () => {
        changeUserStatus();
    };

    const handleLoadUsers = () => {
        getUsersList(pagination.currentPage + 1);
    };

    return (
        <Box>
            {usersList?.length ? (
                <>
                    <Typography mb={2} variant="h1">
                        Список {activeUsers ? "активных" : "всех"} пользователей
                    </Typography>

                    <Button variant="outlined" onClick={handleChangeStatus}>
                        {!activeUsers ? "Показать только активных" : "Показать всех"}
                    </Button>

                    <List sx={{ width: "100%" }}>
                        {usersList.map((data) => {
                            if (activeUsers && data.status === "inactive") {
                                return <Fragment key={data.id}></Fragment>;
                            }

                            return (
                                <Fragment key={data.id}>
                                    <UserCard data={data} />
                                    <Divider component="li" />
                                </Fragment>
                            );
                        })}
                    </List>

                    <Button sx={{ marginTop: 2 }} variant="outlined" onClick={handleLoadUsers}>
                        {isLoading ? "Загрузка..." : "Загрузить ещё"}
                    </Button>
                </>
            ) : (
                <Typography variant="h4">Загрузка...</Typography>
            )}
        </Box>
    );
});
