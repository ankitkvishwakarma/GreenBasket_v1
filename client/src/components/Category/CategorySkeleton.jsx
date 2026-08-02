const CategorySkeleton = () => {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          {/* Image */}

          <div
            className="
              h-44
              animate-pulse
              bg-gray-100
            "
          />

          {/* Content */}

          <div className="space-y-4 p-5">

            <div className="space-y-2">

              <div
                className="
                  h-5
                  w-3/4
                  animate-pulse
                  rounded
                  bg-gray-200
                "
              />

              <div
                className="
                  h-4
                  w-1/2
                  animate-pulse
                  rounded
                  bg-gray-100
                "
              />

            </div>

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div
                className="
                  h-4
                  w-20
                  animate-pulse
                  rounded
                  bg-gray-200
                "
              />

              <div
                className="
                  h-5
                  w-5
                  animate-pulse
                  rounded-full
                  bg-gray-200
                "
              />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;