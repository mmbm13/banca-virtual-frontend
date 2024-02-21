import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode, useState } from "react";
import { SxProps, Theme } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = (props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return (
    <IconButton
      sx={{
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: (theme) =>
          theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
          }),
      }}
      {...other}
    />
  );
};

interface CollapseCardProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  sx?: SxProps<Theme>;
}

export function CollapseCard({
  title,
  children,
  defaultOpen = true,
  sx = {},
}: CollapseCardProps) {
  const [expanded, setExpanded] = useState(defaultOpen);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
        title={title}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  );
}
