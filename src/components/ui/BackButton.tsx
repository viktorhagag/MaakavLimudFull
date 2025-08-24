
'use client';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="px-3 py-2 rounded border">
      ⬅ חזור
    </button>
  );
}
