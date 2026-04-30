'use client';
import PanelElement from '@/components/admin/PanelElement';
export default function AdminPanelGrid() {
  function handleMessage() {
    console.log('I figured it out');
  }
  return (
    <div className="flex items-center justify-center ">
      <div className="grid grid-cols-2 gap-4">
        <PanelElement title="Adminstrer rooms" body="" btnText="Se rum" onClick={handleMessage} />
        <PanelElement title="Adminstrer users" body="" btnText="Se brugere" onClick={handleMessage} />
        <PanelElement title="Adminstrer bookings" body="" btnText="Se bookinger" onClick={handleMessage} />
        <PanelElement title="Ryd op i DB" body="Sletter gamle bookinger (1år)" btnText="Slet ældre bookinger" onClick={handleMessage} />
      </div>
    </div>
  );
}
