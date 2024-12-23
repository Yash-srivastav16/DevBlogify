import React from "react";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { LinkedIn, GitHub, Description } from "@mui/icons-material";

const AboutDev: React.FC = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #e3f2fd, #e0f7fa)",
        padding: "2rem",
      }}
    >
      <Grid container spacing={4} alignItems="top">
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Avatar
            alt="Yash"
            src="/dev.jpg"
            sx={{
              width: "220px",
              height: "220px",
              margin: "0 auto",
              boxShadow: 3,
            }}
          />
          <Typography
            variant="h4"
            sx={{ marginTop: "1rem", fontWeight: "bold" }}
          >
            Yash Srivastav
          </Typography>

          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<LinkedIn />}
              href="https://www.linkedin.com/in/yash-srivastav/"
              target="_blank"
            >
              LinkedIn Profile
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                "&:hover": { backgroundColor: "#555" },
              }}
              startIcon={<GitHub />}
              href="https://github.com/Yash-srivastav16"
              target="_blank"
            >
              GitHub Profile
            </Button>
            <Button
              variant="outlined"
              startIcon={<Description />}
              href="/Yash_Srivastav_CV.pdf"
              target="_blank"
            >
              Download Resume
            </Button>
          </Box>
          <Box sx={{ marginTop: "1rem" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              What People Say
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", color: "#555" }}
            >
              "Yash is a highly skilled developer who consistently delivers
              quality work and exceeds expectations." – Former Manager
            </Typography>
          </Box>
        </Grid>

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
            Hi, I am Yash, a skilled software developer with a passion for
            learning and solving real-world problems through technology. My
            journey in software development has allowed me to build impactful
            projects, enhance team workflows, and adopt best practices in modern
            web development.
          </Typography>

          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              Career Highlights
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555" }}>
              I’ve worked with a range of technologies and tools, including
              .NET, JavaScript, TypeScript, AWS services, and CI/CD processes.
              Here are some key highlights:
              <ul style={{ marginTop: "0.5rem" }}>
                <li>
                  Developed scalable web applications using the MERN stack.
                </li>
                <li>
                  Built custom GitHub Actions for automation, improving
                  deployment pipelines.
                </li>
                <li>
                  Reduced bottlenecks by optimizing APIs and integrating UI
                  testing with Cypress.
                </li>
              </ul>
            </Typography>
          </Box>

          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
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
