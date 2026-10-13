import { useState } from "react";
import { X, Camera, Plus, ChevronDown, Lock, Trash2 } from "lucide-react";

/**
 * One modal for both flows — pass mode="create" or mode="edit".
 * In edit mode, fields show pre-filled sample values and a
 * "Delete item" row appears at the bottom.
 *
 * Still static for now: hook up real state (useState/RHF),
 * the actual upload handler, and onSubmit once you're ready.
 */
const STATUS = ["Available", "Made-to-order", "Sold"];

export default function ItemFormModal({ mode = "create", onClose }) {
    const [status, setStatus] = useState("");
    const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <button onClick={onClose} aria-label="Close">
              <X size={18} className="text-neutral-600" />
            </button>
            <span className="text-md font-medium">{isEdit ? "Edit item" : "Create item"}</span>
          </div>
          <button className="text-sm font-medium text-primary">Save</button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto">
          {/* Media */}
          <div className="px-4 pt-4">
            <p className="mb-2 text-sm text-neutral-500">Media</p>
            <div className="flex gap-2">
              {isEdit ? (
                <>
                  <div className="relative h-16 w-16 rounded-lg bg-neutral-100">
                    <button className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-red-500">
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                  <div className="relative h-16 w-16 rounded-lg bg-neutral-100">
                    <button className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-red-500">
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                </>
              ) : null}
              <button className="grid h-16 w-16 place-items-center rounded-lg border border-dashed border-neutral-300">
                <Plus size={18} className="text-neutral-400" />
              </button>
            </div>
            {!isEdit && (
              <p className="mt-1.5 text-xs text-neutral-400">Photos or GIFs, up to 5 files</p>
            )}
          </div>

          {/* Item name */}
          <div className="px-4 pt-4">
            <label className="mb-1.5 block text-xs text-neutral-500">Item name</label>
            <input
              type="text"
              defaultValue={isEdit ? "Kente wrap dress" : ""}
              placeholder="e.g. Kente wrap dress"
              className="h-11 w-full rounded-md border border-neutral-300 px-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-[#1D9E75]"
            />
          </div>

          {/* Price */}
          <div className="px-4 pt-3">
            <label className="mb-1.5 block text-xs text-neutral-500">Price (GH₵)</label>
            <input
              type="number"
              defaultValue={isEdit ? 320 : ""}
              placeholder="0.00"
              className="h-11 w-full rounded-md border border-neutral-300 px-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-[#1D9E75]"
            />
          </div>

          {/* Description */}
          <div className="px-4 pt-3">
            <label className="mb-1.5 block text-xs text-neutral-500">Full description</label>
            <textarea
              rows={3}
              defaultValue={
                isEdit
                  ? "Hand-dyed cotton wrap dress in a sunset kente pattern. Adjustable waist tie, midi length, lined bodice."
                  : ""
              }
              placeholder="Describe the item — materials, size, how it's made..."
              className="w-full resize-none rounded-md border border-neutral-300 px-2.5 py-2 text-sm leading-relaxed outline-none placeholder:text-neutral-400 focus:border-[#1D9E75]"
            />
          </div>

          {/* Status */}
          <div className="px-4 pb-4 pt-3">
            <p className="mb-2 text-xs text-neutral-500">Status</p>
            <div className="flex gap-2">
                {STATUS.map((stat) => (
                    <button
                    onClick={() => {
                        setStatus(stat);
                        console.log(stat);
                    }} 
                    key={stat}
                    className={`flex-1 rounded-md border py-2 text-[12px] text-neutral-400 font-medium ${status === stat ? "border-primary text-primary bg-primary-light" : "border"}`}>
                        {stat}
                    </button>                    
                ))}
            </div>
          </div>

          {/* Delete — edit mode only */}
          {isEdit && (
            <div className="border-t border-neutral-200 px-4 py-3">
              <button className="flex w-full items-center justify-center gap-1.5 rounded-md border border-red-200 py-2.5 text-sm font-medium text-red-600">
                <Trash2 size={15} />
                Delete item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}