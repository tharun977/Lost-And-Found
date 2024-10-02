import { useState, useEffect } from "react";
import { api } from "../config";
import noImage from "../assets/no-image.png";
import axios from "axios";

export default function ItemCard(props) {
  const [image, setImage] = useState(noImage);

  useEffect(() => {
    axios
      .get(`${api}/files/${props.image}`)
      .then((res) => {
        setImage(`${api}/files/${props.image}`);
      })
      .catch((error) => {
        setImage(noImage);
      });
  }, [props.image]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${api}/item/${props.id}`);
      console.log("Delete response:", response);
      if (response.status === 200) {
        props.onDelete(props.id); // Call the parent function to remove the item from the state
        alert("Item deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <a href={"/find/details/" + props.id} data-aos="fade-up">
      <div className="card">
        <div className="card-img">
          <img src={image} alt="" />
        </div>
        <div className="card-desc">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <button onClick={handleDelete}>Delete</button> {/* Add delete button */}
      </div>
    </a>
  );
}
