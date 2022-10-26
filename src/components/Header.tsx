import FontBrowser from './settings/FontBrowser';

function Header() {
  return (
    <header className="sticky top-0 border-b flex flex-col items-center py-4 z-10 bg-white">
			<h2>Fonts</h2>
			<div id="fonts" className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
				<FontBrowser text="heading" />
				<FontBrowser text="body" />
			</div>
    </header>
  );
}

export default Header;
