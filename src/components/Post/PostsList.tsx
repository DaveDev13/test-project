import { Box } from "@mui/material";
import userStore from "../../stores/UserStore";
import { PostCard } from "./PostCard";

export const PostsList = () => {
    const { postsList } = userStore;

    return (
        <Box sx={{ width: "100%" }}>
            {postsList.map((data) => (
                <PostCard key={data.id} data={data} />
            ))}
        </Box>
    );
};
