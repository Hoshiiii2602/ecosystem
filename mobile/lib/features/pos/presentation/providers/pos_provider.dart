import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/repositories/pos_repository.dart';
import '../../data/models/order_request.dart';
import '../../data/models/order_item_request.dart';
import 'cart_provider.dart';
import '../../../auth/presentation/providers/auth_provider.dart';

final posRepositoryProvider = Provider((ref) {
  final apiClient = ref.watch(apiClientProvider);
  return POSRepository(apiClient);
});

final checkoutStateProvider = StateProvider<AsyncValue<void>>((ref) => const AsyncValue.data(null));

class POSNotifier {
  final Ref _ref;
  final POSRepository _repository;

  POSNotifier(this._ref, this._repository);

  Future<void> checkout(String paymentMethod) async {
    final cart = _ref.read(cartProvider);
    if (cart.items.isEmpty) return;

    _ref.read(checkoutStateProvider.notifier).state = const AsyncValue.loading();

    try {
      // Get branch ID from store info
      final storeInfo = await _repository.getStoreInfo();
      final branches = storeInfo['branches'] as List?;
      if (branches == null || branches.isEmpty) {
        throw Exception('Không tìm thấy chi nhánh');
      }
      final branchId = branches[0]['id'] as String;

      final request = OrderRequest(
        branchId: branchId,
        paymentMethod: paymentMethod,
        items: cart.items.map((item) => OrderItemRequest(
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.salePrice,
        )).toList(),
      );

      await _repository.checkout(request);
      _ref.read(cartProvider.notifier).clear();
      _ref.read(checkoutStateProvider.notifier).state = const AsyncValue.data(null);
    } catch (e, stack) {
      _ref.read(checkoutStateProvider.notifier).state = AsyncValue.error(e, stack);
    }
  }
}

final posNotifierProvider = Provider((ref) {
  final repository = ref.watch(posRepositoryProvider);
  return POSNotifier(ref, repository);
});
