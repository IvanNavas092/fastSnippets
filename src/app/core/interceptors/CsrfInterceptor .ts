import { HttpInterceptorFn } from '@angular/common/http';

export const CsrfInterceptor: HttpInterceptorFn = (req, next) => {
  // only send the token for unsafe methods
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const token = getCookie('csrftoken'); // o sessionStorage si lo usas

    if (token) {
      req = req.clone({
        setHeaders: { 'X-CSRFToken': token }
      });
    }
  }

  return next(req);
};

// function for read the cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
