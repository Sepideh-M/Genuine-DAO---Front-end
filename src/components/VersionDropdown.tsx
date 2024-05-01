import React, { useState } from "react";

/**
 against vote =0
 for vote =1
 abstain vote =2
 */

export default function VersionDropdown({setVoteId}:any) {
  const [showBody, setShowBody] = useState(false);
  const [selectedV, setSelectedV] = useState("For Vote");

  const version =1;

  
  const returnBg = () => {
    if(selectedV == "For Vote"){
        return `bg-green-600`
    }else if(selectedV == "Against Vote"){
        return `bg-red-600`
    }else if(selectedV == "Abstain Vote"){
        return `bg-yellow-300`
    }
  }


  const returnHoverBg = () => {
    if(selectedV == "For Vote"){
        return `bg-green-400`
    }else if(selectedV == "Against Vote"){
        return `bg-red-400`
    }else if(selectedV == "Abstain Vote"){
        return `bg-yellow-200`
    }
  }

  return (
    <div className="flex justify-start">
      <div className="flex h-auto justify-center">
        <div>
          <div className="dropdown relative">
            <div className="">
            <button
              className={`
          dropdown-toggle
          px-2
          py-1
          ${returnBg()}
          text-white
          font-medium
          text-md
          leading-tight
          uppercase
          rounded-2xl
          shadow-md
          hover:${returnHoverBg()} hover:shadow-lg
          focus:${returnHoverBg()} focus:shadow-lg focus:outline-none focus:ring-0
          active:${returnHoverBg()} active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        `}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setShowBody(!showBody)}
            >
              {selectedV}
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </button>
            {showBody ? (
              <ul
                className="
          dropdown-menu
          flex
          md:grid
          min-w-max
          absolute
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none
        "
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className="
              dropdown-item
              text-sm
              py-0
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              cursor-pointer
              text-gray-700
              hover:bg-gray-100
              border-b-2
            "
                    //   href="#"
                    onClick={() => {
                      setSelectedV("Against Vote")
                      setVoteId(0);
                      setShowBody(false);
                    //   dispatch(setVersion(1));
                    }}
                  >
                    Against Vote
                  </a>
                </li>
                <li>
                  <a
                    className="
              dropdown-item
              text-sm
              py-0
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              cursor-pointer
              bg-transparent
              text-gray-700
              hover:bg-gray-100
              border-b-2

            "
                    //   href="#"
                    onClick={() => {
                      setSelectedV("For Vote")
                      setVoteId(1);
                      setShowBody(false);
                    //   dispatch(setVersion(2));
                    }}
                  >
                    For Vote
                  </a>
                </li>
                <li>
                  <a
                    className="
              dropdown-item
              text-sm
              py-0
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              cursor-pointer
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                    //   href="#"
                    onClick={() => {
                      setSelectedV("Abstain Vote")
                      setVoteId(2);
                      setShowBody(false);
                    //   dispatch(setVersion(2));
                    }}
                  >
                    Abstain Vote
                  </a>
                </li>
              </ul>
            ) : null}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}