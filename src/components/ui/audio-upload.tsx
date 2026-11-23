"use client";

import { useEffect, useId, useRef, useState, type DragEvent, type ReactNode } from "react";
import { CloudUpload, FileAudio, Pause, Play, Trash2 } from "lucide-react";

/** 10 MB, as the design states. */
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = ".m4a,audio/mp4,audio/x-m4a,audio/m4a";

const isM4a = (file: File) => /\.m4a$/i.test(file.name) || /^audio\/(x-)?m4a$|^audio\/mp4$/.test(file.type);

/** 1536000 → "1.5 MB", 20480 → "20 KB". */
export function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** 75.4 → "1:15". */
const formatDuration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

type AudioUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  label?: string;
};

/**
 * Drop zone for one .m4a audio file (up to 10 MB). Click or drag a file in;
 * once uploaded it shows the file with a play/pause preview and a remove
 * button. Wrong type or too large shows an error and keeps the drop zone.
 */
export function AudioUpload({ value, onChange, label = "Greeting audio file" }: AudioUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();

  const accept = (file: File | undefined) => {
    if (!file) return;
    if (!isM4a(file)) return setError("Please choose an .m4a audio file.");
    if (file.size > MAX_BYTES) return setError(`That file is ${formatBytes(file.size)}. The limit is 10 MB.`);
    setError(null);
    onChange(file);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    accept(e.dataTransfer.files[0]);
  };

  const errorText = error && (
    <p id={errorId} role="alert" className="mt-1.5 text-[13px] text-danger">
      {error}
    </p>
  );

  if (value) {
    return (
      <div>
        <UploadedFile
          file={value}
          onRemove={() => {
            setError(null);
            onChange(null);
          }}
          onReplace={() => inputRef.current?.click()}
          input={
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              className="hidden"
              onChange={(e) => {
                accept(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          }
        />
        {errorText}
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center rounded-xl border border-dashed px-6 py-6 text-center transition-colors ${
          dragging ? "border-[#84adff] bg-[#f5f8ff]" : error ? "border-[#fda29b]" : "border-[#d0d5dd]"
        }`}
      >
        <CloudUpload aria-hidden className="size-6 text-[#344054]" strokeWidth={1.6} />
        <p className="mt-4 text-[15px] text-[#475467]">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-describedby={error ? errorId : undefined}
            className="font-medium text-[#155eef] hover:underline focus-visible:underline focus-visible:outline-none"
          >
            Click to upload
          </button>{" "}
          or drag and drop your file
        </p>
        <p className="mt-1 text-[13px] text-[#475467]">Up to 10 MB m4a file</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          aria-label={label}
          className="hidden"
          onChange={(e) => {
            accept(e.target.files?.[0]);
            e.target.value = ""; // allow choosing the same file again after an error
          }}
        />
      </div>
      {errorText}
    </div>
  );
}

/** The uploaded state: file name and size, a play/pause preview, Replace and Remove. */
function UploadedFile({
  file,
  onRemove,
  onReplace,
  input,
}: {
  file: File;
  onRemove: () => void;
  onReplace: () => void;
  input: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState(0);

  // Point the player at a local URL for the file; freed when the file changes or is removed.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const objectUrl = URL.createObjectURL(file);
    audio.src = objectUrl;
    return () => {
      audio.pause();
      audio.removeAttribute("src");
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  const progress = duration ? (position / duration) * 100 : 0;

  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f2f4f7] text-[#475467]">
          <FileAudio className="size-5" strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-ink" title={file.name}>
            {file.name}
          </p>
          <p className="text-[13px] text-[#475467]">
            {formatBytes(file.size)}
            {duration !== null && ` · ${formatDuration(duration)}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${file.name}`}
          className="rounded p-1 text-[#475467] hover:bg-canvas hover:text-ink"
        >
          <Trash2 className="size-[18px]" strokeWidth={1.6} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? "Pause greeting" : "Play greeting"}
          className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white hover:bg-[#344054] disabled:opacity-50"
        >
          {playing ? (
            <Pause className="size-4" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 size-4" fill="currentColor" />
          )}
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f2f4f7]" aria-hidden>
          <div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${progress}%` }} />
        </div>
        <span className="w-10 shrink-0 text-right text-[13px] text-[#475467] tabular-nums">
          {formatDuration(position)}
        </span>
        <button
          type="button"
          onClick={onReplace}
          className="shrink-0 text-[13px] font-medium text-[#155eef] hover:underline"
        >
          Replace
        </button>
      </div>

      {/* Always rendered so the effect above can set its source. */}
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setReady(true);
          setDuration(Number.isFinite(e.currentTarget.duration) ? e.currentTarget.duration : null);
        }}
        onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setPosition(0);
        }}
      />
      {input}
    </div>
  );
}
