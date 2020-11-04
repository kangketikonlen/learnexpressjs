# express-api
Express framework api environment setup
![Alt Text](https://blog.hubspot.com/hubfs/giphy_1-1.gif)

## Requirements
- NodeJS v12.18.3
- NPM 6.14.8
- Nodemon 2.0.4 (development only!)

## Pemasangan
1. Clone repositori ini.
2. Buatlah folder baru bernama `devs` kemudian salin file dalam folder `prods` ke dalam `devs`.
3. Edit file di dalam `devs` dan sesuaikan dengan lingkungan pengembanganmu.
4. Install dependensi pada `package.json` dengan mengetikan perintah `npm install`.
5. Install nodemon secara global dengan mengetikan `npm i -g nodemon` (superuser di perlukan untuk pengguna unix like).
6. Jalankan aplikasi dengan mengetikan `npm run devs` untuk mode development dan `npm run prods` untuk mode production.
7. Akses API via browser/curl/insomnia/postman. Enjoy~

## Deskripsi Folder
- ./configs : Tempat untuk menyimpan file konfigurasi database, port dan lainnya.
	- ./configs/devs : File untuk konfigurasi tahap development.
	- ./configs/prods : File untuk konfigurasi tahap production.
- ./public : File upload yang di khususkan untuk publik di simpan di sini.
	- ./public/images : File gambar di simpan di sini.
- ./rest-client : Jika menggunakan vscode, install plugin Rest Client oleh Huachao Mao. Pergunakanlah file ini untuk mencoba fungsi rest api.
- ./server : Di sini tempat untuk menyimpan fungsi utama aplikasi ini.
	- ./server/routes : Gunakan folder ini untuk menyimpan rute atau url yang akan di daftarkan.
		- ./server/routes/apis : Simpan rute api di folder apis.
	- ./server/controllers : Gunakan folder ini untuk menyimpan logika dan fungsi aplikasi.
	- ./server/services : Ini adalah model penghubung aplikasi dengan database. Simpan file yang berhubungan dengan database di sini.

## Make Everything Clean!
Biar coding terlihat lebih rapi, ikuti guidelines umum referensinya di sini [Google JavaScript Style](https://google.github.io/styleguide/jsguide.html). Jika ada sintax atau penamaan file yang tidak sesuai, harap revisi ulang.

## Nice refference~!
1. [JavaScript Fundamental](https://www.w3schools.com/js/).
2. [NodeJS](https://www.w3schools.com/nodejs/).
3. [ExpressJS Video](https://www.youtube.com/watch?v=vjf774RKrLc).
4. [JWT Auth Video](https://www.youtube.com/watch?v=mbsmsi7l3r4).

# Heart Breaker and Life Taker, Thanks for trying. Samper fi~!
![Alt Text](https://media1.tenor.com/images/e358b95f34119a88c93ca90d19a80a03/tenor.gif?itemid=15072629)