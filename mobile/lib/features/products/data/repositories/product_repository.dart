import '../../../../core/api/api_client.dart';
import '../models/product_model.dart';

class ProductRepository {
  final ApiClient _apiClient;

  ProductRepository(this._apiClient);

  Future<List<ProductModel>> getProducts({String? search}) async {
    try {
      final response = await _apiClient.dio.get(
        '/products',
        queryParameters: {'search': search},
      );
      final List items = response.data['items'];
      return items.map((e) => ProductModel.fromJson(e)).toList();
    } catch (e) {
      rethrow;
    }
  }
}
