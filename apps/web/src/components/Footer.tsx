export const Footer = () => {
  return (
    <footer className="mt-16 rounded-lg bg-red-400 m-2 sm:m-6 flex flex-col items-center text-light">
      <h3 className="mt-16 font-semibold text-white text-center capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
        Crafting Unforgettable Moments
      </h3>
      <p className="mt-10 px-4 text-center text-white w-full sm:w-3/5 font-light text-sm sm:text-base">
        Your ultimate destination for discovering and experiencing the best
        events around you. Whether you're a music lover, a tech enthusiast, a
        fitness fanatic, or a culinary explorer, we bring you a curated list of
        events to cater to your interests.
      </p>
      <div className="w-full mt-16 relative text-white text-sm md:text-base font-medium border-t border-solid border-light py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        <span className="text-center">
          @ 2025 EventBuzz. All rights reserved.
        </span>
        <span className="text-center">Made with ❤ by Me</span>
      </div>
    </footer>
  );
};
