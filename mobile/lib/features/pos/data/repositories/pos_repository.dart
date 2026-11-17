import '../../../../core/api/api_client.dart';
import '../models/order_request.dart';

class POSRepository {
  final ApiClient _apiClient;

  POSRepository(this._apiClient);

  Future<void> checkout(OrderRequest request) async {
    try {
      await _apiClient.dio.post(
        '/orders/checkout',
        data: request.toJson(),
      );
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> getStoreInfo() async {
    try {
      final response = await _apiClient.dio.get('/stores/me');
      return response.data;
    } catch (e) {
      rethrow;
    }
  }
}
