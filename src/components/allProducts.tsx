"use client";
import { ActionButton } from "@/ui-components/ActionButton/ActionButton";
import { useAppStore } from "@/zustand/store";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ProductsProps {
  products: [Products];
}

export interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  email?: string;
  quantity?: number;
}

export const AllProducts: React.FC<any> = ({ products }) => {
  const productSelect = useAppStore((state) => state.productSelect);
  const updateProductSelect = useAppStore((state) => state.updateProductSelect);
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery("(min-width:1920px)");

  const allProducts = products.map((p: Products) => (
    <Grid item xs={3} key={p.id}>
      <Card
        sx={{
          height: isDesktopOrLaptop ? "400px" : "335px",
          cursor: "pointer",
        }}
        elevation={productSelect?.id === p.id ? 10 : 2}
        onMouseEnter={() => updateProductSelect({ id: p.id })}
        onMouseLeave={() => updateProductSelect({})}
      >
        <CardActionArea onClick={() => router.push(`/products/${p.id}`)}>
          <Container
            sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
          >
            <Box
              component="img"
              height={isDesktopOrLaptop ? "280px" : "200px"}
              width="50%"
              alt="The house from the offer."
              src={p.image}
            />
          </Container>
          <Divider />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>{p.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ));

  console.log(products);

  return (
    <Box>
      {products && products.length > 0 && (
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={12}>
            {allProducts}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
