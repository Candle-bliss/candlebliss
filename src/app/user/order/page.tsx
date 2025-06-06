'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react'; // Add Suspense
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Add useSearchParams
import Header from '@/app/components/user/nav/page';
import Footer from '@/app/components/user/footer/page';
import Toast from '@/app/components/ui/toast/Toast';
import ReturnRequestModal from '@/app/components/user/returnrequest/ReturnRequest';
import { retryOrderPayment } from '@/app/utils/orderUtils';

// Interfaces
interface OrderItem {
   id: number;
   status: string;
   unit_price: string;
   product_detail_id: number;
   product_id: string; // Make sure this exists in the interface
   quantity: number;
   totalPrice: string;
   product?: {
      id: number;
      name: string;
      images: Array<{
         id: string;
         path: string;
         public_id: string;
      }>;
   };
   product_detail?: {
      id: number;
      size: string;
      type: string;
      values: string;
      images: Array<{
         id: string;
         path: string;
         public_id: string;
      }>;
   };
   __entity: string;
   // Add this field to store fetched product detail data
   productDetailData?: {
      id: number;
      size: string;
      type: string;
      values: string;
      quantities: number;
      isActive: boolean;
      images: Array<{
         id: string;
         path: string;
         public_id: string;
      }>;
   };
}

interface Order {
   id: number;
   order_code: string;
   user_id: number;
   status: string;
   address: string;
   total_quantity: number;
   total_price: string;
   discount: string;
   ship_price: string;
   voucher_id: string;
   method_payment: string;
   createdAt: string;
   updatedAt: string;
   item: OrderItem[];
   __entity: string;
}

// Format price helper function
const formatPrice = (price: string | number): string => {
   const numPrice = typeof price === 'string' ? parseFloat(price) : price;
   return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
   }).format(numPrice);
};

// Format date helper function
const formatDate = (dateString: string): string => {
   const date = new Date(dateString);
   return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   });
};

// Trạng thái đơn hàng và màu sắc tương ứng
const orderStatusColors: Record<string, { bg: string; text: string; border: string }> = {
   'Đơn hàng vừa được tạo': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
   'Đang chờ thanh toán': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
   'Thanh toán thất bại': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
   'Thanh toán thành công': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
   'Đang xử lý': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
   'Đang giao hàng': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
   'Hoàn thành': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
   'Đã hủy': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },

   // Đổi trả hàng
   'Đổi trả hàng': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
   'Xác nhận đổi trả': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
   'Đổi trả thành công': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
   'Từ chối đổi trả': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
   'Đổi trả thất bại': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },

   // Trả hàng hoàn tiền
   'Trả hàng hoàn tiền': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
   'Đang chờ hoàn tiền': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
   'Hoàn tiền thành công': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
   'Hoàn tiền thất bại': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

function OrderFilter({ onFilterChange }: { onFilterChange: (filterId: string | null) => void }) {
   const searchParams = useSearchParams();
   const filterStatus = searchParams.get('status');

   useEffect(() => {
      onFilterChange(filterStatus);
   }, [searchParams, onFilterChange]);

   return null;
}

const PaymentCountdown = ({
   createdAt,
   orderId,
   onTimeout,
   status,
}: {
   createdAt: string;
   orderId: number;
   onTimeout: (orderId: number) => void;
   status: string;
}) => {
   const [timeLeft, setTimeLeft] = useState<number>(0);
   const [timedOut, setTimedOut] = useState<boolean>(false);

   useEffect(() => {
      const calculateTimeLeft = () => {
         const createdTime = new Date(createdAt).getTime();
         const now = new Date().getTime();
         const timePassed = now - createdTime;
         const timeoutMs = 15 * 60 * 1000; // 15 minutes

         const remaining = timeoutMs - timePassed;
         return Math.max(0, Math.floor(remaining / 1000)); // Return seconds left
      };

      // Calculate initial time left
      const initialTimeLeft = calculateTimeLeft();
      setTimeLeft(initialTimeLeft);

      // If time already expired, call onTimeout immediately
      if (initialTimeLeft <= 0 && !timedOut) {
         setTimedOut(true);
         onTimeout(orderId);
         return;
      }

      // Set up interval to update countdown every second
      const timer = setInterval(() => {
         const remaining = calculateTimeLeft();
         setTimeLeft(remaining);

         // When time runs out, call callback to update order status
         if (remaining <= 0 && !timedOut) {
            clearInterval(timer);
            setTimedOut(true);
            onTimeout(orderId);
         }
      }, 1000);

      return () => clearInterval(timer);
   }, [createdAt, orderId, onTimeout, timedOut]);

   // Time expired
   if (timeLeft <= 0) {
      return <span className='text-red-600 text-sm font-medium'>Hết thời gian thanh toán</span>;
   }

   // Display time remaining
   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;

   return (
      <span
         className={`text-sm font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-orange-600'}`}
      >
         {status === 'Đang chờ thanh toán' ? 'Thanh toán lại còn: ' : 'Thanh toán còn: '}
         {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
   );
};

// Add this helper function before the OrderPage component
const isDeliveredForTwoDays = (order: Order): boolean => {
   // Check if order is in "Đang giao hàng" status
   if (order.status !== 'Đang giao hàng') return false;

   // Calculate if it's been at least 2 days since the order was updated
   const updatedDate = new Date(order.updatedAt).getTime();
   const now = new Date().getTime();
   const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

   return now - updatedDate >= twoDaysInMs;
};

export default function OrderPage() {
   const router = useRouter();
   const [loading, setLoading] = useState(true);
   const [orders, setOrders] = useState<Order[]>([]);
   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
   const [statusFilter, setStatusFilter] = useState<string | null>(null);
   const [toast, setToast] = useState({
      show: false,
      message: '',
      type: 'info' as 'success' | 'error' | 'info',
   });

   // Add a state to track which product details have been fetched
   const [fetchedDetails, setFetchedDetails] = useState<Record<number, boolean>>({});

   // Add a new state to track which products have been fetched
   const [fetchedProducts, setFetchedProducts] = useState<Record<string, boolean>>({});

   const [returnModalOpen, setReturnModalOpen] = useState(false);
   const [returnType, setReturnType] = useState<'exchange' | 'refund'>('exchange');
   const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

   // Add this state to track which order is currently processing payment
   const [processingPaymentOrderId, setProcessingPaymentOrderId] = useState<number | null>(null);

   // Wrap with useCallback
   const showToastMessage = useCallback((message: string, type: 'success' | 'error' | 'info') => {
      setToast({
         show: true,
         message,
         type,
      });

      // Tự động ẩn sau 3 giây
      setTimeout(() => {
         setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
   }, []);

   // Wrap with useCallback and add dependencies
   const loadOrders = useCallback(
      async (userId: number) => {
         try {
            const token = localStorage.getItem('token');
            if (!token) {
               showToastMessage('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại', 'error');
               router.push('/user/signin');
               return;
            }

            const response = await fetch(
               `http://68.183.226.198:3000/api/orders?user_id=${userId}`,
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               },
            );

            if (!response.ok) {
               throw new Error('Không thể tải danh sách đơn hàng');
            }

            const data = await response.json();

            // Sort orders by createdAt date (newest first)
            const sortedOrders = data.sort((a: Order, b: Order) => {
               return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            setOrders(sortedOrders);

            if (sortedOrders.length === 0) {
               showToastMessage('Bạn chưa có đơn hàng nào', 'info');
            }
         } catch (error) {
            console.error('Error loading orders:', error);
            showToastMessage('Không thể tải danh sách đơn hàng', 'error');
         }
      },
      [router, showToastMessage],
   );

   // Add a function to fetch product details
   const fetchProductDetails = useCallback(
      async (orders: Order[]) => {
         const token = localStorage.getItem('token');
         if (!token) return;

         let hasUpdates = false;
         const updatedOrders = [...orders];

         for (const order of updatedOrders) {
            for (const item of order.item) {
               console.log(`Processing item with product_id: ${item.product_id}, product_detail_id: ${item.product_detail_id}`);

               // First try to fetch product directly using product_id
               if (item.product_id && !fetchedProducts[item.product_id]) {
                  try {
                     console.log(`Fetching product with ID: ${item.product_id}`);
                     const productResponse = await fetch(
                        `http://68.183.226.198:3000/api/products/${item.product_id}`,
                        {
                           headers: {
                              Authorization: `Bearer ${token}`,
                           },
                        },
                     );

                     if (productResponse.ok) {
                        const productData = await productResponse.json();
                        console.log(`Product data fetched:`, productData);

                        // Set the product information, handle both array and object formats for images
                        item.product = {
                           id: productData.id,
                           name: productData.name || "Sản phẩm không tên",
                           images: processProductImages(productData.images),
                        };

                        // Mark product as fetched
                        setFetchedProducts((prev) => ({
                           ...prev,
                           [item.product_id]: true,
                        }));

                        hasUpdates = true;
                        console.log(`Updated item with product data:`, item.product);
                     } else {
                        console.error(`Error fetching product ${item.product_id}, status: ${productResponse.status}`);
                     }
                  } catch (productError) {
                     console.error(`Failed to fetch product for product_id ${item.product_id}:`, productError);
                  }
               }

               // Then fetch product detail info if needed
               if (!fetchedDetails[item.product_detail_id] && item.product_detail_id) {
                  try {
                     console.log(`Fetching product detail with ID: ${item.product_detail_id}`);
                     const detailResponse = await fetch(
                        `http://68.183.226.198:3000/api/product-details/${item.product_detail_id}`,
                        {
                           headers: {
                              Authorization: `Bearer ${token}`,
                           },
                        },
                     );

                     if (detailResponse.ok) {
                        const detailData = await detailResponse.json();
                        console.log(`Product detail data fetched:`, detailData);
                        item.productDetailData = detailData;

                        // Mark detail as fetched
                        setFetchedDetails((prev) => ({
                           ...prev,
                           [item.product_detail_id]: true,
                        }));

                        hasUpdates = true;
                     } else {
                        console.error(`Error fetching product detail ${item.product_detail_id}, status: ${detailResponse.status}`);
                     }
                  } catch (detailError) {
                     console.error(`Failed to fetch details for product_detail_id ${item.product_detail_id}:`, detailError);
                  }
               }
            }
         }

         if (hasUpdates) {
            setOrders(updatedOrders);
            setFilteredOrders(
               statusFilter
                  ? updatedOrders.filter((order) => order.status === statusFilter)
                  : updatedOrders,
            );
         }
      },
      [fetchedDetails, fetchedProducts, statusFilter],
   );

   // Helper function to process product images in different formats
   const processProductImages = (images: Array<{ id: string; path: string; public_id: string }> | { id: string; path: string; public_id: string } | null | undefined) => {
      if (!images) return [];

      // If images is an array
      if (Array.isArray(images)) {
         return images;
      }

      // If images is a single object
      if (typeof images === 'object' && images.path) {
         return [images];
      }

      return [];
   };

   // Update useEffect with all dependencies
   useEffect(() => {
      const init = async () => {
         // Lấy thông tin userId từ localStorage
         const storedUserId = localStorage.getItem('userId');
         if (!storedUserId) {
            // Nếu không có userId, chuyển về trang đăng nhập
            router.push('/user/signin');
            return;
         }

         const userId = parseInt(storedUserId);

         try {
            setLoading(true);
            await loadOrders(userId);
         } catch (error) {
            console.error('Error initializing data:', error);
            showToastMessage('Có lỗi xảy ra khi tải dữ liệu', 'error');
         } finally {
            setLoading(false);
         }
      };

      init();
   }, [router, loadOrders, showToastMessage]);

   // Call fetchProductDetails when orders change
   useEffect(() => {
      if (orders.length > 0) {
         fetchProductDetails(orders);
      }
   }, [orders, fetchProductDetails]);

   // Modified handleCancelOrder function to only allow cancellation in specific statuses
   const handleCancelOrder = async (orderId: number) => {
      if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
         return;
      }

      // Find the order
      const orderToCancel = orders.find(order => order.id === orderId);

      // Check if order exists and is in a status that can be cancelled
      if (!orderToCancel) {
         showToastMessage('Không tìm thấy đơn hàng', 'error');
         return;
      }

      // Only allow cancellation for orders in "Đơn hàng vừa được tạo" or "Đang xử lý" status
      if (orderToCancel.status !== 'Đơn hàng vừa được tạo' && orderToCancel.status !== 'Đang xử lý') {
         showToastMessage('Đơn hàng này không thể hủy ở trạng thái hiện tại', 'error');
         return;
      }

      try {
         setLoading(true);
         const token = localStorage.getItem('token');

         if (!token) {
            showToastMessage('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại', 'error');
            router.push('/user/signin');
            return;
         }

         // Use query parameter for status
         const encodedStatus = encodeURIComponent('Đã huỷ');
         // Call API to cancel the order
         const response = await fetch(
            `http://68.183.226.198:3000/api/orders/${orderId}/status?status=${encodedStatus}`,
            {
               method: 'PATCH',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               }
            }
         );

         // Handle specific error codes
         if (response.status === 422) {
            const errorData = await response.json();
            showToastMessage(errorData.errors?.status || 'Trạng thái không hợp lệ', 'error');
            return;
         }

         if (!response.ok) {
            throw new Error('Không thể hủy đơn hàng');
         }

         // Update the state after successful API call
         setOrders((prevOrders) =>
            prevOrders.map((order) => (order.id === orderId ? { ...order, status: 'Đã huỷ' } : order))
         );

         showToastMessage('Đơn hàng đã được hủy thành công', 'success');
      } catch (error: unknown) {
         console.error('Error canceling order:', error);

         let errorMessage = 'Không thể hủy đơn hàng';
         if (error instanceof Error) {
            errorMessage = error.message;
         } else if (typeof error === 'object' && error && 'message' in error) {
            errorMessage = String((error as { message: unknown }).message);
         }

         showToastMessage(errorMessage, 'error');
      } finally {
         setLoading(false);
      }
   };

   // Within the OrderPage component, add this new function to handle completing the order
   const handleCompleteOrder = async (orderId: number) => {
      // Show warning confirmation dialog
      if (!confirm('Khi bạn chọn Hoàn thành thì sẽ không thể đổi trả lại hàng, hãy quay clip và kiểm tra hàng trước khi chọn hoàn thành đơn. Bạn có chắc chắn muốn hoàn thành đơn hàng này?')) {
         return; // If user cancels, exit the function
      }

      try {
         setLoading(true);
         const token = localStorage.getItem('token');

         if (!token) {
            showToastMessage('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại', 'error');
            router.push('/user/signin');
            return;
         }

         // Call API to update the order status to "Hoàn thành"
         const response = await fetch(
            `http://68.183.226.198:3000/api/orders/${orderId}/status`,
            {
               method: 'PATCH',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  status: 'Hoàn thành',
               }),
            }
         );

         if (!response.ok) {
            throw new Error('Không thể cập nhật trạng thái đơn hàng');
         }

         // Update the state after successful API call
         setOrders((prevOrders) =>
            prevOrders.map((order) => (order.id === orderId ? { ...order, status: 'Hoàn thành' } : order))
         );

         showToastMessage('Đơn hàng đã được hoàn thành', 'success');
      } catch (error: unknown) {
         console.error('Error completing order:', error);

         let errorMessage = 'Không thể cập nhật trạng thái đơn hàng';
         if (error instanceof Error) {
            errorMessage = error.message;
         } else if (typeof error === 'object' && error && 'message' in error) {
            errorMessage = String((error as { message: unknown }).message);
         }

         showToastMessage(errorMessage, 'error');
      } finally {
         setLoading(false);
      }
   };

   // Add the handleReturnOrder function
   const handleReturnOrder = (orderId: number) => {
      setSelectedOrderId(orderId);
      setReturnType('exchange');
      setReturnModalOpen(true);
   };

   // Add this new function for handling the return and refund request
   const handleReturnWithRefund = (orderId: number) => {
      setSelectedOrderId(orderId);
      setReturnType('refund');
      setReturnModalOpen(true);
   };

   // Add this new function to handle the form submission from the modal:
   const handleReturnRequestSubmit = async (data: { reason: string; images: File[] }, orderId: number) => {
      try {
         setLoading(true);
         const token = localStorage.getItem('token');

         if (!token) {
            showToastMessage('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại', 'error');
            router.push('/user/signin');
            return;
         }

         // Create FormData to handle file uploads
         const formData = new FormData();
         formData.append('reason', data.reason);
         formData.append('order_id', orderId.toString());
         formData.append('type', returnType === 'exchange' ? 'exchange' : 'refund');

         // Add each image to the formData
         data.images.forEach((image) => {
            formData.append(`images`, image);
         });

         // First, upload the return request with images
         const uploadResponse = await fetch(
            `http://68.183.226.198:3000/api/return-requests`,
            {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${token}`,
               },
               body: formData,
            }
         );

         if (!uploadResponse.ok) {
            throw new Error('Không thể tạo yêu cầu đổi/trả hàng');
         }

         // Then update the order status
         const newStatus = returnType === 'exchange' ? 'Đổi trả hàng' : 'Trả hàng hoàn tiền';
         const encodedStatus = encodeURIComponent(newStatus);

         const statusResponse = await fetch(
            `http://68.183.226.198:3000/api/orders/${orderId}/status?status=${encodedStatus}`,
            {
               method: 'PATCH',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               }
            }
         );

         if (!statusResponse.ok) {
            throw new Error('Không thể cập nhật trạng thái đơn hàng');
         }

         // Update the state after successful API call
         setOrders((prevOrders) =>
            prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
         );

         showToastMessage(
            returnType === 'exchange'
               ? 'Yêu cầu đổi/trả hàng đã được gửi'
               : 'Yêu cầu trả hàng và hoàn tiền đã được gửi',
            'success'
         );
      } catch (error: unknown) {
         console.error('Error submitting return request:', error);

         let errorMessage = 'Có lỗi xảy ra khi gửi yêu cầu';
         if (error instanceof Error) {
            errorMessage = error.message;
         } else if (typeof error === 'object' && error && 'message' in error) {
            errorMessage = String((error as { message: unknown }).message);
         }

         showToastMessage(errorMessage, 'error');
      } finally {
         setLoading(false);
      }
   };

   // Handle filter change
   const handleFilterChange = useCallback((filterStatus: string | null) => {
      setStatusFilter(filterStatus);
   }, []);

   // Filter orders when statusFilter or orders change
   useEffect(() => {
      if (!statusFilter) {
         setFilteredOrders(orders);
      } else {
         setFilteredOrders(orders.filter((order) => order.status === statusFilter));
      }
   }, [statusFilter, orders]);

   // Hàm render trạng thái đơn hàng
   const renderOrderStatus = (status: string) => {
      const colorSet = orderStatusColors[status] || {
         bg: 'bg-gray-50',
         text: 'text-gray-700',
         border: 'border-gray-200',
      };

      return (
         <span
            className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${colorSet.bg} ${colorSet.text} border ${colorSet.border}`}
         >
            {status}
         </span>
      );
   };

   // Hàm để lấy biểu tượng phương thức thanh toán
   const getPaymentMethodIcon = (method: string) => {
      switch (method) {
         case 'COD':
            return '/images/logo.png';
         case 'BANKING':
            return '/images/payment/bank.png';
         case 'MOMO':
            return '/images/momo-logo.png';
         default:
            return '/images/payment/cod.png';
      }
   };

   // Thêm hàm này trong component OrderPage

   // Hàm cập nhật trạng thái đơn hàng khi hết thời gian thanh toán
   const handlePaymentTimeout = useCallback(
      async (orderId: number) => {
         try {
            const token = localStorage.getItem('token');
            if (!token) return;

            // First update to "Thanh toán thất bại"
            const response = await fetch(
               `http://68.183.226.198:3000/api/orders/${orderId}/status`,
               {
                  method: 'PATCH',
                  headers: {
                     Authorization: `Bearer ${token}`,
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     status: 'Thanh toán thất bại',
                  }),
               },
            );

            if (response.ok) {
               // Cập nhật state để hiển thị trạng thái mới
               setOrders((prevOrders) =>
                  prevOrders.map((order) =>
                     order.id === orderId ? { ...order, status: 'Thanh toán thất bại' } : order,
                  ),
               );

               // Then update to "Đã hủy" after a short delay
               setTimeout(async () => {
                  const cancelResponse = await fetch(
                     `http://68.183.226.198:3000/api/orders/${orderId}/status`,
                     {
                        method: 'PATCH',
                        headers: {
                           Authorization: `Bearer ${token}`,
                           'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                           status: 'Đã hủy',
                        }),
                     },
                  );

                  if (cancelResponse.ok) {
                     setOrders((prevOrders) =>
                        prevOrders.map((order) =>
                           order.id === orderId ? { ...order, status: 'Đã hủy' } : order,
                        ),
                     );
                  }
               }, 1000); // Wait 1 second before updating to cancelled

               // Hiển thị thông báo
               showToastMessage(`Đơn hàng #${orderId} đã hết thời gian thanh toán`, 'error');
            } else {
               console.error('Failed to update order status:', await response.text());
            }
         } catch (error) {
            console.error('Error handling payment timeout:', error);
         }
      },
      [showToastMessage],
   );

   // Thêm hàm kiểm tra các đơn hàng chưa thanh toán khi component mount
   const checkPendingPayments = useCallback(() => {
      // Filter orders that are either newly created or waiting for payment (non-COD)
      const pendingOrders = orders.filter(
         (order) => (
            (order.status === 'Đơn hàng vừa được tạo' || order.status === 'Đang chờ thanh toán')
            && order.method_payment !== 'COD'
         )
      );

      if (pendingOrders.length > 0) {
         // Show warning toast - only show when there are orders needing payment
         showToastMessage(
            'Lưu ý: Đơn hàng sẽ tự động hủy nếu không thanh toán trong vòng 15 phút',
            'info',
         );
      }

      // Check for orders that have passed the payment deadline
      const now = new Date().getTime();
      pendingOrders.forEach((order) => {
         const createdTime = new Date(order.createdAt).getTime();
         const timePassed = now - createdTime;
         const timeoutMs = 15 * 60 * 1000; // 15 minutes

         if (timePassed >= timeoutMs) {
            // Automatically update status
            handlePaymentTimeout(order.id);
         }
      });
   }, [orders, handlePaymentTimeout, showToastMessage]);

   // Thêm useEffect này sau các useEffect hiện có

   // Kiểm tra đơn hàng chưa thanh toán khi component mount
   useEffect(() => {
      if (orders.length > 0) {
         checkPendingPayments();
      }
   }, [orders, checkPendingPayments]);

   // Fix the handleCODOrderStatus function
   // Removed duplicate declaration of handleCODOrderStatus

   const handleCODOrderStatus = useCallback(async () => {
      // Find orders that are COD and have status "Đơn hàng vừa được tạo"
      const codOrdersToUpdate = orders.filter(
         (order) => order.status === 'Đơn hàng vừa được tạo' && order.method_payment === 'COD',
      );

      if (codOrdersToUpdate.length === 0) return;

      const token = localStorage.getItem('token');
      if (!token) return;

      // Update each order's status to "Đang xử lý" (instead of "Đã đặt hàng")
      for (const order of codOrdersToUpdate) {
         try {
            const response = await fetch(
               `http://68.183.226.198:3000/api/orders/${order.id}/status`,
               {
                  method: 'PATCH',
                  headers: {
                     Authorization: `Bearer ${token}`,
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     status: 'Đang xử lý', // Follow the proper timeline for COD orders
                  }),
               },
            );

            if (response.ok) {
               // Update the state locally
               setOrders((prevOrders) =>
                  prevOrders.map((o) => (o.id === order.id ? { ...o, status: 'Đang xử lý' } : o)),
               );
            } else {
               console.error(`Failed to update order ${order.id} status:`, await response.text());
            }
         } catch (error) {
            console.error(`Error updating order ${order.id} status:`, error);
         }
      }
   }, [orders]);

   // Add a new useEffect to run the COD status update
   useEffect(() => {
      if (orders.length > 0) {
         handleCODOrderStatus();
      }
   }, [orders, handleCODOrderStatus]);

   // Add this function inside your OrderPage component
   const handleRetryPayment = async (orderId: number) => {
      try {
         setProcessingPaymentOrderId(orderId); // Set the processing order ID

         // Get the order to check its payment method
         const orderToRetry = orders.find(order => order.id === orderId);
         if (!orderToRetry) {
            showToastMessage('Không tìm thấy đơn hàng', 'error');
            return;
         }

         // Save the pending order ID in localStorage for verification after payment
         localStorage.setItem('pendingOrderId', orderId.toString());

         // Check if it's MOMO payment or other method
         if (orderToRetry.method_payment === 'MOMO') {
            // For MOMO, get a new payment link and redirect
            try {
               const paymentLink = await retryOrderPayment(orderId);

               // Show toast message
               showToastMessage('Đang chuyển đến trang thanh toán MOMO...', 'info');

               // Redirect to MOMO payment page
               window.location.href = paymentLink;
            } catch (error) {
               console.error('Error creating MOMO payment:', error);
               showToastMessage('Không thể tạo liên kết thanh toán MOMO', 'error');
               setLoading(false);
            }
         } else if (orderToRetry.method_payment === 'BANKING') {
            // For BANKING, show banking information
            showToastMessage('Vui lòng chuyển khoản theo thông tin đã cung cấp', 'info');

            // Redirect to order detail page
            router.push(`/user/order/${orderId}`);
         } else {
            // For other payment methods, redirect to payment page
            router.push(`/user/checkout/payment?order_id=${orderId}`);
         }
      } catch (error) {
         console.error('Error processing retry payment:', error);
         showToastMessage('Có lỗi xảy ra khi xử lý thanh toán lại', 'error');
      } finally {
         setProcessingPaymentOrderId(null); // Clear the processing state
      }
   };

   // Add this useEffect near the top of your OrderPage component, after other useEffect hooks
   useEffect(() => {
      const checkMomoPayment = async () => {
         // Check if there's a pending order ID in localStorage
         const pendingOrderId = localStorage.getItem('pendingOrderId');

         // Check if there are URL parameters indicating payment return
         const urlParams = new URLSearchParams(window.location.search);
         const paymentStatus = urlParams.get('status');

         if (pendingOrderId && paymentStatus) {
            try {
               // Clear the pending order ID
               localStorage.removeItem('pendingOrderId');

               if (paymentStatus === 'success') {
                  showToastMessage('Thanh toán thành công!', 'success');

                  // Refresh the orders list to show updated status
                  const storedUserId = localStorage.getItem('userId');
                  if (storedUserId) {
                     const userId = parseInt(storedUserId);
                     await loadOrders(parseInt(userId.toString()));
                  }
               } else {
                  showToastMessage('Thanh toán thất bại. Vui lòng thử lại hoặc chọn phương thức khác', 'error');
               }
            } catch (error) {
               console.error('Error verifying MOMO payment:', error);
            }
         }
      };

      checkMomoPayment();
   }, []);

   if (loading) {
      return (
         <div className='bg-[#F1EEE9] min-h-screen'>
            <Header />
            <div className='container mx-auto px-4 py-12 flex justify-center items-center'>
               <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
            </div>
            <Footer />
         </div>
      );
   }

   return (
      <div className='bg-[#F1EEE9] min-h-screen'>
         <Header />

         {/* Wrap the search params usage in Suspense */}
         <Suspense fallback={<div>Loading filters...</div>}>
            <OrderFilter onFilterChange={handleFilterChange} />
         </Suspense>

         {/* Toast notification */}
         <div className='fixed top-4 right-4 z-50'>
            <Toast
               show={toast.show}
               message={toast.message}
               type={toast.type}
               onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />
         </div>

         <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-medium mb-6'>Đơn hàng của tôi</h1>

            {/* Add filter tabs */}
            <div className='flex overflow-x-auto mb-6 gap-2'>
               <Link
                  href='/user/order'
                  className={`px-4 py-2 whitespace-nowrap rounded-md ${!statusFilter
                     ? 'bg-orange-100 text-orange-700 font-medium'
                     : 'bg-white hover:bg-gray-100'
                     }`}
               >
                  Tất cả
               </Link>
               {Object.keys(orderStatusColors).map((status) => (
                  <Link
                     key={status}
                     href={`/user/order?status=${encodeURIComponent(status)}`}
                     className={`px-4 py-2 whitespace-nowrap rounded-md ${statusFilter === status
                        ? 'bg-orange-100 text-orange-700 font-medium'
                        : 'bg-white hover:bg-gray-100'
                        }`}
                  >
                     {status}
                  </Link>
               ))}
            </div>

            {filteredOrders.length === 0 ? (
               <div className='bg-white rounded-lg shadow p-8 text-center'>
                  <div className='flex flex-col items-center'>
                     <h3 className='text-xl font-medium mb-2'>Bạn chưa có đơn hàng nào</h3>
                     <p className='text-gray-500 mb-6'>
                        Hãy trải nghiệm mua sắm và quay lại đây để xem đơn hàng của bạn
                     </p>
                     <Link
                        href='/user/products'
                        className='bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700'
                     >
                        Mua sắm ngay
                     </Link>
                  </div>
               </div>
            ) : (
               <div className='space-y-6'>
                  {filteredOrders.map((order) => (
                     <div key={order.id} className='bg-white rounded-lg shadow overflow-hidden'>
                        {/* Order header */}
                        <div className='p-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-2'>
                           <div>
                              <p className='text-sm text-gray-500'>
                                 Mã đơn hàng:{' '}
                                 <span className='font-medium text-gray-800'>
                                    {order.order_code}
                                 </span>
                              </p>
                              <p className='text-sm text-gray-500'>
                                 Ngày đặt:{' '}
                                 <span className='font-medium text-gray-800'>
                                    {formatDate(order.createdAt)}
                                 </span>
                              </p>

                              {/* Add countdown timer for both newly created and waiting for payment status */}
                              {(order.status === 'Đơn hàng vừa được tạo' || order.status === 'Đang chờ thanh toán') &&
                                 order.method_payment !== 'COD' && (
                                    <PaymentCountdown
                                       createdAt={order.createdAt}
                                       orderId={order.id}
                                       onTimeout={handlePaymentTimeout}
                                       status={order.status}
                                    />
                                 )}
                           </div>
                           <div className='flex items-center'>
                              {order.method_payment && (
                                 <div className='flex items-center mr-4 bg-gray-50 px-3 py-1 rounded-full'>
                                    <Image
                                       src={getPaymentMethodIcon(order.method_payment)}
                                       alt={order.method_payment}
                                       width={16}
                                       height={16}
                                       className='mr-1'
                                    />
                                    <span className='text-xs text-gray-700'>
                                       {order.method_payment === 'COD'
                                          ? 'Thanh toán khi nhận hàng'
                                          : order.method_payment === 'BANKING'
                                             ? 'Chuyển khoản ngân hàng'
                                             : order.method_payment === 'MOMO'
                                                ? 'Ví MoMo'
                                                : 'Không xác định'}
                                    </span>
                                 </div>
                              )}
                              {renderOrderStatus(order.status)}
                           </div>
                        </div>

                        {/* Order items */}
                        <div className='p-4'>
                           {order.item.map((item, index) => (
                              <div
                                 key={item.id}
                                 className={`flex py-3 ${index < order.item.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                              >
                                 <div className='relative w-16 h-16 bg-gray-100 rounded'>
                                    {/* Use product images instead of product detail images */}
                                    <Image
                                       src={
                                          item.product?.images?.[0]?.path ||
                                          '/images/default-product.png'
                                       }
                                       alt={
                                          item.product?.name ||
                                          `Sản phẩm #${item.product_detail_id}`
                                       }
                                       fill
                                       sizes='64px'
                                       style={{ objectFit: 'contain' }}
                                       className='p-2'
                                    />
                                 </div>
                                 <div className='ml-3 flex-1'>
                                    <div className='flex justify-between'>
                                       <div>
                                          <p className='font-medium text-sm'>
                                             {item.product?.name ||
                                                `Sản phẩm #${item.product_detail_id}`}
                                          </p>
                                          {(item.productDetailData || item.product_detail) && (
                                             <p className='text-xs text-gray-500'>
                                                {item.productDetailData?.size ||
                                                   item.product_detail?.size}{' '}
                                                -{' '}
                                                {item.productDetailData?.values ||
                                                   item.product_detail?.values}
                                             </p>
                                          )}
                                       </div>
                                       <p className='text-orange-600 font-medium text-sm'>
                                          {formatPrice(item.totalPrice)}
                                       </p>
                                    </div>
                                    <div className='flex justify-between mt-1'>
                                       <span className='text-xs text-gray-500'>
                                          Đơn giá: {formatPrice(item.unit_price)}
                                       </span>
                                       <span className='text-xs text-gray-500'>
                                          x{item.quantity}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>

                        {/* Order summary */}
                        <div className='bg-gray-50 p-4'>
                           <div className='flex justify-between text-sm'>
                              <span className='text-gray-600'>Tổng số sản phẩm:</span>
                              <span>{order.total_quantity}</span>
                           </div>

                           {parseFloat(order.discount) > 0 && (
                              <div className='flex justify-between text-sm mt-1'>
                                 <span className='text-gray-600'>Giảm giá:</span>
                                 <span className='text-green-600'>
                                    -{formatPrice(order.discount)}
                                 </span>
                              </div>
                           )}

                           <div className='flex justify-between text-sm mt-1'>
                              <span className='text-gray-600'>Phí vận chuyển:</span>
                              <span>{formatPrice(order.ship_price)}</span>
                           </div>

                           <div className='flex justify-between mt-2 pt-2 border-t border-gray-200'>
                              <span className='font-medium'>Tổng thanh toán:</span>
                              <span className='font-bold text-orange-600'>
                                 {formatPrice(order.total_price)}
                              </span>
                           </div>

                           <div className='flex justify-between items-center mt-4'>
                              <span className='text-sm text-gray-600'>
                                 Địa chỉ giao hàng: {order.address}
                              </span>
                              <div className='flex space-x-2'>
                                 <Link
                                    href={`/user/order/${order.id}`}
                                    className='text-sm text-orange-600 border border-orange-300 bg-white hover:bg-orange-50 px-3 py-1 rounded'
                                 >
                                    Chi tiết
                                 </Link>

                                 {/* Add Retry Payment button for waiting orders */}
                                 {order.status === 'Đang chờ thanh toán' && (() => {
                                    // Calculate if it's still within 15 minutes
                                    const createdTime = new Date(order.createdAt).getTime();
                                    const now = new Date().getTime();
                                    const timePassed = now - createdTime;
                                    const timeoutMs = 15 * 60 * 1000; // 15 minutes

                                    if (timePassed < timeoutMs) {
                                       return (
                                          <button
                                             onClick={() => handleRetryPayment(order.id)}
                                             disabled={processingPaymentOrderId === order.id}
                                             className='text-sm text-blue-600 border border-blue-300 bg-white hover:bg-blue-50 px-3 py-1 rounded flex items-center'
                                          >
                                             {processingPaymentOrderId === order.id ? (
                                                <>
                                                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                   </svg>
                                                   Đang xử lý...
                                                </>
                                             ) : (
                                                'Thanh toán lại'
                                             )}
                                          </button>
                                       );
                                    }
                                    return null;
                                 })()}

                                 {/* Cancel button for new or processing or waiting for payment orders */}
                                 {(order.status === 'Đơn hàng vừa được tạo' ||
                                    order.status === 'Đang xử lý' ||
                                    order.status === 'Đang chờ thanh toán') && (
                                       <button
                                          onClick={() => handleCancelOrder(order.id)}
                                          className='text-sm text-red-600 border border-red-300 bg-white hover:bg-red-50 px-3 py-1 rounded'
                                       >
                                          Hủy đơn
                                       </button>
                                    )}

                                 {/* Rest of your buttons... */}
                                 {isDeliveredForTwoDays(order) && (
                                    <button
                                       onClick={() => handleCompleteOrder(order.id)}
                                       className='text-sm text-green-600 border border-green-300 bg-white hover:bg-green-50 px-3 py-1 rounded'
                                    >
                                       Hoàn thành
                                    </button>
                                 )}

                                 {/* Return/Exchange buttons */}
                                 <button
                                    onClick={() => handleReturnOrder(order.id)}
                                    className='text-sm text-purple-600 border border-purple-300 bg-white hover:bg-purple-50 px-3 py-1 rounded'
                                 >
                                    Đổi/Trả
                                 </button>
                                 <button
                                    onClick={() => handleReturnWithRefund(order.id)}
                                    className='text-sm text-yellow-600 border border-yellow-300 bg-white hover:bg-yellow-50 px-3 py-1 rounded'
                                 >
                                    Trả hàng hoàn tiền
                                 </button>

                                 {/* Show Review button */}
                                 {(order.status === 'Hoàn thành' || order.status === 'Đổi trả thành công') && (
                                    <Link
                                       href={`/user/order/rating`}
                                       className='text-sm text-green-600 border border-green-300 bg-white hover:bg-green-50 px-3 py-1 rounded'
                                    >
                                       Đánh giá
                                    </Link>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

         <Footer />
         {selectedOrderId !== null && (
            <ReturnRequestModal
               isOpen={returnModalOpen}
               onClose={() => setReturnModalOpen(false)}
               onSubmit={handleReturnRequestSubmit}
               orderId={selectedOrderId} type={'exchange'} />
         )}
         {/* Return Request Modal */}
         {selectedOrderId && (
            <ReturnRequestModal
               isOpen={returnModalOpen}
               orderId={selectedOrderId}
               type={returnType}
               onClose={() => setReturnModalOpen(false)}
               onSubmit={handleReturnRequestSubmit}
            />
         )}
      </div>
   );
}
