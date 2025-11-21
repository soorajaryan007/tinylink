"use client";

import { useEffect, useState } from "react";

interface Link {
  code: string;
  url: string;
  clickCount: number;
  lastClicked: string | null;
  createdAt: string;
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadLinks() {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
  }

  async function createLink() {
    if (!url) return alert("URL required");

    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({ url, code }),
    });

    setLoading(false);

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Error creating link");
      return;
    }

    setUrl("");
    setCode("");
    loadLinks();
  }

  async function deleteLink(code: string) {
  const res = await fetch(`/api/links/${code}`, {
    method: "DELETE",
  });

  if (res.ok) {
    await loadLinks();
  } else {
    console.error("Delete failed");
  }
}


  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">TinyLink Dashboard</h1>

      {/* Add Link Form */}
      <div className="border p-4 rounded space-y-3">
        <input
          type="text"
          placeholder="Enter long URL"
          className="w-full p-2 border rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="text"
          placeholder="Custom code (optional)"
          className="w-full p-2 border rounded"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={createLink}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          {loading ? "Creating..." : "Add Link"}
        </button>
      </div>

      {/* Links Table */}
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">URL</th>
            <th className="p-2 border">Clicks</th>
            <th className="p-2 border">Last Clicked</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link) => (
            <tr key={link.code} className="border">
              <td className="p-2 border">{link.code}</td>

              <td className="p-2 border max-w-xs truncate">
                <a
                  href={`/code/${link.code}`}
                  className="text-blue-600 underline"
                >
                  {link.url}
                </a>
              </td>

              <td className="p-2 border">{link.clickCount}</td>

              <td className="p-2 border">
                {link.lastClicked
                  ? new Date(link.lastClicked).toLocaleString()
                  : "-"}
              </td>

              <td className="p-2 border">
                <button
  onClick={() => deleteLink(link.code)}
  className="text-red-600 underline"
>
  Delete
</button>

              </td>
            </tr>
          ))}

          {links.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="p-4 text-center text-gray-500 border-t"
              >
                No links yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
