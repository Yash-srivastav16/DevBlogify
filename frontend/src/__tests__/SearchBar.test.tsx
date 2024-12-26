import React, { useState } from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar"; 

const MockSearchBar = ({ availableTags }: { availableTags: string[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      availableTags={availableTags}
    />
  );
};

describe("SearchBar Component", () => {
  afterEach(cleanup);

  const availableTags = ["React", "JavaScript", "Node.js", "MERN Stack", "Web Development"];

  test("should render the search bar with placeholder text", () => {
    render(<MockSearchBar availableTags={availableTags} />);

    const searchInput = screen.getByPlaceholderText("Search blogs by title or tags...");
    expect(searchInput).toBeInTheDocument();
  });

  test("should display available tags in the autocomplete dropdown", async () => {
    render(<MockSearchBar availableTags={availableTags} />);

    const searchInput = screen.getByPlaceholderText("Search blogs by title or tags...");
    userEvent.type(searchInput, "React");

    await waitFor(() => screen.findByText("React"));

    const tagOption = screen.getByText("React");
    expect(tagOption).toBeInTheDocument();
  });

  test("should update the search query when the user types", async () => {
    render(<MockSearchBar availableTags={availableTags} />);
    const searchInput = screen.getByPlaceholderText("Search blogs by title or tags...");
    //Sdds a slight delay between each keystroke. This can help avoid the Autocomplete component and React's state update lag.
    await userEvent.type(searchInput, "Node.js", { delay: 100 });
    await waitFor(() => expect(searchInput).toHaveValue("Node.js"));
  });

  test("should call setSearchQuery when input changes", async () => {
    const mockSetSearchQuery = jest.fn();
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} availableTags={availableTags} />);

    const searchInput = screen.getByPlaceholderText("Search blogs by title or tags...");
    await userEvent.type(searchInput, "JavaScript", { delay: 100 });
    await waitFor(() => expect(mockSetSearchQuery).toHaveBeenCalledWith("JavaScript"));
  });

  test("should display the correct title", () => {
    render(<MockSearchBar availableTags={availableTags} />);
    const title = screen.getByText("Discover Your Favorite Blogs");
    expect(title).toBeInTheDocument();
  });
});
