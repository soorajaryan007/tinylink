CREATE TABLE "links" (
	"code" varchar(8) PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"click_count" integer DEFAULT 0,
	"last_clicked" timestamp,
	"created_at" timestamp DEFAULT now()
);
