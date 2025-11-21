interface Link {
  code: string;
  url: string;
  clickCount: number;
  lastClicked: string | null;
  createdAt: string;
}

async function getLinkData(code: string): Promise<Link | null> {
  const res = await fetch(`${process.env.BASE_URL}/api/links/${code}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function StatsPage({
  params,
}: {
  params: { code: string };
}) {
  const data = await getLinkData(params.code);

  if (!data) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-bold">Code not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Stats for {data.code}</h1>

      <div className="border p-4 rounded space-y-2">
        <p>
          <strong>Original URL:</strong> {data.url}
        </p>
        <p>
          <strong>Total Clicks:</strong> {data.clickCount}
        </p>
        <p>
          <strong>Last Clicked:</strong>{" "}
          {data.lastClicked
            ? new Date(data.lastClicked).toLocaleString()
            : "-"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(data.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
