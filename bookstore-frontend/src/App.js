// Main Component for the Application

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State Management
  const [stores, setStores] = useState([]);
  const [books, setBooks] = useState({});
  const [flags, setFlags] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderStars = (rating) => {
    // Generate a visual representation of a 5-star rating system
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return (
      <span className="stars" aria-label={`${rating} out of 5`}>
        {filledStars}
        {emptyStars}
      </span>
    );
  };

  // Fetch data from API & process it to populate state w/ bookstore, book, & author details
  useEffect(() => {
    axios
      .get("http://localhost:3000/stores")
      .then((response) => {
        setStores(response.data.data);

        const includedBooks = response.data.included.filter(
          (item) => item.type === "books"
        );
        const includedAuthors = response.data.included.filter(
          (item) => item.type === "authors"
        );

        const bookMap = includedBooks.reduce((map, book) => {
          const authorId = book.relationships?.author?.data?.id;
          const authorDetails = includedAuthors.find(
            (author) => author.id === authorId
          );

          map[book.id] = {
            ...book.attributes,
            author: authorDetails?.attributes?.fullName || "Unknown Author",
          };
          return map;
        }, {});
        setBooks(bookMap);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
        setError("Failed to fetch store data. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Fetch country flags from API & map them to their corresponding country codes
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const flagMap = response.data.reduce((map, country) => {
          if (country.cca2) {
            map[country.cca2.toUpperCase()] = country.flags.png;
          }
          return map;
        }, {});
        setFlags(flagMap);
      })
      .catch((error) => {
        console.error("Error fetching country flags:", error);
        setError(
          "Failed to fetch country flags. Flags may not display correctly."
        );
      });
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error)
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  // Render the UI based on the fetched data
  return (
    <div>
      <header>Bookstore App</header>
      <ul>
        {stores.map((store) => {
          const { name, website, rating, establishmentDate, storeImage } =
            store.attributes || {};
          const booksData = store.relationships.books?.data || [];
          const countryId = store.relationships.countries?.data?.id;
          const countryIdToAlpha2 = { 1: "AU", 2: "HR", 3: "CH" };
          const countryCode = countryIdToAlpha2[countryId] || countryId;
          const flagUrl = countryCode ? flags[countryCode] : null;

          const formattedDate = establishmentDate
            ? new Date(establishmentDate).toLocaleDateString("en-GB")
            : "Date not available";

          const topBooks = booksData.slice(0, 2);

          return (
            <li key={store.id} className="store-container">
              <div className="store-header">
                <img
                  src={storeImage || "https://via.placeholder.com/100"}
                  alt={`${name || "Unnamed Store"} logo`}
                  className="store-image"
                />
                <div>
                  <h2>
                    {name || "Unnamed Store"}
                    {flagUrl && (
                      <img
                        src={flagUrl}
                        alt={`${countryCode} flag`}
                        className="flag-icon"
                      />
                    )}
                  </h2>
                  <p>{renderStars(rating || 0)}</p>
                </div>
              </div>
              <h3>Best-Selling Books</h3>
              {topBooks.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topBooks.map((book) => {
                      const bookDetails = books[book.id];
                      return (
                        <tr key={book.id}>
                          <td>{bookDetails?.name || "Unknown Book"}</td>
                          <td>{bookDetails?.author || "Unknown Author"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p>No data available</p>
              )}
              <div className="store-footer">
                <div className="footer-left">
                  <span>{formattedDate}</span>
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website || "Website not available"}
                  </a>
                </div>
                <div className="footer-right">
                  <img
                    src="/email-icon.png"
                    alt="Email Icon"
                    className="email-icon"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <footer>© 2024 Bookstore App. All rights reserved.</footer>
    </div>
  );
}

export default App;
