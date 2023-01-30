import { Button } from "@mui/material";
import React from "react";

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
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        {pages.map((page, i) => {
          return (
            <Button
              variant="contained"
              key={i}
              sx={{ m: 1 }}
              onClick={() => setPage(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
