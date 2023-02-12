import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import postStore from "../../stores/PostStore";
import { observer } from "mobx-react";
import { Comments } from "../../components/Comments/Comments";
import { BackLink } from "../../components/BackLink/BackLink";

export const PostId = observer(() => {
    const { id } = useParams<{ id: string }>();
    const { currentPost, clearPostData, clearPostCommentsData, getPostData } = postStore;

    useEffect(() => {
        getPostData(id);

        return () => {
            clearPostData();
            clearPostCommentsData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            {currentPost?.title ? (
                <>
                    <BackLink url={`/users/${currentPost.user_id}`} />

                    <Typography mb={4} variant="h2" component="h1">
                        {currentPost?.title}
                    </Typography>

                    <Typography mb={4}>
                        {currentPost?.body}
                    </Typography>

                    <Comments />
                </>
            ) : (
                <Typography variant="h4">Загрузка...</Typography>
            )}
        </Box>
    );
});
