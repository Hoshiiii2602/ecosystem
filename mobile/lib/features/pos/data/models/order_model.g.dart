// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'order_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$OrderRequestImpl _$$OrderRequestImplFromJson(Map<String, dynamic> json) =>
    _$OrderRequestImpl(
      branchId: json['branchId'] as String,
      customerId: json['customerId'] as String?,
      items: (json['items'] as List<dynamic>)
          .map((e) => OrderItemRequest.fromJson(e as Map<String, dynamic>))
          .toList(),
      paymentMethod: json['paymentMethod'] as String,
      discount: (json['discount'] as num?)?.toDouble(),
      tax: (json['tax'] as num?)?.toDouble(),
      note: json['note'] as String?,
    );

Map<String, dynamic> _$$OrderRequestImplToJson(_$OrderRequestImpl instance) =>
    <String, dynamic>{
      'branchId': instance.branchId,
      'customerId': instance.customerId,
      'items': instance.items,
      'paymentMethod': instance.paymentMethod,
      'discount': instance.discount,
      'tax': instance.tax,
      'note': instance.note,
    };

_$OrderItemRequestImpl _$$OrderItemRequestImplFromJson(
  Map<String, dynamic> json,
) => _$OrderItemRequestImpl(
  productId: json['productId'] as String,
  variantId: json['variantId'] as String?,
  quantity: (json['quantity'] as num).toInt(),
  price: (json['price'] as num).toDouble(),
  discount: (json['discount'] as num?)?.toDouble(),
);

Map<String, dynamic> _$$OrderItemRequestImplToJson(
  _$OrderItemRequestImpl instance,
) => <String, dynamic>{
  'productId': instance.productId,
  'variantId': instance.variantId,
  'quantity': instance.quantity,
  'price': instance.price,
  'discount': instance.discount,
};
