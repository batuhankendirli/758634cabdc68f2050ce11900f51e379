import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import { Context } from '../Context';
import { Galleria } from 'primereact/galleria';
import { Product, ProductImage } from '../types/ProductTypes';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

interface ModalProps {
  isVisible: boolean;
  onHide: () => void;
  productID: number;
}

const Modal = ({ isVisible, onHide, productID }: ModalProps) => {
  const { products, favourites, setFavourites } = useContext(Context);
  const product = products.find((item) => item.id === productID) as Product;
  const [choosedVariant, setChoosedVariant] = useState(
    product?.variants[0].id || 0
  );

  const isFavourited = favourites.includes(productID);
  const images = product?.images.map((image) => image);

  const itemTemplate = (item: ProductImage) => {
    return (
      <img
        src={item.src}
        alt={item.alt || `Image of ${product?.title}`}
        className="modal__content-gallery-img"
      />
    );
  };

  const thumbnailTemplate = (item: ProductImage) => {
    return (
      <img
        src={item.src}
        alt={item.alt || `Image of ${product?.title}`}
        className="modal__content-gallery-thumbnail-img"
      />
    );
  };

  const handleVariantChoose = (id: number) => {
    setChoosedVariant(id);
  };

  const handleFavourite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setFavourites((prevFavourites) => {
      if (isFavourited) {
        return prevFavourites.filter((fav) => fav !== productID);
      } else {
        return [...prevFavourites, productID];
      }
    });
  };

  return (
    <Dialog
      header={product?.title}
      visible={isVisible}
      onHide={onHide}
      dismissableMask
      draggable={false}
      className="modal"
      blockScroll
      headerClassName="modal__header"
      pt={{
        headerTitle: {
          className: 'modal__header-title',
        },
        closeButtonIcon: {
          className: 'modal__header-icon-close',
        },
        closeButton: {
          className: 'modal__header-btn-close',
        },
        maximizableIcon: {
          className: 'modal__header-icon-maximize',
        },
      }}
    >
      <div className="modal__content">
        <Galleria
          value={images}
          numVisible={10}
          circular
          showItemNavigators={images?.length > 1}
          item={itemTemplate}
          showThumbnails={images?.length > 1}
          thumbnail={thumbnailTemplate}
          showThumbnailNavigators={false}
          pt={{
            previousItemButton: {
              className: 'modal__content-gallery-img-prev',
            },
            nextItemButton: {
              className: 'modal__content-gallery-img-next',
            },
            item: {
              className: 'modal__content-gallery-item',
            },
            itemContainer: {
              className: 'modal__content-gallery-container',
            },
            thumbnailItems: {
              className: 'modal__content-gallery-thumbnail-items',
            },
            thumbnailItem: {
              className: 'modal__content-gallery-thumbnail-items-item',
            },
            thumbnailWrapper: {
              className: 'modal__content-gallery-thumbnail-wrapper',
            },
            thumbnailItemsContainer: {
              className: 'modal__content-gallery-thumbnail-items-container',
            },
          }}
        />
        <div className="modal__content-right">
          <div className="modal__content-right-title">
            <h1 className="modal__content-right-title-text">
              {product?.title} -{' '}
              <span className="modal__content-right-title-text-vendor">
                {product?.vendor}
              </span>
            </h1>
            <button
              className="modal__content-right-title-btn product__top-wrapper-btn"
              onClick={(e) => handleFavourite(e)}
            >
              {isFavourited ? (
                <IoIosHeart
                  className="product__top-wrapper-btn-icon"
                  color="#f26c6b"
                />
              ) : (
                <IoIosHeartEmpty className="product__top-wrapper-btn-icon" />
              )}
            </button>
          </div>

          <hr />

          <p className="modal__content-right-p">
            <strong>Product Type: </strong>
            {product?.product_type}
          </p>
          <p className="modal__content-right-p">
            <strong>Price: </strong>$
            {
              product?.variants.find((variant) => variant.id === choosedVariant)
                ?.price
            }
          </p>
          <p className="modal__content-right-p">
            <strong>Weight: </strong>
            {product?.variants
              .find((variant) => variant.id === choosedVariant)
              ?.weight.toFixed(0)}
            {
              product?.variants.find((variant) => variant.id === choosedVariant)
                ?.weight_unit
            }
          </p>
          <div className="modal__content-right-variants">
            <p className="modal__content-right-p">
              <strong>
                {product?.variants.length > 1 ? 'Variants' : 'Variant'}:{' '}
              </strong>
            </p>
            {product?.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantChoose(variant.id)}
                className={`modal__content-right-variants-btn ${
                  variant.id === choosedVariant ? 'selected' : ''
                }`}
              >
                {variant.title}
              </button>
            ))}
          </div>
          <hr />
          <h2 className="modal__content-right-heading">About</h2>
          <p
            className="modal__content-right-description"
            dangerouslySetInnerHTML={{ __html: product?.body_html }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
