import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/cart_provider.dart';
import '../providers/pos_provider.dart';
import '../../../products/presentation/providers/products_provider.dart';
import '../../../products/data/models/product_model.dart';
import '../../../auth/presentation/providers/auth_provider.dart';

class POSScreen extends ConsumerStatefulWidget {
  const POSScreen({super.key});

  @override
  ConsumerState<POSScreen> createState() => _POSScreenState();
}

class _POSScreenState extends ConsumerState<POSScreen> {
  final _searchCtrl = TextEditingController();
  String _search = '';

  static const _blue = Color(0xFF1A73E8);
  static const _bg = Color(0xFFF0F4F8);

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cart = ref.watch(cartProvider);
    final checkoutState = ref.watch(checkoutStateProvider);
    final productsAsync = ref.watch(productsProvider(_search));
    final user = ref.watch(authStateProvider).user;

    ref.listen<AsyncValue<void>>(checkoutStateProvider, (prev, next) {
      next.whenOrNull(
        error: (e, _) => _snack(e.toString(), error: true),
        data: (_) {
          if (prev?.isLoading == true) _snack('Thanh toán thành công! 🎉');
        },
      );
    });

    return Scaffold(
      backgroundColor: _bg,
      body: Column(
        children: [
          // ── Top bar ──────────────────────────────────────────
          _TopBar(user: user, blue: _blue),
          // ── Body ─────────────────────────────────────────────
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // LEFT: products
                Expanded(
                  flex: 7,
                  child: Column(
                    children: [
                      _SearchBar(
                        controller: _searchCtrl,
                        onChanged: (v) => setState(() => _search = v),
                        onClear: () {
                          _searchCtrl.clear();
                          setState(() => _search = '');
                        },
                        blue: _blue,
                      ),
                      Expanded(
                        child: productsAsync.when(
                          data: (products) => products.isEmpty
                              ? _EmptyProducts(search: _search)
                              : _ProductGrid(products: products),
                          loading: () => const Center(
                            child: CircularProgressIndicator(
                              color: _blue,
                              strokeWidth: 2.5,
                            ),
                          ),
                          error: (e, _) => Center(
                            child: Text(
                              'Lỗi tải sản phẩm: $e',
                              style: const TextStyle(color: Colors.red),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                // RIGHT: cart
                _CartPanel(
                  cart: cart,
                  checkoutState: checkoutState,
                  blue: _blue,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _snack(String msg, {bool error = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              error ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
              size: 18,
            ),
            const SizedBox(width: 8),
            Expanded(child: Text(msg)),
          ],
        ),
        backgroundColor: error
            ? const Color(0xFFD93025)
            : const Color(0xFF1E8E3E),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(16),
        duration: const Duration(seconds: 2),
      ),
    );
  }
}

// ─── Top bar ──────────────────────────────────────────────────────────────────
class _TopBar extends ConsumerWidget {
  final dynamic user;
  final Color blue;

  const _TopBar({required this.user, required this.blue});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      color: blue,
      padding: EdgeInsets.only(
        top: MediaQuery.of(context).padding.top + 6,
        left: 16,
        right: 12,
        bottom: 10,
      ),
      child: Row(
        children: [
          const Icon(Icons.store_rounded, color: Colors.white, size: 22),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'ECOSYSTEM POS',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 0.5,
                  ),
                ),
                if (user?.fullName != null)
                  Text(
                    user!.fullName!,
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 11.5,
                    ),
                  ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(
              Icons.logout_rounded,
              color: Colors.white70,
              size: 22,
            ),
            onPressed: () => ref.read(authStateProvider.notifier).logout(),
            tooltip: 'Đăng xuất',
          ),
        ],
      ),
    );
  }
}

// ─── Search bar ───────────────────────────────────────────────────────────────
class _SearchBar extends StatelessWidget {
  final TextEditingController controller;
  final ValueChanged<String> onChanged;
  final VoidCallback onClear;
  final Color blue;

  const _SearchBar({
    required this.controller,
    required this.onChanged,
    required this.onClear,
    required this.blue,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
      child: TextField(
        controller: controller,
        style: const TextStyle(fontSize: 14),
        onChanged: onChanged,
        decoration: InputDecoration(
          hintText: 'Tìm theo tên, mã SKU, barcode...',
          hintStyle: const TextStyle(color: Color(0xFFADB5BD), fontSize: 13.5),
          prefixIcon: const Icon(
            Icons.search,
            color: Color(0xFFADB5BD),
            size: 20,
          ),
          suffixIcon: controller.text.isNotEmpty
              ? GestureDetector(
                  onTap: onClear,
                  child: const Icon(
                    Icons.close,
                    color: Color(0xFFADB5BD),
                    size: 18,
                  ),
                )
              : null,
          filled: true,
          fillColor: const Color(0xFFF8F9FA),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(9),
            borderSide: const BorderSide(color: Color(0xFFE9ECEF)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(9),
            borderSide: const BorderSide(color: Color(0xFFE9ECEF)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(9),
            borderSide: BorderSide(color: blue, width: 1.5),
          ),
          contentPadding: const EdgeInsets.symmetric(
            vertical: 11,
            horizontal: 14,
          ),
        ),
      ),
    );
  }
}

// ─── Product grid ─────────────────────────────────────────────────────────────
class _ProductGrid extends ConsumerWidget {
  final List<ProductModel> products;
  const _ProductGrid({required this.products});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GridView.builder(
      padding: const EdgeInsets.all(10),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 0.78,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: products.length,
      itemBuilder: (context, i) => _ProductTile(product: products[i]),
    );
  }
}

class _ProductTile extends ConsumerWidget {
  final ProductModel product;
  const _ProductTile({required this.product});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartItems = ref.watch(cartProvider).items;
    final qty = cartItems
        .where((i) => i.product.id == product.id)
        .fold(0, (s, i) => s + i.quantity);
    final inCart = qty > 0;

    return GestureDetector(
      onTap: () => ref.read(cartProvider.notifier).addToCart(product),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: inCart ? const Color(0xFF1A73E8) : Colors.transparent,
            width: 2,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.055),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Image area
            Expanded(
              child: Stack(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      color: inCart
                          ? const Color(0xFFE8F0FE)
                          : const Color(0xFFF3F6FA),
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(8),
                      ),
                    ),
                    child: Center(
                      child: Icon(
                        Icons.inventory_2_outlined,
                        size: 42,
                        color: inCart
                            ? const Color(0xFF1A73E8)
                            : Colors.grey[300],
                      ),
                    ),
                  ),
                  if (inCart)
                    Positioned(
                      top: 7,
                      right: 7,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 7,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFF1A73E8),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          'x$qty',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            // Info
            Padding(
              padding: const EdgeInsets.fromLTRB(9, 7, 9, 9),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.name,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 12.5,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF1F2937),
                      height: 1.3,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _fmt(product.salePrice),
                    style: const TextStyle(
                      fontSize: 13.5,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF1A73E8),
                    ),
                  ),
                  if (product.unit != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      product.unit!,
                      style: const TextStyle(
                        fontSize: 11,
                        color: Color(0xFF9CA3AF),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _fmt(double price) {
    return '${price.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]}.')}đ';
  }
}

// ─── Empty state ──────────────────────────────────────────────────────────────
class _EmptyProducts extends StatelessWidget {
  final String search;
  const _EmptyProducts({required this.search});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.search_off_rounded, size: 56, color: Colors.grey[200]),
          const SizedBox(height: 12),
          Text(
            search.isEmpty ? 'Chưa có sản phẩm' : 'Không tìm thấy "$search"',
            style: TextStyle(color: Colors.grey[400], fontSize: 14),
          ),
          if (search.isEmpty)
            Padding(
              padding: const EdgeInsets.only(top: 6),
              child: Text(
                'Thêm sản phẩm từ CMS',
                style: TextStyle(color: Colors.grey[400], fontSize: 12.5),
              ),
            ),
        ],
      ),
    );
  }
}

// ─── Cart panel ───────────────────────────────────────────────────────────────
class _CartPanel extends ConsumerWidget {
  final CartState cart;
  final AsyncValue<void> checkoutState;
  final Color blue;

  const _CartPanel({
    required this.cart,
    required this.checkoutState,
    required this.blue,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final total = cart.total;
    final itemCount = cart.items.fold(0, (s, i) => s + i.quantity);

    return Container(
      width: 268,
      color: Colors.white,
      child: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Color(0xFFF1F3F5))),
            ),
            child: Row(
              children: [
                const Icon(
                  Icons.receipt_long_outlined,
                  color: Color(0xFF1A73E8),
                  size: 20,
                ),
                const SizedBox(width: 8),
                const Expanded(
                  child: Text(
                    'Đơn hàng',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF1F2937),
                    ),
                  ),
                ),
                if (cart.items.isNotEmpty)
                  GestureDetector(
                    onTap: () => ref.read(cartProvider.notifier).clear(),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 3,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFEF2F2),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: const Text(
                        'Xoá tất cả',
                        style: TextStyle(
                          fontSize: 11.5,
                          color: Color(0xFFDC2626),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),

          // Items
          Expanded(
            child: cart.items.isEmpty
                ? _emptyCart()
                : ListView.separated(
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    itemCount: cart.items.length,
                    separatorBuilder: (_, __) =>
                        const Divider(height: 1, color: Color(0xFFF1F3F5)),
                    itemBuilder: (_, i) {
                      final item = cart.items[i];
                      return _CartItem(item: item);
                    },
                  ),
          ),

          // Footer
          Container(
            padding: const EdgeInsets.all(14),
            decoration: const BoxDecoration(
              border: Border(top: BorderSide(color: Color(0xFFF1F3F5))),
            ),
            child: Column(
              children: [
                // Tạm tính
                _SummaryRow(
                  label: 'Tạm tính ($itemCount sp)',
                  value: _fmt(total),
                  bold: false,
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 8),
                  child: Divider(height: 1, color: Color(0xFFF1F3F5)),
                ),
                // Tổng
                _SummaryRow(
                  label: 'TỔNG CỘNG',
                  value: _fmt(total),
                  bold: true,
                  valueColor: blue,
                  valueSize: 18,
                ),
                const SizedBox(height: 12),
                // Nút thanh toán
                SizedBox(
                  width: double.infinity,
                  height: 46,
                  child: ElevatedButton(
                    onPressed: cart.items.isEmpty || checkoutState.isLoading
                        ? null
                        : () => ref.read(posNotifierProvider).checkout('CASH'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF1E8E3E),
                      foregroundColor: Colors.white,
                      disabledBackgroundColor: const Color(0xFFE9ECEF),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      elevation: 0,
                    ),
                    child: checkoutState.isLoading
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              color: Colors.white,
                              strokeWidth: 2.5,
                            ),
                          )
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.payments_outlined, size: 18),
                              const SizedBox(width: 6),
                              Text(
                                'Thanh toán  ${_fmt(total)}',
                                style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ],
                          ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _emptyCart() {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.shopping_cart_outlined, size: 48, color: Colors.grey[200]),
          const SizedBox(height: 10),
          Text(
            'Chưa có sản phẩm nào',
            style: TextStyle(color: Colors.grey[400], fontSize: 13),
          ),
          const SizedBox(height: 4),
          Text(
            'Chạm vào sản phẩm để thêm',
            style: TextStyle(color: Colors.grey[350], fontSize: 12),
          ),
        ],
      ),
    );
  }

  String _fmt(double price) {
    return '${price.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]}.')}đ';
  }
}

class _CartItem extends ConsumerWidget {
  final CartItem item;
  const _CartItem({required this.item});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Product icon
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: const Color(0xFFE8F0FE),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(
              Icons.inventory_2_outlined,
              size: 18,
              color: Color(0xFF1A73E8),
            ),
          ),
          const SizedBox(width: 10),
          // Name + price
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.product.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF1F2937),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  _fmt(item.product.salePrice * item.quantity),
                  style: const TextStyle(
                    fontSize: 12.5,
                    color: Color(0xFF1A73E8),
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 6),
          // Qty controls
          _QtyControl(
            qty: item.quantity,
            onMinus: () => ref
                .read(cartProvider.notifier)
                .updateQuantity(item.product.id, item.quantity - 1),
            onPlus: () =>
                ref.read(cartProvider.notifier).addToCart(item.product),
          ),
        ],
      ),
    );
  }

  String _fmt(double price) {
    return '${price.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]}.')}đ';
  }
}

class _QtyControl extends StatelessWidget {
  final int qty;
  final VoidCallback onMinus;
  final VoidCallback onPlus;

  const _QtyControl({
    required this.qty,
    required this.onMinus,
    required this.onPlus,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: const Color(0xFFE9ECEF)),
        borderRadius: BorderRadius.circular(7),
      ),
      child: Row(
        children: [
          _btn(
            Icons.remove,
            onMinus,
            color: qty == 1 ? const Color(0xFFDC2626) : const Color(0xFF6B7280),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Text(
              '$qty',
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
            ),
          ),
          _btn(Icons.add, onPlus, color: const Color(0xFF1A73E8)),
        ],
      ),
    );
  }

  Widget _btn(IconData icon, VoidCallback onTap, {required Color color}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 26,
        height: 26,
        alignment: Alignment.center,
        child: Icon(icon, size: 15, color: color),
      ),
    );
  }
}

class _SummaryRow extends StatelessWidget {
  final String label;
  final String value;
  final bool bold;
  final Color? valueColor;
  final double? valueSize;

  const _SummaryRow({
    required this.label,
    required this.value,
    required this.bold,
    this.valueColor,
    this.valueSize,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: bold ? 12 : 13,
            fontWeight: bold ? FontWeight.w700 : FontWeight.w400,
            color: bold ? const Color(0xFF374151) : const Color(0xFF6B7280),
            letterSpacing: bold ? 0.3 : 0,
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: valueSize ?? 14,
            fontWeight: bold ? FontWeight.w800 : FontWeight.w600,
            color: valueColor ?? const Color(0xFF1F2937),
          ),
        ),
      ],
    );
  }
}
