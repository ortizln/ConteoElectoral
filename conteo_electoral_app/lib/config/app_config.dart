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
    baseUrl: 'http://10.0.2.2:8081/api',
    isProduction: false,
  );

  static const production = AppConfig(
    baseUrl: 'http://your-production-server:8080/api',
    isProduction: true,
  );

  static const current = local; // Change to production for release build
}
