// ItemList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard"; // Ensure the path is correct
import { api } from "../config"; // Ensure the path is correct

export default function ItemList() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${api}/item`);
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          id={item._id}
          title={item.title}
          description={item.description}
          image={item.image}
          refreshItems={fetchItems} // Pass the fetch function to refresh after deletion
        />
      ))}
    </div>
  );
}
