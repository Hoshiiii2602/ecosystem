import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../../../../core/api/api_client.dart';
import '../../data/repositories/auth_repository_impl.dart';
import '../../data/models/user_model.dart';

final apiClientProvider = Provider((ref) => ApiClient());

final authRepositoryProvider = Provider((ref) {
  final apiClient = ref.watch(apiClientProvider);
  return AuthRepository(apiClient);
});

final authStateProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final repository = ref.watch(authRepositoryProvider);
  return AuthNotifier(repository);
});

class AuthState {
  final UserModel? user;
  final bool isLoading;
  final bool isInitializing; // đang check token lúc khởi động
  final String? error;

  AuthState({
    this.user,
    this.isLoading = false,
    this.isInitializing = true,
    this.error,
  });

  AuthState copyWith({
    UserModel? user,
    bool? isLoading,
    bool? isInitializing,
    String? error,
    bool clearUser = false,
  }) {
    return AuthState(
      user: clearUser ? null : (user ?? this.user),
      isLoading: isLoading ?? this.isLoading,
      isInitializing: isInitializing ?? this.isInitializing,
      error: error,
    );
  }

  bool get isAuthenticated => user != null;
}

class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _repository;
  final _storage = const FlutterSecureStorage();

  AuthNotifier(this._repository) : super(AuthState()) {
    _init();
  }

  /// Khởi động: check token lưu sẵn, nếu có thì load user từ storage
  Future<void> _init() async {
    try {
      final token = await _storage.read(key: 'access_token');
      final userJson = await _storage.read(key: 'user_json');
      if (token != null && userJson != null) {
        final user = UserModel.fromJsonString(userJson);
        state = state.copyWith(user: user, isInitializing: false);
        return;
      }
    } catch (_) {}
    state = state.copyWith(isInitializing: false);
  }

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final response = await _repository.login(email, password);
      await _storage.write(key: 'access_token', value: response.access_token);
      await _storage.write(key: 'refresh_token', value: response.refresh_token);
      await _storage.write(key: 'user_id', value: response.user.id);
      await _storage.write(
        key: 'user_json',
        value: response.user.toJsonString(),
      );
      state = state.copyWith(user: response.user, isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> logout() async {
    await _storage.deleteAll();
    state = AuthState(isInitializing: false);
  }
}
