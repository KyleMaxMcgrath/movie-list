import './App.css';

import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
      <MuiAppBar className="App-AppBar" elevation={0} position="fixed"  >
          <Box sx={{ flex: 1 }} />
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
      
    
    </div>
  );
}

export default App;
