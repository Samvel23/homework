import { gql, useMutation, useQuery } from "@apollo/client";
import "./App.css";
import { useState } from "react";

const GET_BOOKS = gql`
  {
    books {
      id
      title
      price
      author {
        name
      }
    }
  }
`;

const ADD_BOOK_MUT = gql`
  mutation AddBook($title: String!, $price: Float!, $authorName: String!) {
    addBook(title: $title, price: $price, authorName: $authorName) {
      id
      title
      price
      author {
        name
      }
    }
  }
`;

function App() {
  const { loading, data, error, refetch } = useQuery(GET_BOOKS);
  const [open, setOpen] = useState(false);
  const [addBook] = useMutation(ADD_BOOK_MUT, {
    onCompleted: () => refetch(),
  });

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "authorName":
        setAuthorName(value);
        break;
      default:
        throw new Error(`Unknown field name: ${name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({
      variables: {
        title,
        price: parseFloat(price),
        authorName,
      },
    }).then(() => {
      setTitle("");
      setPrice("");
      setAuthorName("");
      setOpen(false);
    });
  };

  return (
    <>
      <h1>Books List</h1>
      <button onClick={() => setOpen(!open)}>Add Book by Author</button>

      {open && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <input
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            name="authorName"
            value={authorName}
            onChange={handleChange}
            placeholder="Author Name"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error?.message}</p>}

      {data &&
        data.books.map((book) => (
          <div key={book.id}>
            <p>
              {book.title} <strong>{book.price} USD</strong>
              <br />
              <small>ID - {book.id}</small>
            </p>
            <small>By {book?.author?.name}</small>
          </div>
        ))}
    </>
  );
}

export default App;
