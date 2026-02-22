export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* User Dashboard Layout - Full Width */}
      {children}
    </div>
  );
}
