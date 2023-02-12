import { Box, Button, Paper, Grid, Typography, Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import style from "./post.module.scss";
import { ReactComponent as ArrowIcon } from "../../assets/images/icons/arrow.svg";
import { useEffect, FC, useState } from "react";
import postStore from "../../stores/PostStore";
import { observer } from "mobx-react";

interface IComment {
    data: {
        name: string;
        body: string;
    };
}

const Comment: FC<IComment> = ({ data }) => {
    return (
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt={data.name} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <Typography variant="h5">{data.name}</Typography>
                <Typography>{data.body}</Typography>
            </Grid>
        </Grid>
    );
};

export const PostId: FC = observer(() => {
    const { id } = useParams<{ id: string }>();
    const [commentsLoaded, setCommentsLoaded] = useState(false);
    const { currentPost, postsCommentsList, isLoading, pagination, clearPostData, getPostData, getPostCommentsList } = postStore;

    useEffect(() => {
        getPostData(id);

        return () => {
            clearPostData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCommentsLoad = () => {
        const next = commentsLoaded ? 1 : 0;

        getPostCommentsList(id, pagination.currentPage + next);
    };

    return (
        <Box>
            {currentPost?.title ? (
                <>
                    <Link to={`/users/${currentPost.user_id}`} className={style.back}>
                        <ArrowIcon /> Назад
                    </Link>
                    <Typography mb={3} variant="h1" component="h2">
                        {currentPost?.title}
                    </Typography>
                    <Typography mb={2} variant="body1">
                        {currentPost?.body}
                    </Typography>

                    {commentsLoaded ? (
                        // если первые комментарии не загружены
                        postsCommentsList?.length < 1 && isLoading ? (
                            <Typography variant="h4">Загрузка комментариев...</Typography>
                        ) : // если первые комментарии загружены
                        postsCommentsList?.length ? (
                            <>
                                <Typography variant="h4">Комментарии:</Typography>
                                {postsCommentsList.map((data) => {
                                    return (
                                        <Paper key={data.id} style={{ marginTop: 16, padding: 16 }}>
                                            <Comment data={data} />
                                        </Paper>
                                    );
                                })}
                                {pagination.hasNextPage && (
                                    <Button variant="contained" style={{ marginTop: 16 }} onClick={handleCommentsLoad}>
                                        {isLoading ? "Загрузка..." : "Загрузить ещё"}
                                    </Button>
                                )}
                            </>
                        ) : (
                            // если комментарии не найдены
                            <Typography variant="h4">Комментарии отсутствую</Typography>
                        )
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => {
                                setCommentsLoaded(true);
                                handleCommentsLoad();
                            }}
                        >
                            Загрузить комментарии
                        </Button>
                    )}
                </>
            ) : (
                <Typography variant="h4">Загрузка...</Typography>
            )}
        </Box>
    );
});
