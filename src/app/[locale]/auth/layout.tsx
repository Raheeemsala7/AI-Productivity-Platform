/**
 * Auth layout — intentionally minimal.
 * Each auth page wraps itself in <AuthShell> which provides the full
 * 2-column design (dark left panel + right form). No extra wrapper needed.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
