"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/data-display";

export type AvatarOption = { value: string; label: string; photo?: string };

type AvatarSelectProps = {
  options: AvatarOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
};

/**
 * Dropdown that shows an avatar next to each person. Native <select> can't
 * render images, so this is a small listbox. The menu is `position: fixed`
 * so it isn't clipped when used inside a scrolling popup.
 */
export function AvatarSelect({ options, value, onChange, placeholder = "Select", label }: AvatarSelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number }>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);

  const openMenu = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) setMenuStyle({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const choose = (option: AvatarOption) => {
    onChange(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Close on outside click, or when the page/popup scrolls or resizes (the menu would drift).
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!buttonRef.current?.contains(target) && !listRef.current?.contains(target)) setOpen(false);
    };
    const close = () => setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  // Keep the highlighted option in view while using the arrow keys.
  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === "Escape") {
      // Stop the surrounding popup from closing too.
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (options[active]) choose(options[active]);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-line bg-white px-3 text-left text-[15px] text-ink outline-none transition-colors focus:border-[#98a2b3]"
      >
        {selected ? (
          <>
            <Avatar name={selected.label} src={selected.photo} className="size-6" />
            <span className="flex-1 truncate">{selected.label}</span>
          </>
        ) : (
          <span className="flex-1 px-0.5 text-[#98a2b3]">{placeholder}</span>
        )}
        <ChevronDown
          className={`size-[18px] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.8}
        />
      </button>

      {open && menuStyle && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          style={menuStyle}
          className="fixed z-50 max-h-64 overflow-y-auto rounded-lg border border-line bg-white p-1 shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08),0_4px_6px_-2px_rgba(16,24,40,0.03)]"
        >
          {options.map((option, i) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(option)}
                className={`flex h-10 cursor-pointer items-center gap-2.5 rounded-md px-2 text-[15px] ${
                  i === active ? "bg-canvas" : ""
                }`}
              >
                <Avatar name={option.label} src={option.photo} className="size-7" />
                <span className="flex-1 truncate">{option.label}</span>
                {isSelected && <Check className="size-4 text-ink" strokeWidth={2} />}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
