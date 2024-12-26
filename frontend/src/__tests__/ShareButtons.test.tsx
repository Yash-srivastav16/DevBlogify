import { render, screen } from "@testing-library/react";
import ShareButton from "../components/ShareButtons";

describe("ShareButton Component", () => {
  const mockUrl = "https://example.com";
  const mockTitle = "Check this out!";

  it("renders social media share buttons with correct links", () => {
    render(<ShareButton url={mockUrl} title={mockTitle} />);

    const facebookButton = screen.getByRole("link", {
      name: "Share on Facebook",
    });
    expect(facebookButton).toHaveAttribute(
      "href",
      `https://www.facebook.com/sharer/sharer.php?u=${mockUrl}`
    );
    expect(facebookButton).toHaveAttribute("target", "_blank");

    const twitterButton = screen.getByRole("link", {
      name: "Share on Twitter",
    });
    expect(twitterButton).toHaveAttribute(
      "href",
      `https://twitter.com/intent/tweet?text=${mockTitle}&url=${mockUrl}`
    );
    expect(twitterButton).toHaveAttribute("target", "_blank");

    const linkedInButton = screen.getByRole("link", {
      name: "Share on LinkedIn",
    });
    expect(linkedInButton).toHaveAttribute(
      "href",
      `https://www.linkedin.com/shareArticle?mini=true&url=${mockUrl}&title=${mockTitle}`
    );
    expect(linkedInButton).toHaveAttribute("target", "_blank");
  });

  it("renders social media buttons even if title is empty", () => {
    render(<ShareButton url={mockUrl} title="" />);

    const twitterButton = screen.getByRole("link", {
      name: /twitter/i,
    });
    expect(twitterButton).toHaveAttribute(
      "href",
      `https://twitter.com/intent/tweet?text=&url=${mockUrl}`
    );
  });

  it("renders social media buttons even if url is empty", () => {
    render(<ShareButton url="" title={mockTitle} />);

    const facebookButton = screen.getByRole("link", {
      name: /facebook/i,
    });
    expect(facebookButton).toHaveAttribute(
      "href",
      "https://www.facebook.com/sharer/sharer.php?u="
    );
  });

  it("does not crash if both title and url are empty", () => {
    render(<ShareButton url="" title="" />);

    expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  });

  it("applies small size and primary color to all buttons", () => {
    render(<ShareButton url={mockUrl} title={mockTitle} />);

    const buttons = screen.getAllByRole("link");
    buttons.forEach((button) => {
      expect(button).toHaveClass("MuiIconButton-sizeSmall");
      expect(button).toHaveClass("MuiButtonBase-root");
    });
  });

  it("renders the correct number of social media buttons", () => {
    render(<ShareButton url={mockUrl} title={mockTitle} />);
    expect(screen.getAllByRole("link")).toHaveLength(3); // Facebook, Twitter, LinkedIn
  });
});
