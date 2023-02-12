import React from "react";
import Button from "@mui/material/Button";
import Paginations from "@mui/material/Pagination";

interface IPaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: any;
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
}) => {
  let totalPages = 1;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    totalPages = i;
  }

  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <Paginations
          count={totalPages}
          color="primary"
          defaultPage={1}
          size="large"
          onChange={(event, value) => setPage(value)}
        />
      </div>
    </>
  );
};

export default Pagination;
