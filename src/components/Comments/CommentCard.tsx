import { Grid, Avatar, Typography } from "@mui/material";
import { observer } from "mobx-react";

interface ICommentCard {
    data: {
        name: string;
        body: string;
    };
}

export const CommentCard = observer(({ data }: ICommentCard) => {
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
});
