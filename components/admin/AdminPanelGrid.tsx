'use client';
import PanelElement from '@/components/admin/PanelElement';
import { cleanDbFromOldBookingsAction } from '@/lib/actions/bookingActions';
import importCsv from '@/lib/addCsv';

export default function AdminPanelGrid() {
  return (
    <div className="flex items-center justify-center ">
      <div className="grid grid-cols-2 gap-4">
        <PanelElement
          title="Adminstrer rooms"
          body="Se, tilføj eller slet rum"
          btnText="Se rum"
          onClick={() => {
            return 'functions to come';
          }}
          url="adminpanel/managerooms"
        />
        <PanelElement
          title="Adminstrer brugere"
          body="Se, rediger eller slet brugere"
          btnText="Se brugere"
          onClick={() => {
            return 'functions to come';
          }}
          url="users"
        />
        <PanelElement
          title="Adminstrer bookings"
          body="Se, slet eller opret bookinger"
          btnText="Se bookinger"
          onClick={() => {
            console.log('Hi');
          }}
          url="/booking"
        />
        <PanelElement
          title="Ryd op i DB"
          body="Sletter gamle bookinger (1år)"
          btnText="Slet ældre bookinger"
          url="/"
          onClick={cleanDbFromOldBookingsAction}
        />
        <PanelElement
          title="Importer bookinger"
          body="Importer bookinger fra en CSV fil"
          btnText="Importer bookinger"
          url=""
          onClick={importCsv}
        />
      </div>
    </div>
  );
}
