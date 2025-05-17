# DSS Profile Matching

Sistem Pendukung Keputusan (DSS) berbasis web dengan metode Profile Matching menggunakan React, Vite, dan Tailwind CSS.

## Features

- Input kriteria (maksimal 8)
  - Nama kriteria
  - Jenis faktor (Core/Secondary)
  - Nilai standar (1-9)
  - Skala penilaian (Angka/Pilihan)
  - Opsi nilai untuk skala pilihan
- Input alternatif/kandidat (maksimal 16)
- Perhitungan gap
- Perhitungan Core Factor (60%) dan Secondary Factor (40%)
- Perhitungan ranking
- Visualisasi hasil dengan grafik
- Penyimpanan data di localStorage
- Dark mode dengan aksen warna Hatsune Miku (hehe)

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion (animasi)
- Recharts (visualisasi data)
- Heroicons & React Icons

## Hau Tu

1. Clone repositori
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

## Alur Aplikasi

1. Input Kriteria
   - Masukkan nama kriteria
   - Pilih jenis faktor (Core/Secondary)
   - Tentukan nilai standar (1-9)
   - Pilih skala penilaian:
     - Angka: tentukan range nilai (min-max)
     - Pilihan: tambahkan opsi dengan label dan nilai

2. Input Alternatif
   - Masukkan nama alternatif/kandidat
   - Berikan nilai sesuai skala penilaian yang ditentukan

3. Hasil Perhitungan
   - Informasi gap
   - Informasi Core Factor dan Secondary Factor
   - Grafik dan tabel ranking

## Perhitungan

1. Gap = Nilai Alternatif - Nilai Standar
2. Konversi gap ke bobot
3. Hitung Core Factor (CF) dan Secondary Factor (SF)
4. Hitung nilai total dengan persentase:
   - CF: 60%
   - SF: 40%
