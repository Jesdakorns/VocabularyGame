"use client";
import { Box, Button, Container, Grid } from "@mui/material";
import store from "store2";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Container>
      <Box
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          height: `100vh`,
          flexDirection: "column",
        }}
      >
        <Box sx={{ fontSize: 52, fontWeight: "bold", mb: 4, color: "#637cff",textAlign:'center'}}>
          Vocabulary Game
        </Box>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val, idx) => {
            return (
              <Grid key={idx} item xs={4} sm={4}>
                <Button
                  sx={{
                    padding: `25px 10px`,
                    textAlign: `center`,
                    border: `2px solid #c3c3c3`,
                    borderRadius: `15px`,
                    fontSize: { xs: "22px", md: "32px" },
                  }}
                  fullWidth
                  variant={"contained"}
                  onClick={() => {
                    store.local("mode", val);
                    router.push("/game");
                  }}
                >
                  {val}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}
