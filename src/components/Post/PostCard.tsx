import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface IPostCard {
    data: {
        title?: string;
        id?: string;
    };
}

export const PostCard = ({ data }: IPostCard) => {
    return (
        <ListItem
            button
            component={Link}
            to={`/posts/${data.id}`}
            sx={{
                borderBottom: "1px solid #eee",
            }}
        >
            <ListItemText primary={data.title} />
        </ListItem>
    );
};
