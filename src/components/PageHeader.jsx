import Wave from './Wave.jsx';

/** Blue page banner with a wave divider, used at the top of inner pages. */
export default function PageHeader({ title, intro }) {
  return (
    <div className="bg-brand-blue text-white">
      <div className="container-page py-12 sm:py-16">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-lg">{intro}</p>}
      </div>
      <Wave />
    </div>
  );
}
