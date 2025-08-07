// Ini adalah standar serverless function di Vercel/Next.js
export default function handler(req, res) {
  // Perintah ini akan mengirim balasan dengan status 200 (OK)
  // dan sebuah objek JSON sebagai isinya.
  res.status(200).json({
    status: "ok",
    message: "Benteng Pertahanan FMAA berdiri kokoh!",
    timestamp: new Date().toISOString() // Memberikan waktu laporan
  });
}
