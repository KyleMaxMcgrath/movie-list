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
      <MovieList/>
    
    </div>
  );
}

export default App;
