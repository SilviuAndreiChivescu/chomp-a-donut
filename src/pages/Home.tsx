const Home = () => {
  return (
    <div className="p-6 text-center blue:text-blueTheme-text pink:text-pinkTheme-text">
      <p className="text-3xl font-semibold mb-4">Welcome to Chomp-A-Donut!</p>
      <img
        src="donut-main.svg"
        alt="Donut Image"
        className="h-16 w-16 object-cover mx-auto"
      />
      <p className="text-lg">
        Get ready to devour this frontend challenge with style
      </p>
    </div>
  );
};

export default Home;
