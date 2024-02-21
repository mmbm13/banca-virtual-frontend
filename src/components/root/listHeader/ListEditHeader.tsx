import { Box } from "@mui/material";
import { TopToolbar } from "react-admin";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";

interface ListEditHeaderProps {
  title?: string;
  subTitle?: string;
}

export const ListEditHeader = ({
  title = "",
  subTitle = "",
}: ListEditHeaderProps) => {
  return (
    <TopToolbar>
      <Box>
        <Title value={title} />
        <SubTitle value={subTitle} />
      </Box>
    </TopToolbar>
  );
};
