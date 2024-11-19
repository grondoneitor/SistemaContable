export const fetchCategoriaPorId = async (id) => {
  if (!id) return null;
  const response = await fetch(`http://localhost:8092/api/v1/categoria/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching category! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.object;
};