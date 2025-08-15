import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card text-center space-y-3">
      <h1 className="text-2xl font-bold">404</h1>
      <p>Page not found.</p>
      <Link className="btn" to="/">Back home</Link>
    </div>
  );
}
