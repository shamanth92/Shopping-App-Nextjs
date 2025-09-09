"use client";
import { Tabs, Tab, Box, Typography, CardContent, Card } from "@mui/material";
import { useState } from "react";
import styles from "./account.module.css";
import SavedAddress from "@/components/savedAddress";
import PaymentMethods from "@/components/paymentMethods";
import OrderHistory from "@/components/orderHistory";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { useAppStore } from "@/zustand/store";
import { DateTime } from "luxon";
import useSWR from "swr";

export default function Account() {
  const [tabIndex, setTabIndex] = useState(0);
  const userInfo = useAppStore((state) => state.userInfo);
  const tokenInfo = useAppStore((state) => state.tokenInfo);

  const updateTab = (e: any, v: number) => {
    setTabIndex(v);
  };

  const getAccountInfo = (args: any) =>
    fetch(args, {
      headers: {
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/ecommerce/account/user?email=${userInfo.emailAddress}`,
    getAccountInfo
  );

  return (
    <>
      <AppHeader />
      <Box className={styles.account}>
        <Tabs
          value={tabIndex}
          onChange={updateTab}
          TabIndicatorProps={{
            style: { backgroundColor: "#21b6ae" },
          }}
          sx={{
            // "& .MuiTab-root": {
            //   color: "white", // Inactive tab text color
            // },
            "& .MuiTab-root.Mui-selected": {
              color: "#21b6ae", // Active tab text color
            },
          }}
        >
          <Tab label="Profile" />
          <Tab label="Order History" />
          <Tab label="Saved Addresses" />
          <Tab label="Payment Methods" />
        </Tabs>
        {tabIndex === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Card>
              <CardContent>
                <Box>
                  <Box sx={{ padding: "10px" }}>
                    <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      Name:
                    </Typography>
                    <Typography>{userInfo.fullName}</Typography>
                  </Box>
                  <Box sx={{ padding: "10px" }}>
                    <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      Email Address:
                    </Typography>
                    <Typography>{userInfo.emailAddress}</Typography>
                  </Box>
                  <Box sx={{ padding: "10px" }}>
                    <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      Member since:
                    </Typography>
                    <Typography>
                      {DateTime.fromMillis(parseInt(userInfo.accountCreated))
                        .setZone("UTC")
                        .toFormat("d LLLL yyyy")}
                    </Typography>
                  </Box>
                  <Box sx={{ padding: "10px" }}>
                    <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      Last Logged In Activity:
                    </Typography>
                    <Typography>
                      {DateTime.fromMillis(parseInt(userInfo.lastLoggedIn))
                        .toUTC()
                        .toFormat("EEE, dd LLL yyyy HH:mm:ss 'GMT'")}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        {tabIndex === 1 && <OrderHistory />}
        {tabIndex === 2 && <SavedAddress />}
        {tabIndex === 3 && <PaymentMethods />}
      </Box>
    </>
  );
}
