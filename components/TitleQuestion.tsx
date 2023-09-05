import { Box } from "@mui/material";
import React from "react";

type Props = {
  question: string;
  ansError: boolean;
  ans: string[];
};

const TitleQuestion = ({ question, ansError, ans }: Props) => {
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: `center`,
        fontSize: "32px",
        color: ansError ? "red" : null,
        gap: "10px",
        flexWrap: `wrap`,
      }}
    >
      {question.split("").map((val, idx) => {
        return (
          <Box
            key={idx}
            sx={{
              minWidth: "70px",
              minHeight: "70px",
              px: "20px",
              border: `2px solid #c3c3c3`,
              borderRadius: `15px`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              background: "#fff",
            }}
          >
            {ans[idx]}
          </Box>
        );
      })}
    </Box>
  );
};

export default TitleQuestion;
