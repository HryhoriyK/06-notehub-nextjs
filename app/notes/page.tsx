import { getNotes } from "@/lib/api";
import Notes from "./Notes.client";

export default async function NotesPage() {
  const perPage = 12;
  const currentPage = 1;
  const search = "";

  const data = await getNotes(currentPage, perPage, search);

  return <Notes initialData={data} />;
}
