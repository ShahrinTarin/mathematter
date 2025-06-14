import { NavLink } from 'react-router';
import styled from 'styled-components';
const WishlistCard = ({ wishlist, handleDelete, isDeleting }) => {

  return (
    <div>
      <StyledWrapper>
        <div className="card">
          <img className="image" src={wishlist.image} alt="" />
          <div className="content">
              <div  className="title flex justify-between">
                <span>
                {wishlist.title}
              </span>
              <p className='badge badge-accent badge-outline'>{wishlist.category}</p>
              </div>
            <p className="desc">
              {wishlist.short_description}
            </p>
            <div className='flex flex-wrap gap-5'>
              <NavLink to={`/blogdetails/${wishlist?.blogId}`} className="action relative rounded px-4 py-2 overflow-hidden group bg-[#1b9c8496] hover:bg-gradient-to-r hover:from-[#1b9c8444] hover:to-green-400 text-gray-700 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Blog Details</span>
              </NavLink>
              <button
                onClick={() => handleDelete(wishlist._id)}
                className={`
                                    action relative rounded px-4 py-2 overflow-hidden group
                                    ${isDeleting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#1b9c842a] hover:bg-gradient-to-r hover:from-[#1b9c8444] hover:to-green-400 text-gray-700 hover:ring-2 hover:ring-offset-2 hover:ring-green-400'
                  }
                                    transition-all ease-out duration-300
                                `}
                disabled={isDeleting}
              >
                <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">
                  {isDeleting ? 'Removing...' : 'Remove Wishlist'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid transparent;
  }

  .card a {
    text-decoration: none
  }

  .content {
    padding: 1.1rem;
  }

  .image {
    object-fit: cover;
    width: 100%;
    height: 150px;
    background-color: rgb(239, 205, 255);
  }

  .title {
    color: #111827;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
  }

  .desc {
    margin-top: 0.5rem;
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .action {
    display: inline-flex;
    margin-top: 1rem;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    align-items: center;
    gap: 0.25rem;
    background-color: #1b9c85;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .action span {
    transition: .3s ease;
  }

  .action:hover span {
    transform: translateX(4px);
  }`;
export default WishlistCard;