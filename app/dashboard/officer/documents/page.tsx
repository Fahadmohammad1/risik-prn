"use client"

// Officers get a read-only Documents Library (view + download).
// Delete is hidden for non-super_admin/admin roles inside the shared view.
import DocumentsLibrary from "@/app/dashboard/super_admin/document/document-library/page"

export default function OfficerDocuments() {
  return <DocumentsLibrary />
}
