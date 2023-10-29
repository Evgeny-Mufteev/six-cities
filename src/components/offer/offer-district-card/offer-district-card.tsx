import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/routes';
import { OfferType } from '../../../types/offer-preview';

type OfferDistrictCardProps = {
  offer: OfferType;
};

export const OfferDistrictCard = ({ offer }: OfferDistrictCardProps): JSX.Element => (
  <article className="near-places__card place-card">
    {offer.isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className="near-places__image-wrapper place-card__image-wrapper">
      <Link to={`${AppRoute.Offer}/${offer.id}`}>
        <img
          className="place-card__image"
          src={offer.previewImage}
          width={260}
          height={200}
          alt="Place image"
        />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{offer.price}</b>
          <span className="place-card__price-text">/&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
          type="button"
        >
          <svg
            className="place-card__bookmark-icon"
            width={18}
            height={19}
          >
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      {offer.rating && (
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
      )}
      <h2 className="place-card__name">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          {offer.title}
        </Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);