import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@services/authService';

export function middleware(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Укажите защищенные маршруты
};
