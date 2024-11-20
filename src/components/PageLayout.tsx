import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, MenuIcon } from "lucide-react";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import Navbar from "./Navbar";
import { boolean } from "zod";
import BannerVideo from "../assets/banner.mp4";
import DarkModeToggle from "./DarkModeToggle";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  backLink?: string;
  loading?: boolean;
  error?: Error | null;
  empty?: boolean;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  iconClassName?: string;
}

function PageLayout({
  title,
  subtitle,
  icon: Icon,
  backLink,
  loading,
  error,
  empty,
  children,
  actions,
  iconClassName,
}: PageLayoutProps) {
  const [open, setOpen] = useState<boolean>(false);

  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
  }, []);

  return (
    <>
      <Navbar setOpen={setOpen} open={open} />
      {/* Dark Mode Toggle */}
      <div
        className={`fixed ${
          open ? "left-48" : "left-4"
        } bottom-4  md:left-48 z-[100]`}
      >
        <DarkModeToggle />
      </div>
      <div className="p-2 md:p-8 md:ml-64 ml-0 overflow-x-auto">
        <MenuIcon
          className={`ml-2 mt-2 size-8 cursor-pointer ${
            !open ? "opacity-100" : "opacity-0"
          } md:hidden`}
          onClick={() => setOpen((prevState) => !prevState)}
        />
        <div className="mb-8 relative h-[30rem] overflow-hidden rounded-xl mt-4">
          {/* Video Banner */}
          <video
            ref={vidRef}     
            autoPlay
            muted
            loop
            controls={false}
            className="w-full h-[20rem] md:h-[30rem] absolute z-10 "
            height="100%"
            width="100%"
            style={{
              objectFit: "cover",
              backgroundSize: "cover !important",
              backgroundRepeat: "no-repeat !important",
            }}
          >
            <source src={BannerVideo} type="video/mp4" />
          </video>

          <div className="flex flex-col z-30 p-8">
            {backLink && (
              <Link
                to={backLink}
                className="inline-flex items-center text-white hover:text-brand-primary-DEFAULT/80 hover:text-white/90 mb-4 z-30"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            )}
            <div className="flex items-center justify-between z-30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background-light dark:bg-background-darker rounded-lg">
                  <Icon className={iconClassName} />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-semibold text-white dark:text-text-dark">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-sm text-white mt-1 font-mono">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              {actions && <div className="text-white">{actions}</div>}
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} />
        ) : empty ? (
          <EmptyState message={`No ${title.toLowerCase()} found`} icon={Icon} />
        ) : (
          <div className="p-2 sm:p-8 -mt-80 md:-mt-48">{children}</div>
        )}
      </div>
    </>
  );
}

export default PageLayout;
