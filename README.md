
# Tracker v2

Projenin amacı dizi, filmleri ve belkide ileride daha birçok şeyin takibini kolaylaştırmak. Normalde izlediklerimi tutmak için notion kullanıyordum ama manual olarak yapması çok zahmetli oluyordu. Buna benzer uygulamalar olsada sorunları vardı. İsteğimi karşılamaya yetmiyorlardı. Bende böyle bir uygulama geliştirmek istedim.



## Yol haritası

- Footer

- Sıkça Sorulan Sorular

- Yakın zamanda gelicekler

- Puanlama sistemi

- Listeler oluşturma

- Yorum yapma

- Blog

- Ödeme sistemi(supabase, stripe)

- Arkadaşlarla real time chat

- Bildirim sistemi

- Support

- İletişim



## Kullanılan Temel Teknolojiler

**İstemci:** React, firebase, zustand, TailwindCSS, Shadcn-ui, valibot, react-hook-form, react-csv, next-themes, query-string

**Sunucu:** Next.js, next-firebase-auth-edge, firebase-admin

  
## Çıkarılan Dersler

Projeyi hazırlarken birçok sorunla karşılaştım. En büyüğü muhtemelen çoklu arayazılımdı. Hem kullanıcıların kimlik doğrulaması hemde çoklu dil arayazılımını ayarlamak 5 gün sürdü. Kullanıcı giriş çıkış sistemi ve firebase admin kurulumu zorladı.

  
## Özellikler

- `next-themes` ile açık/koyu mod geçişi
- `firebase` Gerçek zamanlı veri değişimi
- `@tanstack/react-query` ile Sayfalandırma
- `firebase` profil üzerinde tam kontrol(profil fotoğrafı ekleme, kullanıcı adı ekleme, görünen adı ekleme, şifre değiştirme, email değiştirme)
- Mobil Uyumlu
- `next-intl` ile çoklu dil desteği(tr,en,de)
- `next-firebase-auth-edge` ile güvenli doğrulama
- `react-csv` ile veri aktarımı
- `@tanstack/react-table` ile tablo
- Kullanıcı takip etme.
- Favorilere ekleme, puanlandırma, durum ekleme,
- Seo desteği
- Shadcn-ui ile erişilebilir componentler
- `react-hook-form` ve `valibot` ile form validasyonu
- rate-limiting
- `react-icons` 
- `use-debounce` ile debounce

## Ekran Görüntüleri

![image](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/a9288cd5-ac86-4bec-9910-601191174a84)
![image](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/7cee04a8-7f45-4dbb-afdf-a8200031989e)
![image](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/898cbcc0-9199-47fe-a27e-2300f267b3be)
![image](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/721f2528-fe82-4c66-a607-e60ea976c2f7)
![image](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/d777f9ff-38c5-4deb-9226-6ea96f6f2e70)
![image](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/068b76ea-a1a6-4829-a392-56e2f955d82a)

  
## Optimizasyon

`next/dynamic` ile import, ssr, react-query

  
## Sık Sorulan Sorular

#### Soru 1

Cevap 1

#### Soru 2

Cevap 2

  
## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone git@github.com:dukeofsoftware/series-tracker-v2.git
```

Proje dizinine gidin

```bash
  cd series-tracker-v2
```

Gerekli paketleri yükleyin ve .env dosyasına gerekli şeyleri ekleyin.

```bash
  pnpm install
```

Sunucuyu çalıştırın

```bash
  pnpm serve
```

  
## Ortam Değişkenleri

Bu projeyi çalıştırmak için aşağıdaki ortam değişkenlerini .env dosyanıza eklemeniz gerekecek. .env.example dosyasında bulabilirsiniz.

`ANALYZE=`false

#### server firebase  

`FIREBASE_PROJECT_ID=`

`FIREBASE_API_KEY=` 

`FIREBASE_CLIENT_EMAIL=`

`FIREBASE_PRIVATE_KEY=`"-----BEGIN PRIVATE KEY-----

-----END PRIVATE KEY-----\n"

 #### client firebase  

`NEXT_PUBLIC_FIREBASE_API_KEY=`

`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=`

`NEXT_PUBLIC_PROJECT_ID=`

`NEXT_PUBLIC_BUCKET=`

`NEXT_PUBLIC_MESSAGING_SENDER_ID=`

`NEXT_PUBLIC_APP_ID=`

`NEXT_PUBLIC_MEASUREMENT_ID=`

`NEXT_PUBLIC_FIREBASE_DATABASE_URL=`

`NEXT_PUBLIC_REDIRECT_URL=`

`USE_SECURE_COOKIES=`false // set true if https


#### api keys  

`TMDB_TOKEN=`

`SITE_URL=`

  
## İlişkili Projeler

İşte bazı ilgili projeler

[Tracker v1](https://github.com/dukeofsoftware/series-tracker)

[TMDB](https://www.themoviedb.org/)
  
## Geri Bildirim

Herhangi bir geri bildiriminiz varsa, lütfen kozanfurkanemre@gmail.com adresinden bize ulaşın.

  
