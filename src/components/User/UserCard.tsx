import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { UserStructure } from "../../data/users/UsersApi";

interface IUser {
    data: UserStructure;
}

export const UserCard = ({ data }: IUser) => {
    return (
        <ListItem
            button
            component={Link}
            to={`/users/${data.id}`}
            sx={{
                borderBottom: "1px solid #eee",
            }}
        >
            <ListItemAvatar>
                <Avatar alt={data.name} />
            </ListItemAvatar>
            <ListItemText primary={data.name} />
        </ListItem>
    );
};
