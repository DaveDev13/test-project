import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../assets/images/icons/arrow.svg";

interface IBackLink {
    url: string;
}

export const BackLink = ({url}: IBackLink) => {
    return (
        <Box component={Link} to={url} sx={{
            display: "inline-flex",
            alignItems: "center",
            mb: 4,
        }}>
            <Button component="span" color="secondary">
                <ArrowIcon style={{
                    width: "24px",
                }} /> Назад
            </Button>
        </Box>
    );
};
