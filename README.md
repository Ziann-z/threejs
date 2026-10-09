# Low Poly 3D Viewer

Proyek sederhana untuk menampilkan model 3D berformat GLB di browser menggunakan Three.js.

## Struktur folder

```text
low_poly_3d_project/
├── assets/
│   └── model.glb       # Letakkan model GLB di sini
├── index.html
├── main.js
├── style.css
├── package.json
└── README.md
```

## Cara menjalankan

1. Pasang Node.js versi LTS.
2. Letakkan model 3D berformat `.glb` di folder `assets`.
3. Ubah nama file model menjadi `model.glb`, atau sesuaikan `MODEL_PATH` di `main.js`.
4. Buka terminal di folder proyek.
5. Jalankan `npm install`.
6. Jalankan `npm run dev`.
7. Buka alamat lokal yang ditampilkan oleh Vite di terminal.

## Kontrol

- Putar model: klik dan geser mouse.
- Zoom: gulir roda mouse.
- Geser tampilan: klik kanan dan geser mouse.

## Catatan

Folder `assets` disiapkan untuk file model. File GLB tidak disertakan dalam paket ini, jadi tambahkan model yang sudah kamu unduh dari Sketchfab. Pastikan izin lisensi model mengizinkan penggunaan yang kamu inginkan dan cantumkan atribusi jika diwajibkan.
