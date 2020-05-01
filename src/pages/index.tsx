import React from "react";
import { Microphone } from "./../../model/Microphone";
import { openDB } from "../openDB";
import { GetStaticProps } from "next";
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
  return (
    <Grid container spacing={3} className="my-container">
      {microphones.map((m) => (
        <Grid key={m.id} item xs={12} sm={3}>
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
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Dolores minus consectetur et magnam quod molestiae cum
                      quae nulla, facilis harum?
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const db = await openDB();
  const microphones = await db.all("select * from microphone");

  return {
    props: { microphones },
  };
};

export default Index;

//#region test render
/**
 *  // <div>
    //   {microphones.map((m) => (
    //     <div key={m.id}>
    //       <Link href="/microphone/[id]" as={`microphone/${m.id}`}>
    //         <a>
    //           {m.brand} {m.model}
    //         </a>
    //       </Link>
    //     </div>
    //   ))}
    // </div>
 */
//#endregion
