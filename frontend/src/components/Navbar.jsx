import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white font-bold">Events App</Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-blue-300">Home</Link>
          </li>
          <li>
            <Link to="/users-page" className="text-white hover:text-blue-300">SignUp</Link>
          </li>
         
        </ul>
      </div>
    </nav>
  );
}
