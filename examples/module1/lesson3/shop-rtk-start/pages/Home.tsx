import useCartService from '../services/useCartService';
import useProductsService from '../services/useProductsService';

import Product from '../components/Product';

const Home = () => {
  const { add } = useCartService();
  const { data, isLoading, error } = useProductsService();

  if (isLoading) {
    return (
      <div className="flex h-[100vh] justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[100vh] justify-center items-center">Error</div>
    );
  }

  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {data.map((product) => {
              return (
                <Product product={product} onAddToCart={add} key={product.id} />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
