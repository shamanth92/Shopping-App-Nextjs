import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./../componentStyles/paymentMethods.module.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { AccountActions } from "@/ui-components/AccountActions/AccountActions";

export default function PaymentMethods() {
  return (
    <div className={styles.paymentMethods}>
      <div>
        <h3>Credit Card(s)</h3>
        <p>Manage your credit cards and payment options.</p>
        <ActionButton
          variant="contained"
          label="Add Payment Method"
          color="primary"
        />
      </div>
      <div>
        <Stack spacing={3}>
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{ display: "flex", justifyContent: "center", height: "100%" }}
            >
              <div className={styles.primaryPayment}>
                <div className={styles.cardName}>
                  <Avatar
                    alt="Visa"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
                  />
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    card ending in 1001
                  </Typography>
                </div>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <CreditScoreIcon />
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.cardDetails}>
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Card Number"
                  defaultValue="XXX-XXX-XXX-1001"
                  sx={{ width: "300px" }}
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Expiry Date"
                  defaultValue="08/29"
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="CVV"
                  defaultValue="***"
                />
              </div>
              <div className={styles.actionContainer}>
                <div className={styles.actions}>
                  <AccountActions defaultProperty={true} />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{ display: "flex", justifyContent: "center", height: "100%" }}
            >
              <div className={styles.cardName}>
                <Avatar
                  alt="Visa"
                  src="https://www.logodesignlove.com/images/symbols/mastercard-symbol-02.jpg"
                />{" "}
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  card ending in 1002
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.cardDetails}>
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Card Number"
                  defaultValue="XXX-XXX-XXX-1001"
                  sx={{ width: "300px" }}
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Expiry Date"
                  defaultValue="08/29"
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="CVV"
                  defaultValue="***"
                />
              </div>
              <div className={styles.actionContainer}>
                <div className={styles.actions}>
                  <AccountActions defaultProperty={false} />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{ display: "flex", justifyContent: "center", height: "100%" }}
            >
              <div className={styles.cardName}>
                <Avatar
                  alt="Visa"
                  src="https://www.discover.com/company/images/newsroom/media-downloads/discover.png"
                />{" "}
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  card ending in 1003
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.cardDetails}>
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Card Number"
                  defaultValue="XXX-XXX-XXX-1001"
                  sx={{ width: "300px" }}
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Expiry Date"
                  defaultValue="08/29"
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="CVV"
                  defaultValue="***"
                />
              </div>
              <div className={styles.actionContainer}>
                <div className={styles.actions}>
                  <AccountActions defaultProperty={false} />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{ display: "flex", justifyContent: "center", height: "100%" }}
            >
              <div className={styles.cardName}>
                <Avatar
                  alt="Visa"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12Un2woOfEno81YkgP7Ws8BGnKL7hVh39-Q&s"
                />{" "}
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  card ending in 1004
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </Stack>
      </div>
    </div>
  );
}
