import { type Position } from 'geojson';
import { useContext } from 'react';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';
import LazyImage from 'shared/lib/LazyImage/LazyImage';
import { type PlaceProperties } from 'shared/types';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import instagram from '../../../shared/assets/instagram.svg';
import roteToImage from '../../../shared/assets/route-to.svg';
import showPlacePointOnMap from '../../../shared/assets/show-on-map.svg';
import cls from './PlaceCard.module.scss';

interface PlaceCardProps {
  properties: PlaceProperties;
  coordinates: Position;
}

export const PlaceCard = ({ properties, coordinates }: PlaceCardProps) => {
  const { id, averageRating } = properties;
  const { setCurrentSelectedPlaceId } = useDetailedCard();

  const { setLocation } = useContext(LocationContext);
  // toglle favorite

  // interface FavoriteActionResult {
  //   success: boolean;
  //   message: string | null;
  //   requiresAuth: boolean;
  //   place: PlaceResponse | null;
  // }§

  // interface ToggleFavoriteMutationData {
  //   toggleFavorite: FavoriteActionResult;
  // }

  // interface ToggleFavoriteMutationVariables {
  //   placeId: string;
  // }

  // const [toggleFavorite, { loading }] = useMutation<ToggleFavoriteMutationData, ToggleFavoriteMutationVariables>(
  //   TOGGLE_FAVORITE,
  //   {
  //     onCompleted: (data) => {
  //       // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  //       if (data?.toggleFavorite) {
  //         if (data.toggleFavorite.requiresAuth) {
  //           alert(data.toggleFavorite.message ?? 'Authentication required');
  //         } else if (!data.toggleFavorite.success) {
  //           console.error('Failed to toggle favorite:', data.toggleFavorite.message);
  //         }
  //       }
  //     },
  //     onError: (error) => {
  //       console.error('Error toggling favorite:', error);
  //     },
  //   },
  // );

  // const handleToggle = async () => {
  //   await toggleFavorite({
  //     variables: { placeId: id },
  //     update: (cache, { data }) => {
  //       if (data?.toggleFavorite.success && data.toggleFavorite.place) {
  //         cache.modify({
  //           id: cache.identify({ __typename: 'Place', id }),
  //           fields: {
  //             isFavorite: () => data.toggleFavorite.place!.isFavorite,
  //             favoriteCount: () => data.toggleFavorite.place!.favoriteCount,
  //           },
  //         });
  //       }
  //     },
  //   });
  // };

  // toglle favorite

  /// /////test

  return (
    <>
      <div
        onClick={() => {
          setCurrentSelectedPlaceId(id);
        }}
        className={`${cls.placeCard} `}
      >
        <div className={cls.image}>
          <LazyImage src={`./places-images/${properties.image || 'default-place.jpg'}`} alt="Place image" />
        </div>
        <div className={cls.content}>
          <div className={cls.cardHeader}>
            <h4
              onClick={() => {
                setCurrentSelectedPlaceId(id);
              }}
              className={cls.name}
            >
              {properties.name}
            </h4>
            <div className={cls.iconsGroup}>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={'https://www.instagram.com/' + properties.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <img className={cls.icon} src={instagram} alt="" />
              </a>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}&travelmode=walking`}
                target="_blank"
                rel="noreferrer"
              >
                <img className={cls.icon} src={roteToImage} alt="" />
              </a>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (coordinates && setLocation) {
                    setLocation(coordinates);
                  }
                }}
                rel="noreferrer"
              >
                <img className={cls.icon} src={showPlacePointOnMap} alt="" />
              </a>
            </div>
          </div>
          <div className={cls.rating}>
            <RatingWidget isClickable={false} rating={averageRating} id={id} />{' '}
            {Boolean(averageRating) && averageRating}
          </div>
          <div className={cls.description}>{properties.description}</div>
          <div className={cls.address}>{properties.address}</div>
        </div>
      </div>
    </>
  );
};
