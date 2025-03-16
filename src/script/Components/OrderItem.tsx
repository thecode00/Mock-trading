import { Box, Card, CardContent, ListItem, Typography } from "@mui/material";
import { useState } from "react";

export function OrderItem({ data }) {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography>{data.price}</Typography>
          <Typography>{data.type}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
