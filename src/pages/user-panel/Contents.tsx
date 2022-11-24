import * as React from "react";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Title from "./Title";

const rows = [
  // course contents 10 rows
  {
    title: "Introduction to React",
    url: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    teacher: "John Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Hooks",
    url: "https://www.youtube.com/watch?v=dpw9EHDh2bM",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Router",
    url: "https://www.youtube.com/watch?v=Law7wfdg_ls",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Redux",
    url: "https://www.youtube.com/watch?v=CVpUuw9XSjY",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Context API",
    url: "https://www.youtube.com/watch?v=35lXWvCuM8o",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Testing",
    url: "https://www.youtube.com/watch?v=7r4xVDI2vho",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Performance",
    url: "https://www.youtube.com/watch?v=0ZJgIjIuY7U",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Suspense",
    url: "https://www.youtube.com/watch?v=6g3g0Q_XVb4",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Portals",
    url: "https://www.youtube.com/watch?v=ZKwqNgG-Sv4",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
  {
    title: "React Error Boundaries",
    url: "https://www.youtube.com/watch?v=2vJ1ypDd0jg",
    teacher: "Jhon Doe",
    date: "2020-01-05",
    duration: "5:20",
  },
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Contents() {
  return (
    <React.Fragment>
      <Title> Contents </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))} */}
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link
                  href={row.url}
                  target="_blank"
                  rel="noopener"
                  onClick={preventDefault}
                >
                  {" "}
                  {row.title}{" "}
                </Link>
              </TableCell>
              <TableCell>{row.teacher}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary"  onClick={preventDefault} sx={{ mt: 3 }}>
        See more...
      </Link>
    </React.Fragment>
  );
}
