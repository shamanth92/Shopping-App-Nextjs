import Image from "next/image";
import styles from "./page.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className={styles.main}>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </main>
  );
}
