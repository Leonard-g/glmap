import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const { data } = await axios.get("/api/products/" + id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (router.query?.id) {
      fetchProduct(router.query.id);
    }
    console.log("called");
  }, [router.query.id]);

  const handleChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query?.id) {
        await axios.put("/api/products/" + router.query.id, {
          name: product.name,
          description: product.description,
          price: product.price,
        });
        toast.success("Guardar", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/products", product);
        toast.success("Datos guardados", {
          position: "bottom-center",
        });
      }

      router.push("/products");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="name"
          >
            Medidor:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="price"
            placeholder="No. Medidor"
            onChange={handleChange}
            value={product.price}
          />
        </div>

        <div className="mb-4 max-w-md">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-2 dark:text-gray-200"
          >
            Coordenadas:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="Ejemplo: 37.7749,-122.4194"
            id="name"
            name="name"
            onChange={handleChange}
            value={product.name}
            autoComplete="off"
            
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Referencia: 
          </label>
          <textarea
            name="description"
            id="description"
            rows="2"
            placeholder="(Opcional)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            onChange={handleChange}
            value={product.description}
          ></textarea>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {router.query?.id ? "Datos actualizados" : "Datos guardados"}
        </button>
      </form>
    </div>
  );
}
