import { db } from "@/db/client";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  context: { params: { code: string } }
) {
  const { code } = context.params;

  // Lookup short code
  const result = await db.select().from(links).where(eq(links.code, code));

  if (result.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const link = result[0];

  // Update stats (click count + last clicked)
  await db
    .update(links)
    .set({
      clickCount: (link.clickCount ?? 0) + 1,
      lastClicked: new Date(),
    })
    .where(eq(links.code, code));

  // Redirect with 302
  redirect(link.url);
}
