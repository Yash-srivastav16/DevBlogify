import React from "react";
import { Grid, Typography, Box, Avatar, Chip, Divider } from "@mui/material";

const AboutDev: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f7f9fc",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4} alignItems="top">
        {/* Developer Avatar */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Avatar
            alt="Yash"
            src="/dev.jpg"
            sx={{
              width: "250px",
              height: "250px",
              margin: "0 auto",
              marginTop: "5rem",
              boxShadow: 3,
            }}
          />
          <Typography variant="h6" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
            Yash Srivastav
          </Typography>
        </Grid>

        {/* About Content */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#333",
            }}
          >
            About the Developer
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: "#555",
            }}
          >
            Hi, I am Yash, a skilled software developer with a passion for learning and
            solving real-world problems through technology. My journey in software
            development has allowed me to build impactful projects, enhance team
            workflows, and adopt best practices in modern web development.
          </Typography>

          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Career Highlights
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555" }}>
              I’ve worked with a range of technologies and tools, including .NET,
              JavaScript, TypeScript, AWS services, and CI/CD processes. Here are some
              key highlights:
              <ul style={{ marginTop: "0.5rem" }}>
                <li>Developed scalable web applications using the MERN stack.</li>
                <li>
                  Built custom GitHub Actions for automation, improving deployment
                  pipelines.
                </li>
                <li>
                  Reduced bottlenecks by optimizing APIs and integrating UI testing with
                  Cypress.
                </li>
              </ul>
            </Typography>
          </Box>

          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Skills & Expertise
            </Typography>
            <Grid container spacing={1}>
              {[
                "JavaScript",
                "React",
                "TypeScript",
                "AWS",
                "CI/CD",
                ".NET",
                "SQL",
                "Material UI",
              ].map((skill, index) => (
                <Grid item key={index}>
                  <Chip
                    label={skill}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: "2rem" }} />

      {/* Footer Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "#1976d2",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6">
          "Technology is best when it brings people together." – Yash
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutDev;
