import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { openDB } from "../../openDB";
import { Microphone } from "./../../../model/Microphone";

// export interface MicrophoneDetailProps extends Microphone {} OR ...
export type MicrophoneDetailProps = Microphone;

const MicrophoneDetail = ({
  id,
  brand,
  model,
  price,
  imageUrl,
}: MicrophoneDetailProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container className="my-container">
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CardActionArea className="my-card">
            <CardMedia
              component="img"
              alt={`${brand} ${model}`}
              // height="300"
              // width="300"
              image={imageUrl}
              title={`${brand} ${model}`}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className="my-content"
              >
                {`${brand} ${model}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolores minus consectetur et magnam quod molestiae cum quae
                nulla, facilis harum?
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

//get paths
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  // api call to get all microphones
  const db = await openDB();
  const microphones = await db.all("select * from microphone");

  // Get the paths we want to pre-render based on microphone
  const paths = microphones.map((microphone) => ({
    params: { id: microphone.id.toString() },
  }));

  // We'll pre-render only these paths at build time. { fallback: false } means other routes should 404.
  return { paths, fallback: true };

  // return {
  //   fallback: true,
  //   paths: [
  //     { params: { id: "1" } },
  //     { params: { id: "2" } },
  //     { params: { id: "3" } },
  //   ],
  // };
};

//get props
export const getStaticProps: GetStaticProps<MicrophoneDetailProps> = async (
  ctx
) => {
  const db = await openDB();
  const microphone = await db.get("select * from microphone where id= ?", [
    +ctx.params.id,
  ]);

  return {
    props: microphone,
  };
};

export default MicrophoneDetail;
