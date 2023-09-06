"use client";
import { useEffect, useState } from "react";
import Vocabulary from "@/data/vocabulary.json";
import { Box, Button, Container, Grid, Skeleton } from "@mui/material";
import { makeVocabulary, makeVocabularyText } from "@/utils/constants";
import TitleQuestion from "@/components/TitleQuestion";
import store from "store2";

export default function Home() {
  const mode = store.local("mode") || 1;
  const [clickKey, setClickKey] = useState<number[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [dataTextSelect, setDataTextSelect] = useState<string[]>([]);
  const [ans, setAns] = useState<string[]>([]);
  const [vocabulary, setVocabulary] = useState<string[]>([]);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [ansError, setAnsError] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const onClickSelect = (text: string, key: number) => {
    const idx = clickKey.findIndex((val) => val === key);

    setAns((prevText) => {
      if (idx > -1) {
        prevText.splice(idx, 1);
      } else {
        prevText.push(text);
      }
      return [...prevText];
    });
    setClickKey((prev) => {
      if (idx > -1) {
        prev.splice(idx, 1);
      } else {
        prev.push(key);
      }
      return [...Array.from(new Set(prev))];
    });
  };

  useEffect(() => {
    setVocabulary(Vocabulary.data);
    console.log("store.", mode);
  }, []);

  useEffect(() => {
    // * Config question
    if (vocabulary.length) {
      const lengthData = vocabulary.length;
      const randomQ = Math.floor(Math.random() * lengthData);
      const _makeVocabulary = makeVocabulary(
        vocabulary[randomQ].length + mode - vocabulary[randomQ].length
      );
      const _makeVocabularyText = makeVocabularyText(
        `${vocabulary[randomQ]}${_makeVocabulary}`
      );

      setQuestion(vocabulary[randomQ].toLocaleUpperCase());
      setDataTextSelect(_makeVocabularyText);
      setIsWin(false);
      setLoading(false);
    } else {
      setQuestion("");
      setIsWin(true);
      setScore(0);
    }
  }, [vocabulary]);

  useEffect(() => {
    // * Check the answer
    if (loading) return;
    if (clickKey.length >= question.length) {
      if (
        ans &&
        question &&
        ans.join("").toLocaleUpperCase() === question.toLocaleUpperCase()
      ) {
        setClickKey([]);
        setAns([]);

        // ? Delete correct question
        setVocabulary((prev) => {
          const idx = prev.findIndex(
            (val) => val.toLocaleUpperCase() === question
          );
          prev.splice(idx, 1);
          return [...prev];
        });
        setScore((prev) => prev + 1);
      } else {
        setAnsError(true);
        setTimeout(() => {
          setClickKey([]);
          setAns([]);
          setAnsError(false);
        }, 500);
      }
    }
  }, [clickKey, ans]);

  if (loading) {
    return (
      <Container>
        <div className="my-20">
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              fontSize: "32px",
              color: ansError ? "red" : null,
            }}
          >
            <Skeleton variant="text" height={48} />
          </Box>
          <Grid container spacing={2}>
            {Array.from(Array(18)).map((val, idx) => {
              return (
                <Grid key={idx} item xs={4} sm={2}>
                  <Skeleton
                    variant="rounded"
                    height={80}
                    sx={{ borderRadius: `15px` }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
    );
  }

  if (isWin) {
    return "Win";
  }

  return (
    <Container>
      <Box sx={{ my: { xs: "70px", md: "100px" } }}>
        <Box sx={{ position: "absolute", right: 0, top: 0,fontSize:32,p:3,color:'#676767',fontWeight: 'bold' }}>Score: {score}</Box>
        <TitleQuestion question={question} ansError={ansError} ans={ans} />

        <div>
          <Grid container spacing={2} justifyContent="center">
            {dataTextSelect.map((val, idx) => {
              return (
                <Grid key={idx} item xs={4} sm={2}>
                  <Button
                    sx={{
                      padding: `15px 10px`,
                      textAlign: `center`,
                      border: `2px solid #c3c3c3`,
                      borderRadius: `15px`,
                      fontSize: { xs: "22px", md: "32px" },
                    }}
                    color={clickKey.includes(idx) ? "success" : "primary"}
                    variant={clickKey.includes(idx) ? "contained" : "contained"}
                    onClick={() => onClickSelect(val, idx)}
                    disabled={clickKey.length >= question.length}
                    fullWidth
                  >
                    {val}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Box>
    </Container>
  );
}
