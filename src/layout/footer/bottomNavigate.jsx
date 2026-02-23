import React from "react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  {
    path: "/",
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--material-symbols text-2xl" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75"></path>
      </svg>,
    label: "Home",
  },
  {
    path: "/airdrop",
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--streamline text-2xl" width="1em" height="1em" viewBox="0 0 14 14">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9.235 7h-4.5a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h4.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1m-2.25 4.258h1m4.5-7.243a.5.5 0 0 0 .44-.27a.47.47 0 0 0 0-.51a6.86 6.86 0 0 0-5.94-2.72a6.86 6.86 0 0 0-5.91 2.72a.47.47 0 0 0 0 .51a.5.5 0 0 0 .41.27zm-5.5 2.993v-3m-2.5 3l-2.5-3m7.5 3l2.5-3"></path>
      </svg>,
    label: "Airdrop",
  },
  {
    path: "/reward",
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--tabler text-2xl" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm9-1v13"></path>
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5"></path>
        </g>
      </svg>,
    label: "Reward",
  },
  {
    path: "/board",
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--hugeicons text-2xl" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.5 18c0-1.414 0-2.121.44-2.56C4.378 15 5.085 15 6.5 15H7c.943 0 1.414 0 1.707.293S9 16.057 9 17v5H3.5zM15 19c0-.943 0-1.414.293-1.707S16.057 17 17 17h.5c1.414 0 2.121 0 2.56.44c.44.439.44 1.146.44 2.56v2H15zM2 22h20M9 16c0-1.414 0-2.121.44-2.56C9.878 13 10.585 13 12 13s2.121 0 2.56.44c.44.439.44 1.146.44 2.56v6H9zm3.691-13.422l.704 1.42a.87.87 0 0 0 .568.423l1.276.213c.816.137 1.008.734.42 1.323l-.992 1a.88.88 0 0 0-.208.73l.284 1.238c.224.98-.292 1.359-1.152.847l-1.196-.714a.86.86 0 0 0-.792 0l-1.196.714c-.856.512-1.376.129-1.152-.847l.284-1.238a.88.88 0 0 0-.208-.73l-.991-1c-.584-.589-.396-1.186.42-1.323l1.275-.213a.87.87 0 0 0 .564-.424l.704-1.42c.384-.77 1.008-.77 1.388 0"></path>
      </svg>,
    label: "Board",
  },
  {
    path: "/profile",
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--material-symbols text-2xl" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1m3.663-5.113Q8.5 10.976 8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13t-2.488-1.012M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
      </svg>,
    label: "Profile",
  },
];

const BottomNavigate = () => {
  return (
    <nav className="fixed -bottom-0.5 left-0 right-0 z-50 py-2 bg-[#1A1A52] w-full">
      <div className="grid grid-cols-5 h-16 max-w-120 mx-auto w-full">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${isActive ? "text-white" : "text-[#757575]"} hover:text-white`
            }
          >
            {item.icon}
            <p className="uppercase text-xs font-bold">{item.label}</p>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigate;