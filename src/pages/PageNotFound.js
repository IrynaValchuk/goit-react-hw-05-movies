import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="container">
      <Link className="btn" to="/">
        Go back
      </Link>
      <p className="no-page-text">Sorry, page not found</p>
      
    </div>
  );
};
export default PageNotFound;