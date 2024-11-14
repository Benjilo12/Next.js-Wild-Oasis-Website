"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn } from "./auth";
import { signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// For the guest profile form
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  //helps im re-fetch data from cache
  revalidatePath("/account/profile");
}

//deleting reservation
export async function deleteReservation(bookingId) {
  //steps
  // 1) Authentication
  //if no loggin throw an error
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  // if you dont loggin you cant delete resev..to prevent hackers
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  //helps im re-fetch data from cache
  revalidatePath("/account/reservations");
}

//*Editing reservation
export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  //steps
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  // if you dont loggin you cant delete resev..to prevent hackers
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  //Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuest")),
    observations: formData.get("observations").slice(0, 1000),
  };

  //4 Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  //5 Error handling
  if (error) throw new Error("Guest could not be updated");

  // 6 Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  //7 redirecting
  redirect("/account/reservations");
}

// * Sign and out Auth
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
