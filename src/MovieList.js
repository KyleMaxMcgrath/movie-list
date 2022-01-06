import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';

const columns = [
    { id: 'vote_count', label: 'Votes', minWidth: 30 },
    {
      id: 'title',
      label: 'Movie Name',
      minWidth: 190,
      align: 'left',
      format: (value) => value.toLocaleString('en-US')
    },
    {
      id: 'genre_ids',
      label: 'Genre',
      minWidth: 190,
      align: 'center',
      format: (value) => value.toLocaleString('en-US')
    },
    {
      id: 'release_date',
      label: 'Release Date',
      minWidth: 90,
      align: 'center',
      format: (value) => value.toLocaleString('en-US')
    }
  ];

  const MovieList = () => {

    const [resData, setResData] = useState([]);
    const [genreList, setGenreList] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=1914dd006c9036f93deb70ac29dca40a`);
      console.log(res.data.results);
      setResData(resData=>res.data.results);
    }, [])

    useEffect(async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1914dd006c9036f93deb70ac29dca40a&language=en-US`);
      setGenreList(list=>res.data);
    }, [])

    const findGenre = (id) => {
      let genre = "";
      for(let i = 0; i < genreList.genres.length; i++) {
        if(genreList.genres[i].id === id) {
          genre = genreList.genres[i].name;
          break;
        }
      }
      return genre;
    };

    const populateGenres = (genres) => {
      let list = "";
      for(let id of genres) {
        list += findGenre(id) + ", ";
      }
      list = list.substring(0,list.length-2);
      return list;
    };
      
    return (
      
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {resData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (


                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        if(column.id === 'genre_ids') {
                          return (<TableCell key={column.id} align={column.align}>
                              {populateGenres(value)}
                          </TableCell>)
                        }
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                        <MovieDetails 
                          id={row['id']}
                          votes={row['vote_count']}
                          title={row['title']}
                          genres={populateGenres(row['genre_ids'])}
                          release_date={row['release_date']}
                        />
                    </TableRow>
                    
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={resData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
      
  }

  export default MovieList;