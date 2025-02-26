export enum HttpStatusTypeEnum {
  SUCCESS = 'success', // Respuestas exitosas (2xx)
  ERROR = 'error', // Errores del servidor (5xx)
  WARNING = 'warning', // Advertencias o redirecciones (3xx / 4xx) 
  INFO = 'info', // Información adicional
}
