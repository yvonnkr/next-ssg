import React from "react";
import { Microphone } from "./../../model/Microphone";
import { openDB } from "../openDB";
import { GetStaticProps } from "next";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export interface IndexProps {
  microphones: Microphone[];
}

const Index = ({ microphones }: IndexProps) => {
  const router = useRouter();
  const currPage = +router.query.currentPage || 0;

  return (
    <>
      <div className="my-pagination">
        You are on page: {`${currPage == 0 ? "home" : currPage}`}
        <button
          onClick={() => Router.push(currPage === 1 ? `/` : `/${currPage - 1}`)}
          disabled={currPage < 1}
        >
          {currPage === 0 || currPage === 1 ? "HOME" : "PREV"}
        </button>
        <button
          onClick={() => Router.push(`/${currPage + 1}`)}
          disabled={currPage == 3}
        >
          {currPage === 3 ? "" : "NEXT"}
        </button>
      </div>
      <Grid container spacing={3} className="my-container">
        {microphones.map((m) => (
          <Grid key={m.id} item xs={12} sm={4} md={3}>
            <Link href="/microphone/[id]" as={`microphone/${m.id}`}>
              <a>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={`${m.brand} ${m.model}`}
                      height="250"
                      image={m.imageUrl}
                      title={`${m.brand} ${m.model}`}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="my-content"
                      >
                        {`${m.brand} ${m.model}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Dolores minus consectetur et magnam quod molestiae
                        cum quae nulla, facilis harum?
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  //pagination
  const currentPage = ctx.params?.currentPage as string;
  const currentPageNumber = +(currentPage || 0);

  const min = currentPageNumber * 5;
  const max = (currentPageNumber + 1) * 5;

  const db = await openDB();
  const microphones = await db.all(
    "select * from microphone where id > ? and id <= ? ",
    min,
    max
  );

  return {
    props: { microphones },
  };
};

export default Index;
