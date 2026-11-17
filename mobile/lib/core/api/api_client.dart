import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiClient {
  late Dio _dio;
  final _storage = const FlutterSecureStorage();

  static const _baseUrl = 'https://canister-defective-boxlike.ngrok-free.dev';

  ApiClient() {
    _dio = Dio(
      BaseOptions(
        baseUrl: _baseUrl,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        headers: {'ngrok-skip-browser-warning': 'true'},
      ),
    );

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _storage.read(key: 'access_token');
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          debugPrint('🚀 ${options.method} ${options.uri}');
          return handler.next(options);
        },
        onResponse: (response, handler) {
          debugPrint(
            '✅ [${response.statusCode}] ${response.requestOptions.path}',
          );
          return handler.next(response);
        },
        onError: (DioException e, handler) async {
          // Auto-refresh khi 401
          if (e.response?.statusCode == 401) {
            final refreshed = await _tryRefresh();
            if (refreshed) {
              // Retry request gốc với token mới
              final token = await _storage.read(key: 'access_token');
              final opts = e.requestOptions;
              opts.headers['Authorization'] = 'Bearer $token';
              try {
                final res = await _dio.fetch(opts);
                return handler.resolve(res);
              } catch (_) {}
            }
          }
          debugPrint(
            '❌ [${e.response?.statusCode}] ${e.requestOptions.path}: ${e.message}',
          );
          return handler.next(e);
        },
      ),
    );
  }

  Future<bool> _tryRefresh() async {
    try {
      final userId = await _storage.read(key: 'user_id');
      final refreshToken = await _storage.read(key: 'refresh_token');
      if (userId == null || refreshToken == null) return false;

      final res = await Dio(BaseOptions(baseUrl: _baseUrl)).post(
        '/auth/refresh',
        data: {'userId': userId, 'refreshToken': refreshToken},
        options: Options(headers: {'ngrok-skip-browser-warning': 'true'}),
      );
      await _storage.write(
        key: 'access_token',
        value: res.data['access_token'],
      );
      if (res.data['refresh_token'] != null) {
        await _storage.write(
          key: 'refresh_token',
          value: res.data['refresh_token'],
        );
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  Dio get dio => _dio;
}
