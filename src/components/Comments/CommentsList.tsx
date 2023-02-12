import { Paper } from "@mui/material";
import { observer } from "mobx-react";
import postStore from "../../stores/PostStore";
import { CommentCard } from "./CommentCard";

export const CommentsList = observer(() => {
    const { postsCommentsList } = postStore;

    return (
        <>
            {postsCommentsList.map((data) => {
                return (
                    <Paper key={data.id} sx={{ mt: 2, p: 2 }}>
                        <CommentCard data={data} />
                    </Paper>
                );
            })}
        </>
    );
});
