import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { observer } from "mobx-react";
import userStore from "../../stores/UserStore";
import { UsersList } from "../../components/User/UsersList";


export const Users = observer(() => {
    const {usersList, activeUsers, changeUserStatus, getUsersList, pagination, isLoading} = userStore;

    useEffect(() => {
        if (!usersList.length) {
            getUsersList(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeStatus = () => {
        changeUserStatus();
    };

    const handleLoadUsers = () => {
        getUsersList(pagination.currentPage + 1);
    };

    return (
        <Box>
            {usersList.length ? (
                <>
                    <Typography mb={2} variant="h1">
                        Список {activeUsers ? "активных" : "всех"} пользователей
                    </Typography>

                    <Button variant="outlined" onClick={handleChangeStatus}>
                        {activeUsers ? "Показать всех" : "Показать только активных"}
                    </Button>

                    <UsersList />

                    <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleLoadUsers}>
                        {isLoading ? "Загрузка..." : "Загрузить ещё"}
                    </Button>
                </>
            ) : (
                <Typography variant="h4">Загрузка...</Typography>
            )}
        </Box>
    );
});
