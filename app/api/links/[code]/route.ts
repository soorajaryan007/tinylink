import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  context: { params: { code: string } }
) {
  const { code } = context.params;

  const data = await db.select().from(links).where(eq(links.code, code));

  if (data.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  try {
    const result = await db
      .delete(links)
      .where(eq(links.code, code));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
}}