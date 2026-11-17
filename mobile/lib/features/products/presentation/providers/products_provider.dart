import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../auth/presentation/providers/auth_provider.dart';
import '../../data/models/product_model.dart';
import '../../data/repositories/product_repository.dart';

final productRepositoryProvider = Provider((ref) {
  final apiClient = ref.watch(apiClientProvider);
  return ProductRepository(apiClient);
});

final productsProvider = FutureProvider.family<List<ProductModel>, String?>((ref, search) async {
  final repository = ref.watch(productRepositoryProvider);
  return repository.getProducts(search: search);
});
