import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, } from "react";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react";
import { PostsList } from "../../components/Post/PostsList";
import { BackLink } from "../../components/BackLink/BackLink";

export const UserId = observer(() => {
    const { id } = useParams<{ id: string }>();
    const [postLoading, setPostsLoading] = useState(false);
    const { currentUser, postsList, clearUserData, clearUserPostsData, getUserData, getUserPostsList } = userStore;

    useEffect(() => {
        setPostsLoading(true);

        getUserData(id).then(() => {
            getUserPostsList(id).then(() => {
                setPostsLoading(false);
            });
        });

        return () => {
            clearUserData();
            clearUserPostsData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            {currentUser?.name ? (
                <>
                    <BackLink url="/users" />
                    <Typography mb={2} variant="h1">
                        {currentUser.name}
                    </Typography>

                    {postsList.length && !postLoading ? (
                        <>
                            <Typography variant="h5">Посты:</Typography>

                            <PostsList />
                        </>
                    ) : (
                        <Typography variant="h5">{postLoading ? "Загрузка постов..." : "Посты отсутствуют"}</Typography>
                    )}
                </>
            ) : (
                <Typography variant="h4">Загрузка...</Typography>
            )}
        </Box>
    );
});
