import 'package:freezed_annotation/freezed_annotation.dart';
import 'order_item_request.dart';

part 'order_request.freezed.dart';
part 'order_request.g.dart';

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
