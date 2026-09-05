"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
}
export default function Notes() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        router.push("/login");
        setLoading(false);
        return;
      }
      setNotes(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = tags.split(",").map((tag) => tag.trim());
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags: tagsArray }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      fetchData();
      setTitle("");
      setContent("");
      setTags("");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async ({id}:{id:string}) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#12141C] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-sm text-[#E8A33D]">~/devvault</p>
        <h1 className="mt-2 text-xl font-semibold text-[#E8E9ED]">
          Your Notes
        </h1>

        {error && (
          <p className="mt-4 rounded-md border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4 rounded-lg border border-[#2A2E3F] bg-[#1A1D29] p-6"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md border border-[#2A2E3F] bg-[#12141C] px-3 py-2 text-sm text-[#E8E9ED] placeholder-[#565B70] outline-none transition focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="resize-none rounded-md border border-[#2A2E3F] bg-[#12141C] px-3 py-2 text-sm text-[#E8E9ED] placeholder-[#565B70] outline-none transition focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="rounded-md border border-[#2A2E3F] bg-[#12141C] px-3 py-2 text-sm text-[#E8E9ED] placeholder-[#565B70] outline-none transition focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]"
          />
          <button
            type="submit"
            className="self-start rounded-md bg-[#E8A33D] px-4 py-2 text-sm font-medium text-[#12141C] transition hover:bg-[#f0b158] active:bg-[#d8933a]"
          >
            Add note
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-3">
          {loading && (
            <p className="text-sm text-[#8B8FA3]">Loading your notes...</p>
          )}

          {!loading && notes.length === 0 && (
            <p className="text-sm text-[#8B8FA3]">
              No notes yet — add your first one above.
            </p>
          )}

          {notes.map((note) => (
            <div
              key={note._id}
              className="rounded-lg border border-[#2A2E3F] bg-[#1A1D29] p-4"
            >
              <h3 className="font-medium text-[#E8E9ED]">{note.title}</h3>
              <p className="mt-1 text-sm text-[#8B8FA3]">{note.content}</p>
              {note.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#2A2E3F] px-2 py-0.5 font-mono text-xs text-[#E8A33D]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={() => handleDelete({ id: note._id })}
                className="mt-4 rounded-md bg-[#E8A33D] px-4 py-2 text-sm font-medium text-[#12141C] transition hover:bg-[#f0b158] active:bg-[#d8933a]"
              >
                Delete
              </button>
              {error && (
                <p className="mt-4 rounded-md border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300">
                  {error}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}