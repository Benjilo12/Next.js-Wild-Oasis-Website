import { getCabin } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

//using params as Metadata
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

// //making the params page static route
// export async function generateStaticParams() {
//   const cabins = await getCabin();
//   const ids = cabins.map((cabin) => ({
//     cabinId: String(cabin.id), // Use String() to convert to string
//   }));

//   return ids;
// }

export async function generateStaticParams() {
  const cabinIds = ["105", "106", "107", "108", "109", " 110", "111", "112"]; // Replace with real IDs or fetched data
  return cabinIds.map((id) => ({ cabinId: id }));
}

//real page
export default async function Page({ params }) {
  //we use the cabin Id as params
  //fetching cabin id, forget the params inside
  const cabin = await getCabin(params.cabinId);

  // //fetching setting data
  // const setting = await getSettings();
  // //fetching bookings data
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  if (!cabin) {
    notFound();
  }

  //destruction
  // const { id, name, maxCapacity, regularPrice, discount, image, description } =
  //   cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
