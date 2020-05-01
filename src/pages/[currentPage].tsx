import { GetStaticPaths } from "next";
import { openDB } from "../openDB";
import Index, { getStaticProps } from "./";

export default Index;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await openDB();
  const { total } = await db.get("select count(*) as total from microphone");
  const numberOfPages = Math.ceil(total / 5.0);

  const paths = Array(numberOfPages - 1)
    .fill("")
    .map((_, index) => {
      return { params: { currentPage: (index + 1).toString() } };
    });

  return {
    fallback: false,
    paths: paths,
  };
};

// import React from "react";
// import { useRouter } from "next/router";

// const CurrentPage = () => {
//   const router = useRouter();

//   console.log(router.query);

//   return (
//     <div>
//       <h1>page: {router.query.currentPage} </h1>
//     </div>
//   );
// };

// export default CurrentPage;
