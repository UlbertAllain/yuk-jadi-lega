import type { Service, ServiceCategory } from "@/types";

export function NavigationMenuSettings({
  services,
  categories,
  selectedServices,
  selectedCategories,
  onServicesChange,
  onCategoriesChange,
}: {
  services: Service[];
  categories: ServiceCategory[];
  selectedServices: string[];
  selectedCategories: string[];
  onServicesChange: (value: string[]) => void;
  onCategoriesChange: (value: string[]) => void;
}) {
  return (
    <div className="grid gap-7 lg:grid-cols-2">
      <SelectionGroup
        title="Dropdown Layanan"
        description="Pilih maksimal 6 layanan yang paling penting / sering dipesan. Urutan mengikuti urutan layanan di CMS."
        items={services.map((item) => ({ id: item.slug, label: item.title, meta: item.categorySlug }))}
        selected={selectedServices}
        max={6}
        onChange={onServicesChange}
      />
      <SelectionGroup
        title="Dropdown Kategori"
        description="Pilih maksimal 6 kategori yang ingin diberi akses cepat dari navbar."
        items={categories.map((item) => ({ id: item.slug, label: item.name, meta: item.description }))}
        selected={selectedCategories}
        max={6}
        onChange={onCategoriesChange}
      />
    </div>
  );
}

function SelectionGroup({
  title,
  description,
  items,
  selected,
  max,
  onChange,
}: {
  title: string;
  description: string;
  items: Array<{ id: string; label: string; meta?: string }>;
  selected: string[];
  max: number;
  onChange: (value: string[]) => void;
}) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
      return;
    }
    if (selected.length >= max) return;
    onChange([...selected, id]);
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-slate-900">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-500">
          {selected.length}/{max}
        </span>
      </div>
      <div className="mt-4 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/60 p-2">
        {items.map((item) => {
          const checked = selected.includes(item.id);
          const disabled = !checked && selected.length >= max;
          return (
            <label
              key={item.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-3 transition ${checked ? "bg-white shadow-sm" : "hover:bg-white/70"} ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(item.id)}
                className="mt-0.5 h-4 w-4 accent-brand-navy"
              />
              <span className="min-w-0">
                <span className="block text-xs font-bold text-slate-800">{item.label}</span>
                {item.meta ? <span className="mt-1 block line-clamp-2 text-[10px] leading-4 text-slate-400">{item.meta}</span> : null}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
