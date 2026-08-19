class AppConfig {
  final String baseUrl;
  final bool isProduction;

  const AppConfig({
    required this.baseUrl,
    required this.isProduction,
  });
}

class AppEnvironment {
  static const local = AppConfig(
    baseUrl: 'http://192.168.1.43:8081/api',
    isProduction: false,
  );

  static const production = AppConfig(
    baseUrl: 'http://192.168.1.43:8081/api',
    isProduction: true,
  );

  static const current = local; // Change to production for release build
}
