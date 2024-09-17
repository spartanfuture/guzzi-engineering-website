import React from 'react';

export default function VehicleConversionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* You can add any common elements for all vehicle conversion pages here */}
      <main>{children}</main>
    </div>
  );
}
