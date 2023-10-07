import { Search } from "lucide-react";
import { useState } from "react";
import useSearch from "./hooks/useSearch";
import useDebounce from "./hooks/useDebounce";
import Spinner from "@/shared/Spinner";
import { Frown } from "lucide-react";
import { cn } from "@/lib/utils";
import { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(-1);
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const search = useSearch(debounceSearchTerm);
  const navigate = useNavigate();
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && selected > 0) {
      setSelected((prev) => prev - 1);
    } else if (
      e.key === "ArrowDown" &&
      search.data &&
      selected < search.data.length - 1
    ) {
      setSelected((prev) => prev + 1);
    } else if (e.key === "Enter" && selected >= 0) {
      if (search.data) {
        navigate(`/product/${search.data[selected]._id}`);
        setOpen(false);
      }
    }
  };
  return (
    <div className="relative order-last col-span-3 mx-0 mt-2 w-full md:order-none md:mt-0 md:w-[65%] lg:w-[30%]">
      <div className=" flex w-full rounded-md border border-slate-7 px-2  ">
        <input
          type="search"
          className="h-10 w-full rounded-full bg-blue-1 p-3 text-slate-12 focus:outline-none "
          placeholder="Search Products"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value === "") {
              setOpen(false);
              setSelected(-1);
            } else {
              setOpen(true);
              setSelected(-1);
            }
          }}
          onKeyDown={handleKeyDown}
        />
        <button className="ml-2 text-blue-11">
          <Search />
        </button>
      </div>
      <div
        className={cn(
          "absolute top-12 hidden min-h-[40px] w-full rounded-sm border border-slate-7 bg-white p-2 py-1",
          { block: open },
        )}
      >
        {search.isFetching ? (
          <Spinner />
        ) : search.data?.length === 0 ? (
          <div className="my-1 flex p-4 font-medium">
            <Frown className="mr-2" />
            No Items Found
          </div>
        ) : (
          search.data?.map((item, index) => {
            return (
              <div
                className={cn(
                  "my-1 flex cursor-pointer justify-between rounded-sm p-4 hover:bg-slate-4",
                  {
                    "bg-slate-4": selected === index,
                  },
                )}
                key={item._id}
              >
                <p className="text-sm font-medium sm:text-base">{item.name}</p>
                <p className="text-xs text-slate-10 sm:text-sm">
                  in {item.category}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchInput;
