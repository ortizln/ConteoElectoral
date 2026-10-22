class ServerUrl {
  /// Normaliza una URL de servidor para que siempre termine en '/api'.
  /// Maneja barras finales, espacios y esquemas faltantes.
  /// El dominio de producción siempre se fuerza a HTTPS (Cloudflare).
  static String normalizeApiUrl(String input) {
    var url = input.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://$url';
    }
    url = _forceHttpsForDomain(url);
    while (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }
    return url.endsWith('/api') ? url : '$url/api';
  }

  static String _forceHttpsForDomain(String url) {
    try {
      final uri = Uri.parse(url);
      final host = uri.host.toLowerCase();
      if (host == 'alan-tek.com' || host == 'www.alan-tek.com') {
        return uri.replace(scheme: 'https').toString();
      }
    } catch (_) {}
    return url;
  }

  /// Elimina el sufijo '/api' final para obtener la URL base (WebSocket, etc).
  static String stripApiSuffix(String url) {
    var u = url.trim();
    if (u.endsWith('/api')) {
      u = u.substring(0, u.length - 4);
    }
    while (u.endsWith('/')) {
      u = u.substring(0, u.length - 1);
    }
    return u;
  }
}
