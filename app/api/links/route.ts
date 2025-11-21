import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  // List all links
  const data = await db.select().from(links).orderBy(links.createdAt);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { url, code } = await req.json();

  // Validate URL format
  const isValidURL = /^https?:\/\/[\w.-]+\.[\w.-]+/.test(url);
  if (!isValidURL) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Generate random code if not given
  const shortCode = code || Math.random().toString(36).substring(2, 8);

  // Check if code already exists
  const exists = await db
    .select()
    .from(links)
    .where(eq(links.code, shortCode));

  if (exists.length > 0) {
    return NextResponse.json({ error: "Code already exists" }, { status: 409 });
  }

  // Insert link
  await db.insert(links).values({
    code: shortCode,
    url,
  });

  return NextResponse.json(
    { success: true, code: shortCode },
    { status: 201 }
  );
}
