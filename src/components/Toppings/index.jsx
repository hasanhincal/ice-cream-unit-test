import axios from "axios";
import React, { useEffect, useState } from "react";

const Toppings = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/toppings")
      .then((res) => setData(res.data));
  }, []);

  const handleChange = (isChecked, item) => {
    isChecked
      ? setBasket([...basket, item])
      : setBasket(basket.filter((i) => i.name !== item.name));
  };

  return (
    <div>
      <h1>Sos Çeşitleri</h1>
      <p>
        Tanesi <span className="text-success">3</span>₺
      </p>
      <h3>
        Soslar Ücreti{" "}
        <span data-testid="total" className="text-success">
          {basket.length * 3}
        </span>
        ₺
      </h3>

      <div className="row mt-4 gap-3 p-3">
        {data.map((item) => (
          <div key={item.id} className="top-card col">
            <label htmlFor={item.name}>
              <img src={item.imagePath} height={100} />
              <p className="text-center text-nowrap">{item.name}</p>
            </label>
            <input
              onChange={(e) => handleChange(e.target.checked, item)}
              type="checkbox"
              id={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;
