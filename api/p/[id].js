export default async (req, res) => {
  const { id } = req.query;
  const api = `https://script.google.com/macros/s/AKfycbwykZ17E9EEmubHo2OLVIEFcxmtHQPg8fZvq-Ru2jTpRHSYZI49JM6A-G3cjI_r0fOQ/exec?id=${encodeURIComponent(id)}`;
  const r = await fetch(api, { cache: "no-store" });
  const { url } = await r.json();
  if (!url) return res.status(404).send("Not found");
  res.setHeader("Cache-Control", "no-store");
  res.redirect(302, url);
};
