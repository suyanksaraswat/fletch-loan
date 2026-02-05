import { NextResponse } from 'next/server';

import { withAuth } from 'next-auth/middleware';

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         return !!token
//       },
//     },
//     pages: {
//       signIn: '/login',
//     },
//   }
// );

export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - login (login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
