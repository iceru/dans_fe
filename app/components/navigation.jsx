const Navigation = ({}) => {
  return (
    <div className="bg-slate-800 text-white">
      <div className="container py-4 flex justify-between">
        <h1 className="text-2xl">
          <strong>GitHub</strong> Jobs
        </h1>
        <div className="flex items-center">
          <a href="/login" className="mr-4">
            Login
          </a>
          <div className="mr-4">|</div>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
