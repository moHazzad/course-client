// import React from 'react'

function RecentlyPayments() {
  return (
    <>
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {/* row 1 */}
          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">12.jun.23</div>
                </div>
              </div>
            </td>
            <td>$200</td>
            <td className="">
              <div className="badge badge-success gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Done
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {/* row 1 */}
          <tr>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">12.jun.23</div>
                </div>
              </div>
            </td>
            <td>$200</td>
            <td className="">
              <div className="badge badge-success gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Done
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
}

export default RecentlyPayments;
