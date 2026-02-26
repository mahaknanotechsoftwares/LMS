export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-10">
      <div className="container mx-auto px-6 py-6 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} LMS Platform. All rights reserved.</p>
        <p className="text-sm">
          Built with <span className="text-blue-400">React</span> & <span className="text-teal-400">TailwindCSS</span>
        </p>
      </div>
    </footer>
  );
}