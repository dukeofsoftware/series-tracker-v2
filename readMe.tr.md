İzleme Takipçisi v2
Projenin amacı, TV dizileri, filmler ve belki de gelecekte birçok farklı şeyin takibini kolaylaştırmaktır. Daha önce izlediklerimi takip etmek için Notion kullanıyordum, ancak bunu manuel olarak yapmak oldukça zorlayıcıydı. Benzer uygulamalar olsa da kendi sorunları vardı. İhtiyaçlarımı karşılamak için yeterli değillerdi. Bu yüzden böyle bir uygulama geliştirmek istedim.

Yol Haritası
Altbilgi
Sıkça Sorulan Sorular
Yakında Gelecekler
Derecelendirme Sistemi
Listeler Oluşturma
Yorum Yapma
Blog
Ödeme Sistemi (supabase, stripe)
Arkadaşlarla Gerçek Zamanlı Sohbet
Bildirim Sistemi
Destek
İletişim
Temel Kullanılan Teknolojiler
İstemci: React, Firebase, Zustand, TailwindCSS, Shadcn-ui, Valibot, React Hook Form, React CSV, Next Themes, Query String

Sunucu: Next.js, next-firebase-auth-edge, Firebase Admin

Edinilen Dersler
Proje hazırlanırken birçok zorlukla karşılaştım. Muhtemelen en büyük zorluk çoklu dil desteğiydi. Hem kullanıcı kimlik doğrulamasını hem de çoklu dil arayüzünü kurmak 5 gün sürdü. Kullanıcı giriş/çıkış sistemi ve Firebase Admin kurulumu zorlayıcıydı.

Özellikler
next-themes ile koyu/açık mod geçişi
firebase ile gerçek zamanlı veri değişiklikleri
@tanstack/react-query ile sayfalama
firebase ile profil üzerinde tam kontrol (profil resmi ekleme, kullanıcı adı ekleme, görünen ad ekleme, şifre değiştirme, e-posta değiştirme)
Mobil uyumlu
next-intl ile çoklu dil desteği (tr, en, de)
Güvenli kimlik doğrulama next-firebase-auth-edge
react-csv ile veri dışa aktarma
@tanstack/react-table ile tablo işlevselliği
Kullanıcı takip etme
Favorilere ekleme, derecelendirme, durum ekleme
SEO desteği
Shadcn-ui ile erişilebilir bileşenler
react-hook-form ve valibot ile form doğrulama
Hız sınırlama (rate limiting)
react-icons
use-debounce ile geciktirme
Ekran Görüntüleri
Uygulama Ekran Görüntüsü
Uygulama Ekran Görüntüsü
Uygulama Ekran Görüntüsü
Uygulama Ekran Görüntüsü
Uygulama Ekran Görüntüsü
Uygulama Ekran Görüntüsü

Optimizasyon
next/dynamic ile içe aktarma, sunucu taraflı işlemler (SSR) ve react-query kullanımı

Sıkça Sorulan Sorular
Soru 1: Soru 1
Cevap 1: Cevap 1

Soru 2: Soru 2
Cevap 2: Cevap 2

Bilgisayarınızda Çalıştırma
Projeyi klonlayın:

bash
Copy code
git clone git@github.com:dukeofsoftware/series-tracker-v2.git
Proje dizinine gidin:

bash
Copy code
cd series-tracker-v2
Gerekli paketleri yükleyin ve .env dosyasına gereken değerleri ekleyin:

bash
Copy code
pnpm install
Sunucuyu çalıştırın:

bash
Copy code
pnpm serve
Ortam Değişkenleri
Bu projeyi çalıştırmak için aşağıdaki ortam değişkenlerini .env dosyanıza eklemeniz gerekecek. Bu değerlere .env.example dosyasında ulaşabilirsiniz.

ANALYZE=false

Sunucu Firebase
FIREBASE_PROJECT_ID=

FIREBASE_API_KEY=

FIREBASE_CLIENT_EMAIL=

FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----

-----END PRIVATE KEY-----\n"

İstemci Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_PROJECT_ID=

NEXT_PUBLIC_BUCKET=

NEXT_PUBLIC_MESSAGING_SENDER_ID=

NEXT_PUBLIC_APP_ID=

NEXT_PUBLIC_MEASUREMENT_ID=

NEXT_PUBLIC_FIREBASE_DATABASE_URL=

NEXT_PUBLIC_REDIRECT_URL=

USE_SECURE_COOKIES=false // true olarak ayarlayın eğer https kullanılıyorsa

API Anahtarları
TMDB_TOKEN=

SITE_URL=

İlgili Projeler
İşte bazı ilgili projeler:

Tracker v1
TMDB
Geri Bildirim
Eğer herhangi bir geri bildiriminiz varsa, lütfen bize kozanfurkanemre@gmail.com adresinden ulaşın.
