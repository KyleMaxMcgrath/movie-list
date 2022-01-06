import './App.css';

import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MovieList from './MovieList';

function App() {
  return (
    <div className="App">
      <MuiAppBar className="App-AppBar" elevation={0} position="fixed"  >
          <Typography
            variant="h6"
            underline="none"
            color="white"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Movie List'}
          </Typography>

      </MuiAppBar>
      <br/>
      <br/>
      <Box>
        <Typography
              variant="h7"
              underline="none"
              color="darkblue"
              href="/"
              sx={{ fontSize: 24 }}>
                {'Popular Movies Today'}
        </Typography>
      </Box>
      <MovieList/>
    
    </div>
  );
}

export default App;
