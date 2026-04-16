export function CTLBtn({ text, type }: { text: string; type: 'submit' | 'reset' | 'button' }) {
  return (
    <button type={type} className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition mt-2">
      {text}
    </button>
  );
}
