import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CommentsList } from "./CommentsList";
import postStore from "../../stores/PostStore";
import { observer } from "mobx-react";

export const Comments = observer(() => {
    const { id } = useParams<{ id: string }>();
    const [commentsLoaded, setCommentsLoaded] = useState(false);
    const { postsCommentsList, isLoading, pagination, getPostCommentsList } = postStore;

    const handleFirstCommentsList = () => {
        setCommentsLoaded(true);
        getPostCommentsList(id, pagination.currentPage);
    };

    const handleCommentsLoad = () => {
        getPostCommentsList(id, pagination.currentPage + 1);
    };

    // Если комментарии ещё не загружены, то показать кнопку
    if (!commentsLoaded) {
        return (
            <Button size="large" variant="contained" color="secondary" onClick={handleFirstCommentsList}>
                Загрузить комментарии
            </Button>
        );
    }

    // Если первые комментарии не загружены
    if (postsCommentsList.length < 1 && isLoading) {
        return <Typography variant="h6">Загрузка комментариев...</Typography>;
    }

    return (
        <>
            {
                // Если первые комментарии загружены
                postsCommentsList.length ? (
                    <>
                        <Typography variant="h5">Комментарии:</Typography>

                        <CommentsList />

                        {pagination.hasNextPage && (
                            <Button size="large" color="secondary" variant="contained" sx={{ mt: 2 }} onClick={handleCommentsLoad}>
                                {isLoading ? "Загрузка..." : "Загрузить ещё"}
                            </Button>
                        )}
                    </>
                ) : (
                    // Если комментарии не найдены
                    <Typography variant="h5">Комментарии отсутствуют</Typography>
                )
            }
        </>
    );
});
