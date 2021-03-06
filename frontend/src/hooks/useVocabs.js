import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setVocabs } from "../actions/appStatusActions";
import screencap from "../api/screencap";

export default ({ sqliteNoteId }) => {
  const [fetchFinished, setFetchFinished] = useState(false);
  const { token } = useSelector((state) => state.login);
  // as we skip the login flow, we hard code the token here, if we  include login flow then we use useSelector to store the token.
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxNDc1NTU1LCJleHAiOjE1OTQwNjc1NTV9.bftFKa84LUmEuAXEwIqGUfr-M1yrouY6SHRzYbBHqCc";

  useEffect(() => {
    screencap
      .get("/screencap/vocabs/" + sqliteNoteId, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => {
        setFetchFinished(false);
        const vocabs = res.data;
        setVocabs(vocabs);
        setFetchFinished(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return { fetchFinished };
};
