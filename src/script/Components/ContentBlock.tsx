import { Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CoinBillboard from "./CoinBillboard";
import PositionBlock from "./PositionBlock";
import OrderBlock from "./OrderBlock";

export default function ContentBlock() {
  return (
    <Container maxWidth={false} sx={{ marginTop: 4 }}>
      <Stack spacing={2}>
        <Grid container>
          <Grid size={{ xs: 12, md: 8 }}>
            <CoinBillboard />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <OrderBlock />
          </Grid>
        </Grid>

        <PositionBlock />
      </Stack>
    </Container>
  );
}
