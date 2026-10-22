class AppConfig {
  final String baseUrl;
  final bool isProduction;

  const AppConfig({
    required this.baseUrl,
    required this.isProduction,
  });
}

class AppEnvironment {
  static const defaultApiUrl = 'https://alan-tek.com/api';

  static const local = AppConfig(
    baseUrl: defaultApiUrl,
    isProduction: false,
  );

  static const production = AppConfig(
    baseUrl: defaultApiUrl,
    isProduction: true,
  );

  // Opcional: uso en red local sin internet (mismo servidor)
  static const lan = AppConfig(
    baseUrl: 'http://192.168.1.43:8081/api',
    isProduction: false,
  );

  static const current = production;
}
