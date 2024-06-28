import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toppings from ".";

test("Sosları ekleme ve çıkarma işleminin toplam fiyata etkisi", async () => {
  const user = await userEvent.setup();

  // 1- bileşeni renderla
  render(<Toppings />);

  // 2- bütün sos checkboxlarını al
  const toppings = await screen.findAllByRole("checkbox");

  // 3- toplam spanı al
  const total = screen.getByTestId("total");

  // 4- tüm checkboxların tiksiz olduğunu kontrol et
  toppings.forEach((i) => expect(i).not.toBeChecked());

  // 5- toplam ücret 0 mı kontrol et
  expect(total.textContent).toBe("0");

  // 6- soslardan birine tıkla
  await userEvent.click(toppings[0]);

  // 7- toplam ücret 3 mı kontrol et
  expect(total.textContent).toBe("3");

  // 8- farklı bir sos tikle
  await userEvent.click(toppings[1]);

  // 9- toplam ücret 6 mı kontrol et
  expect(total.textContent).toBe("6");

  // 10- soslardan birinin tikini kaldır
  await userEvent.click(toppings[0]);

  // 11- toplam ücret 3 mü kontrol et
  expect(total.textContent).toBe("3");

  // 12- soslardan diğerinin de tikini kaldır.
  await userEvent.click(toppings[1]);

  // 13- toplam ücret 0 mı kontrol et
  expect(total.textContent).toBe("0");

  // 14- tüm checkboxların tiksiz olduğunu kontrol et
  toppings.forEach((i) => expect(i).not.toBeChecked());
});
