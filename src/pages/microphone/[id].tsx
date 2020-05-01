import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

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
    <div>
      <div>{id}</div>
      <div>{brand}</div>
      <div>{model}</div>
      <div>{price}</div>
      <div>{imageUrl}</div>
    </div>
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
