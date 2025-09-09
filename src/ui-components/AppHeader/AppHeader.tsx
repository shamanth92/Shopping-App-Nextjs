"use client";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Avatar,
  Badge,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Link from "next/link";
import { useAppStore } from "@/zustand/store";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/firebase/initialize";
import { getAuth, signOut } from "firebase/auth";
import { deleteCookie } from "cookies-next";
import useSWR from "swr";

export const AppHeader = () => {
  const checkoutItems = useAppStore((state) => state.checkoutItems);
  const userInfo = useAppStore((state) => state.userInfo);
  const tokenInfo = useAppStore((state) => state.tokenInfo);
  const resetState = useAppStore((state) => state.resetState);
  const updateCheckoutItems = useAppStore((state) => state.updateCheckoutItems);
  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState(0);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const getCartItems = (args: any) =>
    fetch(args, {
      headers: {
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/ecommerce/checkoutCart?email=${userInfo.emailAddress}`,
    getCartItems
  );

  const handleClick = (event: any) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = (link: string) => {
    switch (link) {
      case "Account":
        router.push("/account");
        break;
      case "Orders":
        router.push("/orders");
        break;
      case "Help":
        router.push("/help");
        break;
      case "Logout":
        const auth = getAuth(app);
        signOut(auth)
          .then((res) => {
            console.log(res);
            deleteCookie("token");
            resetState();
            router.push("/login");
          })
          .catch((error) => {
            // An error happened.
          });
        break;

      default:
        break;
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (data) {
      let q = 0;
      data.forEach((element: any) => {
        console.log(element);
        q = q + element.quantity;
      });
      setItems(q);
      updateCheckoutItems(q);
    }
  }, [data, updateCheckoutItems, checkoutItems]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              Next ECommerce
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "20%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "65%",
                marginTop: "10px",
              }}
            >
              <Link href="/products">
                <HomeIcon fontSize="large" color="secondary" />
              </Link>
              <Link href="/products/favorites">
                <FavoriteIcon fontSize="large" color="secondary" />
              </Link>
              <Link href="/products/checkout">
                <Badge badgeContent={items} color="error">
                  <ShoppingBagIcon fontSize="large" color="secondary" />
                </Badge>
              </Link>
            </Box>
            <IconButton onClick={handleClick}>
              <Avatar data-testid="avatar-icon">
                {userInfo?.fullName !== ""
                  ? userInfo.fullName.split(" ")[0][0]
                  : ""}
                {userInfo?.fullName !== ""
                  ? userInfo.fullName.split(" ")[1][0]
                  : ""}
              </Avatar>
            </IconButton>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={() => handleClose("")}
          onClick={() => handleClose("")}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => handleClose("Account")}>My account</MenuItem>
          <MenuItem onClick={() => handleClose("Orders")}>View Orders</MenuItem>
          <MenuItem onClick={() => handleClose("Help")}>Help</MenuItem>
          <Divider />
          <MenuItem onClick={() => handleClose("Logout")}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
