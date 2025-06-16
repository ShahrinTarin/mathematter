import { NavLink } from 'react-router'
import styled from 'styled-components';

const WishlistCard = ({ wishlist, handleDelete, isDeleting }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <img className="image" src={wishlist.image} alt={wishlist.title} />
        <div className="content">
          <div className="title-section">
            <h3 className="title">{wishlist.title}</h3>
            <span className="category-badge">{wishlist.category}</span>
          </div>
          <p className="desc">{wishlist.short_description}</p>
          <div className='actions'>
            <NavLink 
              to={`/blogdetails/${wishlist.blogId}`} 
              className="blog-details-btn"
            >
              <span className="hover-effect"></span>
              <span>Blog Details</span>
            </NavLink>
            <button
              onClick={() => handleDelete(wishlist._id)}
              disabled={isDeleting}
              className={`remove-btn ${isDeleting ? 'disabled' : ''}`}
            >
              {isDeleting ? 'Removing...' : 'Remove Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      
      .image {
        transform: scale(1.03);
      }
      
      .category-badge {
        background-color: #1b9c85;
        color: white;
      }
    }
  }

  .image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .content {
    padding: 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .title-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  .title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
    flex-grow: 1;
  }

  .category-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: rgba(27, 156, 132, 0.1);
    color: #1b9c85;
    border: 1px solid rgba(27, 156, 132, 0.2);
    transition: all 0.3s ease;
    margin-left: 0.5rem;
  }

  .desc {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    flex-grow: 1;
    margin-bottom: 1.25rem;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    margin-top: auto;
  }

  /* Blog Details Button with Gradient Hover */
  .blog-details-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
    background-color: rgba(27, 156, 132, 0.6); /* #1b9c8496 */
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    flex-grow: 1;
    text-decoration: none;
    
    &:hover {
      background: linear-gradient(
        to right,
        rgba(27, 156, 132, 0.3), /* #1b9c8444 */
        rgba(74, 222, 128, 0.8)  /* green-400 */
      );
      box-shadow: 0 0 0 2px rgba(27, 156, 132, 0.2);
    }
  }

  /* Remove Button (original style) */
  .remove-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: rgba(27, 156, 132, 0.1);
    color: #1b9c85;
    border: 1px solid rgba(27, 156, 132, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
    flex-grow: 1;
    
    &:hover:not(.disabled) {
      background-color: rgba(27, 156, 132, 0.2);
      border-color: rgba(27, 156, 132, 0.3);
    }
    
    &.disabled {
      background-color: #e5e7eb;
      color: #9ca3af;
      border-color: #d1d5db;
      cursor: not-allowed;
    }
  }

  /* Hover effect for blog details button */
  .hover-effect {
    position: absolute;
    right: 0;
    top: 50%;
    width: 20px;
    height: 20px;
    background: white;
    opacity: 0.1;
    transform: translate(12px, -50%) rotate(12deg);
    transition: all 0.3s ease;
  }

  .blog-details-btn:hover .hover-effect {
    transform: translate(-40px, -50%) rotate(12deg);
  }
`;

export default WishlistCard;