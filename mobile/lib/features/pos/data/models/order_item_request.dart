import 'package:freezed_annotation/freezed_annotation.dart';

part 'order_item_request.freezed.dart';
part 'order_item_request.g.dart';

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
