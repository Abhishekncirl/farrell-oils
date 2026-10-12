import ContactSettings from './ContactSettings.jsx';
import OpeningHoursSettings from './OpeningHoursSettings.jsx';

/** Admin > Settings: contact details, sales representatives and opening hours. */
export default function SettingsPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-brand-blue">Settings</h1>
      <div className="mt-6 space-y-6">
        <ContactSettings />
        <OpeningHoursSettings />
      </div>
    </>
  );
}
