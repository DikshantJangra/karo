"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CgNotes } from "react-icons/cg";
import { GrDocumentTime } from "react-icons/gr";
import { BiRename } from "react-icons/bi";
import { supabase } from "@/lib/supabase/client";

interface RowData {
  id: number;
  samay: string;
  karya: string;
  notes: string;
  tags: { name: string }[];
}

interface NewRowData {
  samay: string;
  karya: string;
  notes: string;
  tag: string; // Comma-separated tags for input
}

export default function Home() {
  const router = useRouter();
  const [rows, setRows] = useState<RowData[]>([]);
  const [newRow, setNewRow] = useState<NewRowData>({ samay: "", karya: "", notes: "", tag: "" });
  const [activeNewCell, setActiveNewCell] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; cellName: keyof NewRowData } | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push('/login');
    };
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push('/login');
    });
    return () => subscription.unsubscribe();
  }, [router]);

  // Data fetching
  const fetchTasks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('id, samay, karya, notes, tags ( name )')
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error);
      setUpdateError(`Failed to load tasks: ${error.message}`);
    } else {
      setRows(data.map(d => ({ ...d, samay: d.samay || '', karya: d.karya || '', notes: d.notes || '', tags: d.tags || [] })) || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}, ${today.getDate()} ${today.toLocaleString('default', { month: 'long' })}`;

  useEffect(() => {
    if (activeNewCell && newRow.samay === "") {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      setNewRow(prev => ({ ...prev, samay: `${hours}:${minutes} - ∞` }));
    }
  }, [activeNewCell]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (Object.values(newRow).some(val => val)) {
      setIsLoading(true);
      setUpdateError(null);
      const tagsArray = newRow.tag.split(',').map(t => t.trim()).filter(Boolean);
      const { error } = await supabase.rpc('create_task_with_tags', {
        task_karya: newRow.karya,
        task_notes: newRow.notes,
        task_samay: newRow.samay,
        task_tags: tagsArray,
      });
      if (error) {
        console.error("Error creating task:", error);
        setUpdateError(`Failed to save task: ${error.message}`);
      } else {
        await fetchTasks();
      }
      setIsLoading(false);
    }
    setNewRow({ samay: "", karya: "", notes: "", tag: "" });
  };

  const handleUpdate = async () => {
    if (!editingCell) return;
    setIsLoading(true);
    setUpdateError(null);

    const { rowIndex, cellName } = editingCell;
    const updatedRow = { ...rows[rowIndex] };

    if (cellName === 'tag') {
      updatedRow.tags = editingValue.split(',').map(t => ({ name: t.trim() }));
    } else {
      (updatedRow as any)[cellName] = editingValue;
    }

    const { error } = await supabase.rpc('update_task_with_tags', {
      task_id_to_update: updatedRow.id,
      new_samay: updatedRow.samay,
      new_karya: updatedRow.karya,
      new_notes: updatedRow.notes,
      new_tags: updatedRow.tags.map(t => t.name).filter(Boolean),
    });

    if (error) {
      console.error("Error updating task:", error);
      setUpdateError(`Failed to update task: ${error.message}`);
    } else {
      await fetchTasks();
    }

    setEditingCell(null);
    setEditingValue("");
    setIsLoading(false);
  };

  const getTagColor = (tag: string) => {
    if (!tag) return "bg-transparent";
    const colors = ["bg-red-200 text-red-800", "bg-yellow-200 text-yellow-800", "bg-green-200 text-green-800", "bg-blue-200 text-blue-800", "bg-indigo-200 text-indigo-800", "bg-purple-200 text-purple-800", "bg-pink-200 text-pink-800"];
    let hash = 0;
    for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash % colors.length)];
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center items-center gap-2 text-4xl py-5 text-center font-medium w-full">
        <GrDocumentTime />
        <p>Karo</p>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-[100%]">
        <div className="flex flex-col items-center py-5">
          <div className="flex gap-5">
            <button>Logs</button>
            <p className="text-2xl">{formattedDate}</p>
          </div>

          {updateError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{updateError}</span>
            </div>
          )}

          {isLoading && <p>Loading...</p>}

          <div className="overflow-x-auto w-full">
            <table className="table-fixed text-center w-full">
            <thead>
              <tr>
                <th className="px-5 pt-5 py-2 w-28">Tag</th>
                <th className="px-5 pt-5 py-2 w-28">Samay</th>
                <th className="px-5 pt-5 py-2 w-72">Karya</th>
                <th className="px-5 pt-5 py-2 w-10"><CgNotes /></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.id} className="text-center">
                  {(['tag', 'samay', 'karya', 'notes'] as const).map((cellName) => (
                    <td key={cellName} className="break-all px-5 py-1 relative group">
                      {editingCell?.rowIndex === rowIndex && editingCell?.cellName === cellName ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={handleUpdate}
                          autoFocus
                          className="w-full focus:outline-none bg-transparent"
                        />
                      ) : (
                        <>
                          <div className="group-hover:blur-xs transition-all">
                            {cellName === 'tag' ? (
                              <div className="flex flex-wrap gap-1 justify-center">
                                {row.tags.map(tag => (
                                  <span key={tag.name} className={`px-2 py-1 text-xs font-semibold rounded-full ${getTagColor(tag.name)}`}>
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              row[cellName as keyof Omit<RowData, 'id' | 'tags'>]
                            )}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span
                              className="cursor-pointer text-2xl"
                              onClick={() => {
                                setEditingCell({ rowIndex, cellName: cellName as keyof NewRowData });
                                setEditingValue(cellName === 'tag' ? row.tags.map(t => t.name).join(', ') : (row as any)[cellName]);
                              }}
                            >
                              <BiRename />
                            </span>
                          </div>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="text-center" onMouseLeave={() => { if (Object.values(newRow).some(val => val)) { handleSave(); } setActiveNewCell(null); }}>
                {(Object.keys(newRow) as Array<keyof NewRowData>).map(cellName => (
                  <td key={cellName} className="h-full">
                    {activeNewCell === cellName ? (
                      <input
                        name={cellName}
                        value={newRow[cellName]}
                        onChange={handleChange}
                        autoFocus
                        placeholder={cellName === 'tag' ? "tag1, tag2" : ""}
                        className="w-full focus:outline-none"
                      />
                    ) : (
                      <div onClick={() => setActiveNewCell(cellName)} className="opacity-50 hover:opacity-100 cursor-pointer h-full">
                        {newRow[cellName] || "+"}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
