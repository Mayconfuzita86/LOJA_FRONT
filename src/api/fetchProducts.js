const fetchProducts = async (query) => {
  let urlApi = 'http://localhost:8080/product';

  if (query && query.trim() !== '') {
    const encodedQuery = encodeURIComponent(query);
    urlApi = `http://localhost:8080/product/search/${encodedQuery}`;
  }

  try {
    const response = await fetch(urlApi);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default fetchProducts;
