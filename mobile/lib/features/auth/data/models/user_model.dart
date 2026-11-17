import 'dart:convert';

class UserModel {
  final String id;
  final String email;
  final String? fullName;
  final String? phone;
  final String storeId;
  final List<String> roles;

  UserModel({
    required this.id,
    required this.email,
    this.fullName,
    this.phone,
    required this.storeId,
    required this.roles,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      fullName: json['fullName'],
      phone: json['phone'],
      storeId: json['storeId'],
      roles: List<String>.from(json['roles'] ?? []),
    );
  }

  factory UserModel.fromJsonString(String jsonStr) {
    return UserModel.fromJson(jsonDecode(jsonStr));
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'email': email,
    'fullName': fullName,
    'phone': phone,
    'storeId': storeId,
    'roles': roles,
  };

  String toJsonString() => jsonEncode(toJson());
}

class AuthResponse {
  final String access_token;
  final String refresh_token;
  final UserModel user;

  AuthResponse({
    required this.access_token,
    required this.refresh_token,
    required this.user,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      access_token: json['access_token'],
      refresh_token: json['refresh_token'] ?? '',
      user: UserModel.fromJson(json['user']),
    );
  }
}
