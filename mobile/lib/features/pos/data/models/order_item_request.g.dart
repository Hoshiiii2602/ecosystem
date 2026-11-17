// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'order_item_request.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

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
