import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5', 
        color: '#333',  
        padding: '20px 0',
        marginTop: '5px',  
        position: 'relative',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" component="p" sx={{ marginBottom: '10px' }}>
        &copy; {new Date().getFullYear()} DevBlogify. All rights reserved.
      </Typography>
      
      <Typography variant="body2" component="p">
        <span>Made with ❤️ by Yash Srivastav</span>
      </Typography>

    </Box>
  );
};

export default Footer;
