'use client';

export default function ChangePasswordButton() {
  function ChangePassword() {
    console.log('Hello world');
  }
  return (
    <button
      type="button"
      className="w-full  text-white rounded-md py-2 bg-indigo-600 hover:bg-indigo-700 transition mt-2"
      onClick={ChangePassword}
    >
      Skift password
    </button>
  );
}
