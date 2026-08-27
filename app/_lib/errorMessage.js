// lib/errors.js
export function translatePrismaError(error) {
  if (error.code === "P2025") {
    return "This project no longer exists — it may have been deleted in another tab.";
  }
  if (error.code === "P2002") {
    return "A project with that title or slug already exists. Please choose a different title.";
  }
  return "Could not save changes to the database. Please try again.";
}