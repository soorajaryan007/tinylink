"use client";

import { useState, useEffect } from "react";
import { LinkItem } from "./types";

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [shortenedLink, setShortenedLink] = useState<string | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  // Load existing links
  useEffect(() => {
    fetch("/api/links")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  }, []);

  async function createLink(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({ url, code }),
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    // Build the short URL
    const shortUrl = `${window.location.origin}/${data.code}`;
    setShortenedLink(shortUrl);

    setLinks([...links, { code: data.code, url, clickCount: 0, lastClicked: null, createdAt: new Date().toISOString() }]);

    setUrl("");
    setCode("");
  }

  async function deleteLink(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    setLinks(links.filter((l) => l.code !== code));
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">TinyLink Dashboard</h1>

      {/* Create Link Form */}
      <form onSubmit={createLink} className="space-y-4">
        <input
          type="url"
          required
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Link
        </button>
      </form>

      {/* Show Shortened Link */}
      {shortenedLink && (
        <div className="p-4 bg-green-100 border border-green-400 rounded">
          <p className="font-semibold">Shortened Link:</p>
          <a href={shortenedLink} target="_blank" className="text-blue-600 underline">
            {shortenedLink}
          </a>

          <button
            className="ml-4 px-3 py-1 bg-gray-800 text-white rounded"
            onClick={() => navigator.clipboard.writeText(shortenedLink)}
          >
            Copy
          </button>
        </div>
      )}

      {/* Links Table */}
      <table className="w-full border-collapse mt-6">
  <thead>
    <tr className="border-b bg-gray-100">
      <th className="text-left p-2">Code</th>
      <th className="text-left p-2">URL</th>
      <th className="text-left p-2">Total Clicks</th>
      <th className="text-left p-2">Last Clicked</th>
      <th></th>
    </tr>
  </thead>

  <tbody>
    {links.map((l) => (
      <tr key={l.code} className="border-b">
        <td className="p-2">{l.code}</td>
        <td className="p-2">{l.url}</td>

        {/* Total Clicks */}
        <td className="p-2">{l.clickCount}</td>

        {/* Last Clicked Time */}
        <td className="p-2">
          {l.lastClicked ? (
            new Date(l.lastClicked).toLocaleString()
          ) : (
            <span className="text-gray-500">-</span>
          )}
        </td>

        <td className="p-2">
          <button
            className="text-red-600"
            onClick={() => deleteLink(l.code)}
          >
            delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}


