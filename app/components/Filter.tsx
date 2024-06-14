import React from "react";

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

function Filter({ setSelectedCategory }: Props) {
  const categories = [
    "War",
    "Art",
    "Science",
    "Politics",
    "Religion",
    "Sports",
    "Other",
  ];

  return (
    <div className="p-4 h-20 flex items-center justify-center bg-[#262626] rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border-2 border-[#454545]">
      <div className="relative flex w-[20em] h-[3em] rounded-lg overflow-hidden border-2 border-[#454545] font-semibold after:absolute after:content-['\25BC'] after:top-0 after:-right-1 after:h-full after:text-white after:p-[1em] after:bg-[#454545] after:transition-all after:duration-300 after:ease-linear after:pointer-events-none after:flex after:items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="py-0 px-4 outline-none appearance-none border-0 flex-1 text-white bg-[#262626] cursor-pointer"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
