import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="min-h-screen bg-[#525354] flex flex-col items-center justify-center p-4 text-white text-center">
			<h1 className="text-6xl md:text-8xl font-bold font-playfair mb-6">404</h1>
			<h2 className="text-2xl md:text-4xl font-roboto font-medium mb-6">Page Not Found</h2>
			<p className="text-lg md:text-xl font-roboto mb-8 max-w-2xl">
				The page you're looking for doesn't exist or has been moved.
			</p>
			<Link
				to="/"
				className="px-8 py-3 bg-white text-gray-800 font-roboto font-bold rounded-full hover:bg-gray-200 transition-colors"
			>
				Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
