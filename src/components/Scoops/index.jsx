import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card";

const Scoops = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  const total = basket.reduce((total, i) => total + i.amount * 20, 0);

  useEffect(() => {
    axios.get("http://localhost:4000/scoops").then((res) => setData(res.data));
  }, []);

  // sepete ekle
  const addToBasket = (item) => {
    // sepette bu elemandan varmı?
    const found = basket.find((i) => i.id === item.id);

    if (found) {
      // sepeti güncelle
      const updated = { ...found, amount: found.amount + 1 };

      // varsa miktarını arttır
      const temp = basket.map((i) => (i.id === found.id ? updated : i));
      // state'i güncelle
      setBasket(temp);
    } else {
      // yoksa sepete ekle
      setBasket([...basket, { ...item, amount: 1 }]);
    }
  };

  // sepetten çıkar

  const removeFromBasket = (id) => {
    // elemanı sepette bul?
    const found = basket.find((i) => i.id === id);

    if (found.amount > 1) {
      // sepeti güncelle
      const updated = { ...found, amount: found.amount - 1 };

      // varsa miktarını arttır
      const temp = basket.map((i) => (i.id === found.id ? updated : i));
      // state'i güncelle
      setBasket(temp);
    } else {
      // yoksa sepetten kaldır
      setBasket(basket.filter((i) => i.id !== id));
    }
  };

  return (
    <div>
      <h1>Dondurma Çeşitleri</h1>
      <p>
        Tanesi<span className="text-success m-1">20</span>₺
      </p>
      <h3>
        Çeşitler Ücreti
        <span data-testid="total" className="text-success  m-1">
          {total}
        </span>
        ₺
      </h3>
      <div className="row gap-5 p-3 justify-content-between mt-4">
        {data.map((i) => {
          const found = basket.find((item) => item.id === i.id);
          return (
            <Card
              key={i.id}
              item={i}
              amount={found?.amount || 0}
              addToBasket={addToBasket}
              removeFromBasket={removeFromBasket}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Scoops;
