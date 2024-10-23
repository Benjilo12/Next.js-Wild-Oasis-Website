// you can import like this when too many files root
// import Counter from "@/app/_components/Counter";

import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

//this changes the page dynamically from static
//so the 0 is the time the update take effect from the database
export const revalidate = 0;

//metadata
export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  //we use the filter as seachparams which affect url
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        `` Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature`&lsquo`s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        {" "}
        <Filter />
      </div>

      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
