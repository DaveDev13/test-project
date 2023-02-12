import { Box } from "@mui/material";
import userStore from "../../stores/UserStore";
import { UserCard } from "./UserCard";

export const UsersList = () => {
    const { usersList, activeUsers } = userStore;

    return (
        <Box>
            {usersList.map((data) => {
                if (activeUsers && data.status === "inactive") {
                    return null;
                }

                return <UserCard key={data.id} data={data} />;
            })}
        </Box>
    );
};
