// import React from "react";
// import { Outlet } from "react-router-dom";
// import AuthSidebar from "../features/auth/components/AuthSidebar";
// import Logo from "../components/common/Logo";

// export default function AuthLayout() {
//   return (
//     <>
//       <div className="flex flex-col h-screen sm:flex-row  overflow-hidden">
//         <AuthSidebar />

//         <main className="flex-1 h-full overflow-y-auto flex flex-col sm:h-fit sm:overflow-hidden">
//           <div className="w-full flex justify-end px-8 py-6">
//             <Logo />
//           </div>

//           <div className="flex-1 flex items-start justify-center px-6 pb-10">
//             <div className="w-full max-w-sm pt-10">
//               <Outlet />
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

import React from "react";
import { Outlet } from "react-router-dom";
import AuthSidebar from "../features/auth/components/AuthSidebar";
import Logo from "../components/common/Logo";

export default function AuthLayout() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-y-auto md:overflow-hidden">
      <AuthSidebar />

      <main className="flex-1 md:h-full overflow-y-auto flex flex-col">
        <div className="w-full flex justify-end px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
          <Logo />
        </div>

        <div className="flex-1 flex items-start justify-center px-4 pb-6 sm:px-6 sm:pb-10">
          <div className="w-full max-w-sm pt-4 sm:pt-6 md:pt-10">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
