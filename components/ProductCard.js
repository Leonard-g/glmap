import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
export function ProductCard({ product }) {
  
  const getGoogleMapsUrl = () => {
    const [latitude, longitude] = product.name.split(",");
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  };

  return (
    <div className="mb-3">
      <Link href={`/products/${product.id}`}>
        <a
          className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          key={product.id}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            coordenadas: {product.name}
          </h5>
          <p className="font-bold text-gray-800 dark:text-gray-100 text-2xl">            
            medidor: {product.price}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-200">
            referencia: {product.description}
          </p>
        </a>
      </Link>
      <a
        href={getGoogleMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-2 text-center max-w-sm bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700"
      >
        <FontAwesomeIcon icon={faMapMarkerAlt} /> 
      </a>
    </div>
  );
}
