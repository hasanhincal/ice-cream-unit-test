import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

//* seçiciler

// 1-Method tipi | 2-All ifadesi | 3-Seçici method

/**
 
   * get > başlangıçta dom'da olan elementleri almak için kullanılır.
   elementi bulamassa test başarısız olur.
 
   * query > elementin ekranda bulunma durumu kesin değilse kullanılır.
   get ile benzer çalışır.Element bulunmassa test null döndürür test devam eder.

   * find > elementin ne zaman ekrana basılacağı belli değilse (API isteklerinde kullanılır.)
   * not: find methodu promise döndürdüğünden async await ile kullanılmalıdır.
   
   * eğer methoda all ifadesi eklersek seçici koşuluna uyan bütün elemanları getirir.
   * not: All kullanılırsa dönen cevap her zaman dizi olur.

   */

it("API'dan alınan veriler için ekrama kartlar basılır.", async () => {
  render(<Scoops />);

  // ekrana abasılan kartları al
  const images = await screen.findAllByAltText("çeşit-resim");

  // ekrandaki kartların (resimlerin) sayısı 1'den fazla mı?
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Çeşitlerin ekleme ve azaltma özelliklerinin toplm fiyata etkisi", async () => {
  //userEvent'in kurulumunu yap
  const user = userEvent.setup();

  render(<Scoops />);

  // bütün ekleme ve azaltma butonlarını çağır
  const addBtn = await screen.findAllByRole("button", { name: "Ekle" });
  const delBtn = await screen.findAllByRole("button", { name: "Azalt" });

  // toplam fiyat elementini çağır
  const total = screen.getByTestId("total");

  // toplam fiyat sıfır mı kontrol et?
  // metin 0 'a eşitmi diye  kontrol eder >> 100 olsa hata verir.
  expect(total.textContent).toBe("0");

  // chocalete'ın ekle butonuna tıkla
  await user.click(addBtn[2]);

  // toplam fiyat 20 mi kontrol et?
  expect(total.textContent).toBe("20");
  // vanillanın ekle butonuna 2 kez tıkla
  await user.dblClick(addBtn[1]);

  // toplam fiyat 60 mı kontrol et
  expect(total.textContent).toBe("60");

  // vanillanın azalt butonuna tıkla
  await user.click(delBtn[1]);

  // toplam fiyat 40 mı kontrol et.
  expect(total.textContent).toBe("40");

  // vanillanın azalt butonuna tıkla
  await user.click(delBtn[1]);

  // vanillanın azalt butonuna tıkla
  await user.click(delBtn[1]);

  // toplam fiyat 20 mi kontrol et
  expect(total.textContent).toBe("20");

  // chocalete'ın azalt butonuna tıkla
  await user.click(delBtn[2]);

  // toplam fiyat 0 mı kontrol et
  expect(total.textContent).toBe("0");
});
