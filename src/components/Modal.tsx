import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import { Context } from '../Context';
import { Galleria } from 'primereact/galleria';
import { Product, ProductImage } from '../types/ProductTypes';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { ModalProps } from '../types/OtherTypes';
import Button from './Button';
import { toast } from 'react-toastify';

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
        toast.success('An item has been removed from your favorites.', {
          autoClose: 3000,
          toastId: 'delete_one_fav',
        });
        return prevFavourites.filter((fav) => fav !== productID);
      } else {
        toast.success('An item has been added to your favorites.', {
          autoClose: 3000,
          toastId: 'add_one_fav',
        });
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
            <Button heart onClick={(e) => handleFavourite(e)}>
              {isFavourited ? (
                <IoIosHeart className="button-heart-icon" color="#f26c6b" />
              ) : (
                <IoIosHeartEmpty className="button-heart-icon" />
              )}
            </Button>
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
              <Button
                key={variant.id}
                primary
                mid
                selected={variant.id === choosedVariant}
                onClick={() => handleVariantChoose(variant.id)}
              >
                {variant.title}
              </Button>
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
