import { fireEvent, render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
  name: "Salted caramel",
  imagePath: "/images/salted-caramel.png",
  id: "6b92",
};

test("Miktar ,Başlık ve Fotoğraf gelen proba göre ekrana basılır", () => {
  render(
    <Card
      item={item}
      amount={3}
      addToBasket={() => {}}
      removeFromBasket={() => {}}
    />
  );

  // 1- miktar spanını çağırw
  const amount = screen.getByTestId("amount");

  // 2- miktar içeriği 3 mü kontrol et
  expect(amount.textContent).toBe("3");

  // * getBy elementi bulamassa hata fırlatır bu yüzden sadece "x"
  // * yazı içeriğine sahip eleman ekranda vermı kontrolünü yapmak
  // * istiyorsak getByText ile çağırmak yeterlidir.
  // *  Daha sonrasında expect kullanmaya bile gerek kalmaz.
  // 3- "Salted caramel" yazısı ekrana geldimi kontrol et
  screen.getByText("Salted caramel");

  // 4- resim elementini çağır
  const image = screen.getByAltText("çeşit-resim");

  // 5- resmin kaynağı doğrumu kontrol et
  expect(image).toHaveAttribute("src", item.imagePath);
});

// ekle azalt butonlarında çalışacak fonksiyonların testleri
test("Butonlara tıklanınca fonksiyonlar doğru parametreler ile çalışır", async () => {
  const user = userEvent.setup();

  // Scoops bileşeninden gönderilen orijinal fonksiyonları props
  // olarak göndermeyeceğimiz için, fonksiyonların doğru zamanda,
  //doğru parametrelerle doğru çalışıp çalışmadığını kontrol etmek
  // için ana fonksiyonu taklit eden bir sahte fonksiyon tanımlamak
  // gerekiyor.

  const addMocFn = jest.fn();
  const removeMockFn = jest.fn();

  // 1- bileşen render edilir.
  render(
    <Card
      item={item}
      amount={3}
      addToBasket={addMocFn}
      removeFromBasket={removeMockFn}
    />
  );

  // 2- ellementleri çağırma
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const removeBtn = screen.getByRole("button", { name: /azalt/i });

  // 3- ekle butonuna tıkla
  await user.click(addBtn);

  // 4- addtobasket fonksiyonuna doğru paremetre geliyormu?
  expect(addMocFn).toHaveBeenCalledWith(item);

  // azalt butonuna  tıkla
  await user.click(removeBtn);

  // removefrombasket fonksiyonu doğru paremetrelerle çalışıyormu?
  expect(removeMockFn).toHaveBeenCalledWith(item.id);
});

// azalt butonunun aktiflik testleri
describe("azaltma butonun aktiflik testleri", () => {
  test("miktar > 0 oluğunda azalt butonu aktiftir", async () => {
    // userevent kurulumu
    const user = userEvent.setup();

    // 1- bileşen render edilir
    render(<Card item={item} amount={3} />);

    // 2- elementleri çağır
    const button = screen.getByRole("button", { name: "Azalt" });

    // 3- buton aktiftir
    expect(button).toBeEnabled();
  });
  test("miktar 0 olduğunda buton inaktiftir", async () => {
    // userevent kurulumu
    const user = userEvent.setup();

    // 1- bileşen render edilir
    render(<Card item={item} amount={0} />);

    // 2- elementleri çağır
    const button = screen.getByRole("button", { name: /azalt/i });

    // 3- button inakftiftir
    expect(button).toBeDisabled();
  });
});
w;
