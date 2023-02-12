import { Box, Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import style from "./user.module.scss";
import { ReactComponent as ArrowIcon } from "../../assets/images/icons/arrow.svg";
import { useEffect, FC, Fragment } from "react";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react";

interface IPost {
    data: {
        title?: string;
        id?: string;
    };
}

const PostCard: FC<IPost> = ({ data }) => {
    return (
        <ListItemButton>
            <ListItemText primary={data.title} />
            <Link to={`/posts/${data.id}`} className={style.card__link}></Link>
        </ListItemButton>
    );
};

export const UserId: FC = observer(() => {
    const { id } = useParams<{id: string}>();
    const { currentUser, postsList, clearUserData, getUserData, getUserPostsList } = userStore;

    useEffect(() => {
        getUserData(id);
        getUserPostsList(id);

        return () => {
            clearUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            <Link to={`/users`} className={style.back}>
                <ArrowIcon /> Назад
            </Link>
            {currentUser?.name ? (
                <>
                    <Typography mb={2} variant="h1">
                        {currentUser.name}
                    </Typography>
                    {postsList.length ? (
                        <>
                            <Typography variant="h4">Посты:</Typography>
                            <List sx={{ width: "100%" }}>
                                {postsList.map((data) => {
                                    return (
                                        <Fragment key={data.id}>
                                            <PostCard data={data} />
                                            <Divider component="li" />
                                        </Fragment>
                                    );
                                })}
                            </List>
                        </>
                    ) : (
                        <Typography variant="h4">Посты отсутствуют</Typography>
                    )}
                </>
            ) : (
                <Typography variant="h4">Загрузка...</Typography>
            )}
        </Box>
    );
});
