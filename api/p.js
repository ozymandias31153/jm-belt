export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }

    const api = `https://script.google.com/macros/s/AKfycbwykZ17E9EEmubHo2OLVIEFcxmtHQPg8fZvq-Ru2jTpRHSYZI49JM6A-G3cjI_r0fOQ/exec?id=${encodeURIComponent(id)}`;

    const r = await fetch(api, { cache: "no-store" });

    if (!r.ok) {
      return res.status(502).json({ error: "Failed to reach Google Apps Script" });
    }

    const data = await r.json();
    const url = data.url;

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.setHeader("Cache-Control", "no-store");
    return res.redirect(302, url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
