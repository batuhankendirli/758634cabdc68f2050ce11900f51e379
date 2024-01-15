import { IoIosHeart } from 'react-icons/io';
import { Sidebar } from 'primereact/sidebar';
import { useContext, useState } from 'react';
import { Context } from '../Context';
import Modal from './Modal';
import Button from './Button';
import { IoTrash } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Favourites = () => {
  const [favsVisible, setFavsVisible] = useState(false);
  const { favourites, products, setFavourites } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(favourites[0]);

  const favoriteProducts = products.filter((product) =>
    favourites.includes(product.id)
  );

  const handleRemoveFavs = () => {
    setFavourites([]);
    setFavsVisible(false);
    toast.success(
      'Your favorited items have been cleared. Start adding new favorites!',
      {
        autoClose: 5000,
        toastId: 'delete_favs',
      }
    );
  };

  const handleProductClick = (id: number) => {
    setFavsVisible(false);
    setSelectedProduct(id);

    setShowModal(true);
  };

  const handleUnFavourite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: number
  ) => {
    event.stopPropagation();
    setFavourites((prevFavourites) => {
      return prevFavourites.filter((fav) => fav !== productId);
    });
    toast.success('An item has been removed from your favorites.', {
      autoClose: 3000,
      toastId: 'delete_one_fav',
    });
  };

  return (
    <div className="favourites">
      <button className="favourites__btn" onClick={() => setFavsVisible(true)}>
        <IoIosHeart className="favourites__btn-icon" />
      </button>

      <Modal
        isVisible={showModal}
        onHide={() => setShowModal(false)}
        productID={selectedProduct}
      />

      <Sidebar
        visible={favsVisible}
        header="Favourites"
        onHide={() => setFavsVisible(false)}
        position="right"
        className="favourites__sidebar"
        pt={{
          content: {
            className: 'favourites__sidebar-products',
          },
          header: {
            className: 'favourites__sidebar-header',
          },
          closeIcon: {
            className: 'modal__header-icon-close',
          },
        }}
        blockScroll
      >
        {favoriteProducts.length > 0 ? (
          <>
            {favoriteProducts.map((product, index) => (
              <div
                key={product.id}
                className={`favourites__sidebar-products-item ${
                  index % 2 === 0 ? 'even' : ''
                }`}
                onClick={() => handleProductClick(product.id)}
              >
                <div className="favourites__sidebar-products-item-img">
                  <img
                    src={product.image.src}
                    alt={`Photo of ${product.title}`}
                    className="favourites__sidebar-products-item-img-src"
                  />
                </div>
                <div className="favourites__sidebar-products-item-details">
                  <div className="favourites__sidebar-products-item-details-left">
                    <p className="favourites__sidebar-products-item-details-left-title">
                      {product.title}
                    </p>
                    <p className="favourites__sidebar-products-item-details-left-price">
                      ${product.variants[0].price}
                    </p>
                  </div>
                  <Button
                    heart
                    onClick={(e) => handleUnFavourite(e, product.id)}
                  >
                    <IoIosHeart className="button-heart-icon" color="#f26c6b" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              danger
              className="favourites__sidebar-products-btn"
              onClick={handleRemoveFavs}
            >
              Remove All
              <IoTrash className="button-danger-icon" />
            </Button>
          </>
        ) : (
          <div className="favourites__sidebar-empty">
            <p className="favourites__sidebar-empty-message">
              🌟 Elevate your shopping experience! Save your favorite items to
              your collection and enjoy quick access to the products you love.
              Click that heart icon now to build your personalized wishlist.
              Happy shopping! 🛍️✨
            </p>
          </div>
        )}
      </Sidebar>
    </div>
  );
};

export default Favourites;
