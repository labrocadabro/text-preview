import React from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import Preview from './components/Preview';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
			<Header />
			<main className="flex text-3xl">
				<Settings />
				<Preview />
			</main>
			<Footer />
    </>
  );
}

export default App;
