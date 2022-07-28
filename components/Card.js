import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { HeartIcon } from "@heroicons/react/solid";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice';

const Card = ({
  id = "",
  image = "",
  title = "",
  price = 0,
  favorite = false,
  onClickFavorite = () => null,
  dispatch = useDispatch(),
}) => (
    <a className="block w-full p-5">
      <div className="w-full shadow-xl card card-compact bg-neutral">
        <div className="relative overflow-hidden rounded-lg shadow bg-photo aspect-video">
          {image ? (
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transition hover:opacity-80"
            />
          ) : null}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (typeof onClickFavorite === "function") {
                onClickFavorite(id);
              }
            }}
            className="absolute top-2 right-2"
          >
            <HeartIcon
              className={`w-7 h-7 drop-shadow-lg transition ${
                favorite ? "text-rose-500" : "text-white"
              }`}
            />
          </button>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            <div className="inline-flex justify-center w-full mt-2 space-x-4">
              <span className="font-semibold text-accent">
                {title ?? ""}
              </span>
            </div>
          </h2>
          <p>
          <h2 className="card-title">
          <div className="inline-flex justify-center w-full mt-2 space-x-4">
            <div>
              <span className="text-accent">Desde</span>
            </div>
            <span className="shrink-0 text-secondary">
              <span className="text-white-500">$</span>
                {new Intl.NumberFormat("de-DE", {
                  maximumFractionDigits: 0,
                  style: "decimal",
                  currency: "USD",
                }).format(price ?? 0)}{" "}
                <span className="text-white-500">CLP</span>
              </span>
            </div>
          </h2>
            <div className="justify-center pt-2 card-actions">
            </div>
          </p>
        </div>
        <div className="justify-center p-6 card-actions">
          <button onClick={() => dispatch(addToCart(title))} className="btn btn-info">Añadir al carrito</button>
        </div>
      </div>
    </a>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  favorite: PropTypes.bool,
  onClickFavorite: PropTypes.func,
};

export default Card;
