import '../../../../core/api/api_client.dart';
import '../../../../core/api/api_exception.dart';
import '../models/user_model.dart';

class AuthRepository {
  final ApiClient _apiClient;
  AuthRepository(this._apiClient);

  Future<AuthResponse> login(String email, String password) async {
    try {
      final response = await _apiClient.dio.post(
        '/auth/login',
        data: {'email': email, 'password': password},
      );
      return AuthResponse.fromJson(response.data);
    } catch (e) {
      throw parseApiError(e);
    }
  }

  Future<void> registerStore({
    required String storeName,
    required String fullName,
    required String email,
    required String phone,
    required String password,
  }) async {
    try {
      await _apiClient.dio.post(
        '/stores/register',
        data: {
          'storeName': storeName,
          'fullName': fullName,
          'email': email,
          'phone': phone,
          'password': password,
        },
      );
    } catch (e) {
      throw parseApiError(e);
    }
  }
}
