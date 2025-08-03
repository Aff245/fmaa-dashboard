// /api/get-deployment-status.js
export default async function handler(req, res) {
  try {
    // Token ini aman karena hanya dieksekusi di sisi server Vercel
    const vercelToken = process.env.VERCEL_API_TOKEN;
    const teamId = process.env.VERCEL_TEAM_ID; // Opsional, jika proyek ada di dalam tim

    // URL ini mengambil 1 deployment terakhir dari proyek ini
    let deploymentUrl = `https://api.vercel.com/v6/deployments?limit=1`;
    if (teamId ) {
      deploymentUrl += `&teamId=${teamId}`;
    }

    const response = await fetch(deploymentUrl, {
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Vercel API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const latestDeployment = data.deployments[0];

    // Kirim kembali hanya data yang relevan dan aman
    res.status(200).json({
      state: latestDeployment.state, // Contoh: "READY", "BUILDING", "ERROR"
      createdAt: latestDeployment.createdAt,
      url: latestDeployment.url,
      creator: latestDeployment.creator.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

