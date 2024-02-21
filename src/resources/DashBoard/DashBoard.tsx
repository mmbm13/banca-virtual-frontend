import { Box, Card, Stack, Typography, Button, Fade } from "@mui/material";
import {
  Identifier,
  List,
  WithListContext,
  useDataProvider,
  useGetOne,
  useNotify,
  usePermissions,
  useRefresh,
} from "react-admin";
import pingImg from "../../static/images/pig.png";
import coinImg from "../../static/images/coin.png";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { TransitionGroup } from "react-transition-group";
import { Roles } from "../../common/enums";

const Reddem = ({
  coins,
  newCoins,
  setCoins,
  setNewCoins,
}: {
  coins: number;
  newCoins: number;
  setCoins: any;
  setNewCoins: any;
}) => {
  const notify = useNotify();
  const [firstTime, setFirstTime] = useState(false);

  const { data: record, isLoading } = useGetOne(
    "users",
    { id: "profile" },
    {
      enabled: !firstTime,
      onError: () => {
        notify("ra.notification.item_doesnt_exist", {
          type: "error",
        });
      },
    }
  );

  useEffect(() => {
    if (!isLoading) {
      setCoins(record.coins);
      setNewCoins(record.coins);
      setFirstTime(true);
    }
  }, [record, isLoading, setCoins, setNewCoins]);

  if (isLoading) return null;

  return (
    <Box
      padding="10px"
      display="flex"
      alignContent="center"
      flexWrap="wrap"
      flexDirection="column"
      gap="10px"
      textAlign="center"
    >
      <Box>
        <Box position="relative">
          <img
            alt="cerdito"
            src={pingImg}
            style={{ height: "auto", maxWidth: "200px" }}
          />
          <Typography
            variant="h3"
            position="absolute"
            top="54%"
            left="0"
            width="180px"
            textAlign="center"
            color="#5c7f7f"
            fontSize="35px"
            fontWeight="bolder"
          >
            <CountUp start={coins} end={newCoins} duration={4} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const DashBoard = () => {
  const [coins, setCoins] = useState(0);
  const [newCoins, setNewCoins] = useState(0);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();
  const {permissions} = usePermissions();

  const handleClaim = async (id: Identifier, addCoins: number) => {
    try {
      await dataProvider.httpFetch(`transactions/${id}/claim`);
      setCoins(newCoins);
      setNewCoins(newCoins + addCoins);
      refresh();
    } catch (error: any) {
      notify(error.message, {
        type: "error",
        messageArgs: { _: error.message },
      });
    }
  };

  return (
    <Box padding="15px">
      {permissions === Roles.STUDENT && (
        <Card>
        <List
          resource="transactions/pending"
          empty={false}
          actions={false}
          component="div"
          perPage={20}
          pagination={false}
        >
          <Reddem
            coins={coins}
            newCoins={newCoins}
            setCoins={setCoins}
            setNewCoins={setNewCoins}
          />
          <WithListContext
            render={({ data }) => (
              <Stack
                spacing={2}
                sx={{
                  padding: 2,
                  "& .container": {
                    display: "grid",
                    gap: "5%",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    alignItems: "baseline",
                    marginBottom: "10px"
                  },
                }}
              >
                <TransitionGroup className="container">
                  {data?.map((record) => (
                    <Fade key={record.id}>
                      <Card
                        key={record.id}
                        sx={{ padding: "10px", textAlign: "center" }}
                      >
                        <Box position="relative">
                          <img
                            alt="moneda"
                            src={coinImg}
                            style={{ height: "auto", maxWidth: "100%" }}
                          />
                          <Typography
                            variant="h3"
                            position="absolute"
                            top="50%"
                            left="50%"
                            sx={{
                              transform: "translate(-55%, -50%)",
                            }}
                            fontFamily="Action Jackson"
                            width="100%"
                            textAlign="center"
                            color="#E98017"
                            fontSize="4em"
                            fontWeight="bolder"
                          >
                            {Number(record?.coins).toLocaleString("en-CO")}
                          </Typography>
                        </Box>
                        <Typography>
                          {new Date(record.createdAt).toLocaleString("en-CO", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </Typography>
                        <Button
                          color="secondary"
                          variant="contained"
                          sx={{ marginTop: "10px" }}
                          onClick={() => handleClaim(record.id, record.coins)}
                        >
                          Reclamar
                        </Button>
                      </Card>
                    </Fade>
                  ))}
                </TransitionGroup>
              </Stack>
            )}
          />
        </List>
      </Card>
      )}
    </Box>
  );
};
