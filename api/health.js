// Ini adalah standar serverless function di Vercel/Next.js
export default function handler(request, response) {
  
  // Data ini adalah 'detak jantung' yang akan didengar Mata Elang
  const healthData = {
    status: "operational", // <-- Kunci utamanya ada di sini!
    message: "Benteng Pertahanan FMAA berdiri kokoh!",
    timestamp: new Date().toISOString()
  };

  // Mengirim balasan dengan status 200 (OK)
  response.status(200).json(healthData);
}
