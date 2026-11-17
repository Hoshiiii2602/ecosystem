import 'package:freezed_annotation/freezed_annotation.dart';

part 'order_model.freezed.dart';
part 'order_model.g.dart';

@freezed
class OrderRequest with _$OrderRequest {
  const factory OrderRequest({
    required String branchId,
    String? customerId,
    required List<OrderItemRequest> items,
    required String paymentMethod,
    double? discount,
    double? tax,
    String? note,
  }) = _OrderRequest;

  factory OrderRequest.fromJson(Map<String, dynamic> json) => _$OrderRequestFromJson(json);
}

@freezed
class OrderItemRequest with _$OrderItemRequest {
  const factory OrderItemRequest({
    required String productId,
    String? variantId,
    required int quantity,
    required double price,
    double? discount,
  }) = _OrderItemRequest;

  factory OrderItemRequest.fromJson(Map<String, dynamic> json) => _$OrderItemRequestFromJson(json);
}
