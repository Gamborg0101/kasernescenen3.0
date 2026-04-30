'use client';

export default function PanelElement({
  title,
  body,
  btnText,
  onClick,
}: {
  title: string;
  body: string;
  btnText: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center flex-col justify-between h-60 w-60 bg-white border border-gray-300 shadow-sm rounded-2xl mt-20">
      <div className="mt-4 font-bold text-xl text-gray-900">
        <p> {title}</p>
      </div>
      <p className="flex justify-center items-center text-sm p-3 text-ellipsis text-gray-500">{body}</p>
      <div className="mb-10">
        <button
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded-full transition-colors duration-150 cursor-pointer"
          onClick={onClick}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
}
