// components/Footer.tsx
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 3,
        mt: 5,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          {"© "}
          <Link
            color="inherit"
            href="https://your-portfolio-link.com"
            target="_blank"
          >
            Your Name
          </Link>{" "}
          {new Date().getFullYear()}
          {" | "}
          Built with ❤️ using Next.js, TypeScript & MUI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
