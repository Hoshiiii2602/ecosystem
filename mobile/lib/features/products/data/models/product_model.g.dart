// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'product_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ProductModelImpl _$$ProductModelImplFromJson(Map<String, dynamic> json) =>
    _$ProductModelImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      sku: json['sku'] as String?,
      barcode: json['barcode'] as String?,
      salePrice: (json['salePrice'] as num).toDouble(),
      costPrice: (json['costPrice'] as num?)?.toDouble(),
      unit: json['unit'] as String?,
      categoryId: json['categoryId'] as String?,
    );

Map<String, dynamic> _$$ProductModelImplToJson(_$ProductModelImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'sku': instance.sku,
      'barcode': instance.barcode,
      'salePrice': instance.salePrice,
      'costPrice': instance.costPrice,
      'unit': instance.unit,
      'categoryId': instance.categoryId,
    };
