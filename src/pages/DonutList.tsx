import { useDonuts } from "@hooks/useDonuts";

const DonutList = () => {
  const {
    donuts,
    chompedIds,
    error,
    loading,
    handleReset,
    handleChomp,
    fetchDonuts,
  } = useDonuts();

  const isResetButtonDisabled = Object.keys(chompedIds).length === 0;

  if (loading)
    return (
      <div role="status" className="flex justify-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 blue:text-[#93C5FD] blue:fill-[#2069FA] pink:text-[#F472B6] pink:fill-[#FFDCFA] animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );

  if (error) {
    return (
      <div className="text-center blue:text-blueTheme-text pink:text-pinkTheme-text">
        <p>Oops! Couldn{"’"}t fetch donuts.</p>
        <button onClick={fetchDonuts} className="mt-2 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-5 md:px-0">
      {donuts.length > 0 ? (
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {donuts.map((donut) => {
              const isChomped = !!chompedIds[donut.id];
              return (
                <tr
                  key={donut.id}
                  className={`transition-opacity duration-300 ${
                    isChomped ? "opacity-50" : ""
                  }`}
                >
                  <td className="p-2">
                    <img
                      src={`${donut.imageName}.svg`}
                      alt={donut.name}
                      className="h-16 w-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="p-2">{donut.name}</td>
                  <td className="p-2">&#163;{donut.price.toFixed(2)}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleChomp(donut.id)}
                      disabled={isChomped}
                      className={`px-3 py-1 rounded ${
                        isChomped
                          ? "bg-gray-300 cursor-not-allowed"
                          : "border cursor-pointer blue:border-[bg-blueTheme-text] blue:text-blueTheme-text pink:border-[bg-pinkTheme-text] pink:text-pinkTheme-text"
                      }`}
                    >
                      Chomp-a-donut
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="font-semibold blue:text-blueTheme-text pink:text-pinkTheme-text">
          No donuts available!
        </p>
      )}
      {Object.keys(chompedIds).length === donuts.length &&
        donuts.length > 0 && (
          <p className="mt-4 text-green-600 font-semibold text-center">
            🎉 All donuts have been chomped! Time for a break!
          </p>
        )}

      <div className="mt-6 flex justify-between items-center">
        <p className="font-bold">
          Total Chomped Value: &#163;
          {donuts
            .filter((d) => !!chompedIds[d.id])
            .reduce((sum, d) => sum + d.price, 0)
            .toFixed(2)}
        </p>

        {donuts.length && (
          <button
            disabled={isResetButtonDisabled}
            onClick={handleReset}
            className={`${
              isResetButtonDisabled
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "border blue:border-[bg-blueTheme-text] blue:text-blueTheme-text pink:border-[bg-pinkTheme-text] pink:text-pinkTheme-text"
            } px-4 py-2 rounded `}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default DonutList;
