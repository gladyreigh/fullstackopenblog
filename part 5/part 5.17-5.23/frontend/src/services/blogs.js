import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const update = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid ID format');
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid ID format');
    }

    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (error) {
    console.error('Error deleting blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const like = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid ID format');
    }

    const response = await axios.put(`${baseUrl}/${id}/like`, null, config);
    return response.data;
  } catch (error) {
    console.error('Error liking blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Helper function to check if an ID is a valid ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export default { getAll, create, update, remove, like, setToken };
