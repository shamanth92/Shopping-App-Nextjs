"use client";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import styles from "./help.module.css";
import { HelpChatBot } from "@/components/HelpChatBot/helpChatBot";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Help() {
  const [openChat, setOpenChat] = useState(false);
  const isDesktopOrLaptop = useMediaQuery("(min-width:1920px)");

  return (
    <div>
      <AppHeader />
      <Box sx={{ padding: "20px" }}>
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Frequently Asked Questions
        </Typography>
        <Typography sx={{ marginTop: "10px" }}>
          Quick answers to questions you may have about our website and the
          products we sell
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Whats the Status of My Order
            </AccordionSummary>
            <AccordionDetails>
              You can check the shipping status of your order on Etsy.com or the
              Etsy app. If the seller added a tracking number, you can use that
              to get detailed information about the packages movement through
              the shipping carrier.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              How to track a package
            </AccordionSummary>
            <AccordionDetails>
              You will see a Track Package button next to the order on your
              Orders page. Select Track Package to see detailed information
              about your packages status.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              What to do if your order doesn’t arrive
            </AccordionSummary>
            <AccordionDetails>
              If your order does not arrive and your order qualifies, you will
              receive a full refund as part of our Purchase Protection program.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              How Do I Change My Shipping Address
            </AccordionSummary>
            <AccordionDetails>
              If your order does not arrive and your order qualifies, you will
              receive a full refund as part of our Purchase Protection program.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              What is the policy on free shipping
            </AccordionSummary>
            <AccordionDetails>
              If your order does not arrive and your order qualifies, you will
              receive a full refund as part of our Purchase Protection program.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              What is our return policy on products
            </AccordionSummary>
            <AccordionDetails>
              If your order does not arrive and your order qualifies, you will
              receive a full refund as part of our Purchase Protection program.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              How do I manage my payment methods
            </AccordionSummary>
            <AccordionDetails>
              If your order does not arrive and your order qualifies, you will
              receive a full refund as part of our Purchase Protection program.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              How can I get promo codes and special discounts
            </AccordionSummary>
            <AccordionDetails>
              If your order does not arrive and your order qualifies, you will
              receive a full refund as part of our Purchase Protection program.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              How Can I Change Or Cancel My Order
            </AccordionSummary>
            <AccordionDetails>
              If your order does not arrive and your order qualifies, you will
              receive a full refund as part of our Purchase Protection program.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              What Are My Delivery And Shipping Options
            </AccordionSummary>
            <AccordionDetails>
              If your order does not arrive and your order qualifies, you will
              receive a full refund as part of our Purchase Protection program.
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box
          sx={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid lightgrey",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Still have questions?
          </Typography>
          <Typography>
            Cannot find the answer you are looking for? Try these two options:
          </Typography>
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              width: isDesktopOrLaptop ? "20%" : "30%",
            }}
          >
            <ActionButton
              variant="contained"
              label="Contact us"
              color="primary"
            ></ActionButton>
            <ActionButton
              variant="contained"
              label="Chat with a Virtual Agent"
              color="primary"
              buttonClick={() => setOpenChat(!openChat)}
            ></ActionButton>
          </Box>
        </Box>
      </Box>
      {openChat && (
        <Box sx={{ position: "absolute", right: "50px", top: "325px" }}>
          <HelpChatBot />
        </Box>
      )}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#21b6ae",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "66px",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>
            © 2024 ECommerceWebsite. All rights reserved. ECommerceWebsite.com,
            LLC, 600 N McClurg Court, Chicago, Illinois 60611.{" "}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
