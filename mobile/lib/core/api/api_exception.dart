import 'package:dio/dio.dart';

String parseApiError(dynamic error) {
  if (error is DioException) {
    // Server trả về response với message
    if (error.response != null) {
      final data = error.response!.data;
      if (data is Map) {
        final msg = data['message'];
        if (msg is String) return msg;
        if (msg is List && msg.isNotEmpty) return msg.first.toString();
      }
      final status = error.response!.statusCode;
      if (status == 401) return 'Email hoặc mật khẩu không đúng';
      if (status == 409) return 'Email này đã được đăng ký';
      if (status == 404) return 'Không tìm thấy tài nguyên';
      if (status == 500) return 'Lỗi máy chủ, vui lòng thử lại';
      return 'Lỗi ${status ?? "không xác định"}';
    }
    // Không có response (mạng, timeout...)
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.sendTimeout:
        return 'Kết nối quá chậm, vui lòng thử lại';
      case DioExceptionType.connectionError:
        return 'Không thể kết nối máy chủ';
      case DioExceptionType.cancel:
        return 'Yêu cầu đã bị huỷ';
      default:
        return 'Lỗi kết nối không xác định';
    }
  }
  return error.toString();
}
