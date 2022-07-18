import PropTypes from "prop-types";
import Card from "@/components/Card";
import { ExclamationIcon } from "@heroicons/react/outline";

const Grid = ({ products = [] }) => {
  const isEmpty = products.length === 0;

  const toggleFavorite = async (id) => {
    // TODO: Add/remove product from the authenticated user's favorites
  };

  return isEmpty ? (
    <p className="inline-flex items-center px-4 py-2 space-x-1 text-purple-700 rounded-md bg-amber-100 max-w-max">
      <ExclamationIcon className="w-5 h-5 mt-px shrink-0" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} {...product} onClickFavorite={toggleFavorite} />
      ))}
    </div>
  );
};

Grid.propTypes = {
  products: PropTypes.array,
};

export default Grid;
