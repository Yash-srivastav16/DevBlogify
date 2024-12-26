import React from "react";
import { IconButton, Box } from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

interface ShareButtonProps {
  url: string;
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {

  return (
    <Box style={{ display: "flex", gap: "0.5rem" }}>
      <IconButton
        color="primary"
        size="small"
        component="a"
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        aria-label="Share on Facebook"
      >
        <Facebook />
      </IconButton>
      <IconButton
        color="primary"
        size="small"
        component="a"
        href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`}
        target="_blank"
        aria-label="Share on Twitter"
      >
        <Twitter />
      </IconButton>
      <IconButton
        color="primary"
        size="small"
        component="a"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
        target="_blank"
        aria-label="Share on LinkedIn"
      >
        <LinkedIn />
      </IconButton>
    </Box>
  );
};

export default ShareButton;
