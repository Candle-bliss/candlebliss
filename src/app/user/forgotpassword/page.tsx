'use client';
import React, { useState, useEffect } from 'react';
import { EyeIcon } from 'lucide-react';
import NavBar from '@/app/components/user/nav/page';
import Footer from '@/app/components/user/footer/page';
import Toast from '@/app/components/ui/toast/Toast';

export default function ForgotPasswordPage() {
   // Existing form state
   const [email, setEmail] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [hash, setHash] = useState('');

   // Error states
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [confirmPasswordError, setConfirmPasswordError] = useState('');
   const [hashError, setHashError] = useState('');

   // Timer states
   const [countdown, setCountdown] = useState(0);
   const [isTimerActive, setIsTimerActive] = useState(false);

   // Loading states
   const [isSendingOTP, setIsSendingOTP] = useState(false);
   const [isResetting, setIsResetting] = useState(false);

   // Toast state
   const [toast, setToast] = useState({
      show: false,
      message: '',
      type: 'info' as 'success' | 'error' | 'info',
   });

   // Password visibility states
   const [showNewPassword, setShowNewPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   // Regular expressions
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

   // Timer effect
   useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isTimerActive && countdown > 0) {
         interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
         }, 1000);
      } else if (countdown === 0) {
         setIsTimerActive(false);
      }
      return () => clearInterval(interval);
   }, [isTimerActive, countdown]);

<<<<<<< HEAD
   // Cập nhật hàm handleSendOTP để gửi email quên mật khẩu
=======
   // Cập nhật hàm handleSendOTP mà không cần kiểm tra email trước
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
   const handleSendOTP = async () => {
      if (email && !emailError) {
         setIsSendingOTP(true);
         try {
<<<<<<< HEAD
            // Gọi API gửi yêu cầu quên mật khẩu
=======
            // Gọi API gửi OTP và kiểm tra phản hồi
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
            const response = await fetch('http://68.183.226.198:3000/api/v1/auth/forgot/password', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  email,
               }),
            });

            // Xử lý phản hồi an toàn
            let data;
            const responseText = await response.text();

            if (responseText) {
               try {
                  data = JSON.parse(responseText);
               } catch (err) {
                  console.error('JSON parse error:', err);
               }
            }

            // Xử lý các trường hợp
            if (response.ok) {
<<<<<<< HEAD
               // Thành công - email tồn tại và mã hash đã được gửi
               setToast({
                  show: true,
                  message:
                     'Mã xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra cả thư mục spam hoặc junk.',
=======
               // Thành công - email tồn tại và OTP đã được gửi
               setToast({
                  show: true,
                  message:
                     'Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra cả thư mục spam hoặc junk.',
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                  type: 'success',
               });
               setCountdown(180); // 3 phút
               setIsTimerActive(true);
            } else {
               // API trả về lỗi
               if (response.status === 404) {
<<<<<<< HEAD
                  // Email không tồn tại
=======
                  // Email không tồn tại (giả sử mã lỗi 404 = email không tìm thấy)
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                  setToast({
                     show: true,
                     message: 'Email này không tồn tại trong hệ thống. Vui lòng kiểm tra lại.',
                     type: 'error',
                  });
               } else {
                  // Các lỗi khác
                  const errorMessage =
<<<<<<< HEAD
                     data?.message || 'Không thể gửi yêu cầu đặt lại mật khẩu, vui lòng thử lại sau.';
=======
                     data?.message || 'Không thể gửi mã OTP, vui lòng thử lại sau.';
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                  setToast({
                     show: true,
                     message: errorMessage,
                     type: 'error',
                  });
               }
            }
         } catch (error: unknown) {
<<<<<<< HEAD
            console.error('Password reset request error:', error);
=======
            console.error('OTP send error:', error);
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
            let errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';

            if (error instanceof Error) {
               errorMessage = error.message;
            } else if (typeof error === 'object' && error && 'message' in error) {
               errorMessage = String((error as { message: unknown }).message);
            }

            setToast({
               show: true,
               message: errorMessage,
               type: 'error',
            });
         } finally {
            setIsSendingOTP(false);
         }
      }
   };

   // Format time for display
   const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
   };

   // Validation functions
   const validateEmail = (value: string) => {
      setEmail(value);
      if (!value) {
         setEmailError('Email không được để trống');
      } else if (!emailRegex.test(value)) {
         setEmailError('Email không hợp lệ');
      } else {
         setEmailError('');
      }
   };

   const validatePassword = (value: string) => {
      setNewPassword(value);
      if (!value) {
         setPasswordError('Mật khẩu không được để trống');
      } else if (!passwordRegex.test(value)) {
         setPasswordError(
            'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
         );
      } else {
         setPasswordError('');
      }
   };

   const validateConfirmPassword = (value: string) => {
      setConfirmPassword(value);
      if (!value) {
         setConfirmPasswordError('Vui lòng xác nhận mật khẩu');
      } else if (value !== newPassword) {
         setConfirmPasswordError('Mật khẩu xác nhận không khớp');
      } else {
         setConfirmPasswordError('');
      }
   };

   const validateHash = (value: string) => {
      setHash(value);
      if (!value) {
         setHashError('Vui lòng nhập mã xác thực từ email');
      } else {
         setHashError('');
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      validateEmail(email);
      validatePassword(newPassword);
      validateConfirmPassword(confirmPassword);
      validateHash(hash);

<<<<<<< HEAD
      if (emailError || passwordError || confirmPasswordError || hashError) {
=======
      if (emailError || passwordError || confirmPasswordError || otpError) {
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
         return;
      }

      setIsResetting(true);
      try {
         const response = await fetch('http://68.183.226.198:3000/api/v1/auth/reset/password', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
<<<<<<< HEAD
               password: newPassword,
               hash: hash
=======
               email,
               newPassword,
               otp,
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
            }),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.message || 'Không thể đặt lại mật khẩu');
         }

         // Nếu thành công
         setToast({
            show: true,
            message: 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.',
            type: 'success',
         });

         // Chuyển hướng đến trang đăng nhập sau 2 giây
         setTimeout(() => {
            window.location.href = '/user/signin';
         }, 2000);
      } catch (error: unknown) {
         console.error('Password reset error:', error);
         let errorMessage = 'Không thể đặt lại mật khẩu, vui lòng thử lại sau';

         if (error instanceof Error) {
            errorMessage = error.message;
         } else if (typeof error === 'object' && error && 'message' in error) {
            errorMessage = String((error as { message: unknown }).message);
         }

         setToast({
            show: true,
            message: errorMessage,
            type: 'error',
         });
      } finally {
         setIsResetting(false);
      }
   };

   return (
      <div className='min-h-screen flex flex-col'>
         {/* Toast notification */}
         <div className='fixed top-4 right-4 z-50'>
            <Toast
               show={toast.show}
               message={toast.message}
               type={toast.type}
               onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />
         </div>

         <NavBar />
         <hr className='border-b-2 border-b-[#F1EEE9]' />

         <div
            className='flex-grow bg-cover bg-center bg-no-repeat px-4 py-8 md:py-12'
            style={{
               backgroundImage: `url("https://i.imgur.com/i3IlpOo.png")`,
            }}
         >
            <div className='container mx-auto flex justify-center md:justify-end'>
               <div className='w-full max-w-md md:w-96 md:mr-12 lg:mr-24'>
                  <form
                     className='bg-white p-6 md:p-8 rounded-lg shadow-md w-full'
                     onSubmit={handleSubmit}
                  >
                     <h1 className='text-2xl font-semibold text-[#553C26] mb-6 text-center'>
                        Quên mật khẩu
                     </h1>
                     <div className='space-y-4'>
                        {/* Email Field */}
                        <div>
                           <label className='block text-[#553C26] mb-2'>Email của bạn</label>
                           <div className='relative'>
                              <input
                                 type='email'
                                 placeholder='Nhập email'
                                 className='w-full px-4 py-2 border rounded-lg'
                                 value={email}
                                 onChange={(e) => validateEmail(e.target.value)}
                              />
                              <button
                                 type='button'
                                 onClick={handleSendOTP}
                                 disabled={isTimerActive || !email || !!emailError || isSendingOTP}
                                 className={`absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm 
<<<<<<< HEAD
                                    ${isTimerActive
                                       ? 'text-gray-500'
                                       : 'text-[#553C26] hover:text-[#442f1e]'
                                    }
                                    ${isSendingOTP || !email || !!emailError
                                       ? 'cursor-not-allowed opacity-50'
                                       : 'cursor-pointer'
=======
                                    ${
                                       isTimerActive
                                          ? 'text-gray-500'
                                          : 'text-[#553C26] hover:text-[#442f1e]'
                                    }
                                    ${
                                       isSendingOTP || !email || !!emailError
                                          ? 'cursor-not-allowed opacity-50'
                                          : 'cursor-pointer'
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                                    }`}
                              >
                                 {isSendingOTP
                                    ? 'Đang gửi...'
                                    : isTimerActive
<<<<<<< HEAD
                                       ? formatTime(countdown)
                                       : 'Gửi mã'}
=======
                                    ? formatTime(countdown)
                                    : 'Gửi mã'}
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                              </button>
                           </div>
                           {emailError && <p className='text-red-500 text-sm mt-1'>{emailError}</p>}
                        </div>

                        {/* New Password Field */}
                        <div>
                           <label className='block text-[#553C26] mb-2'>Mật khẩu mới</label>
                           <div className='relative'>
                              <input
                                 type={showNewPassword ? 'text' : 'password'}
                                 placeholder='Nhập mật khẩu'
                                 className='w-full px-4 py-2 border rounded-lg'
                                 value={newPassword}
                                 onChange={(e) => validatePassword(e.target.value)}
                              />
                              <button
                                 type='button'
                                 onClick={() => setShowNewPassword(!showNewPassword)}
                                 className='absolute right-3 top-1/2 -translate-y-1/2'
                              >
                                 <EyeIcon className='h-5 w-5 text-gray-500' />
                              </button>
                           </div>
                           {passwordError && (
                              <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
                           )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                           <label className='block text-[#553C26] mb-2'>Nhập lại mật khẩu</label>
                           <div className='relative'>
                              <input
                                 type={showConfirmPassword ? 'text' : 'password'}
                                 placeholder='Nhập mật khẩu'
                                 className='w-full px-4 py-2 border rounded-lg'
                                 value={confirmPassword}
                                 onChange={(e) => validateConfirmPassword(e.target.value)}
                              />
                              <button
                                 type='button'
                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                 className='absolute right-3 top-1/2 -translate-y-1/2'
                              >
                                 <EyeIcon className='h-5 w-5 text-gray-500' />
                              </button>
                           </div>
                           {confirmPasswordError && (
                              <p className='text-red-500 text-sm mt-1'>{confirmPasswordError}</p>
                           )}
                        </div>

                        {/* Hash Field (replacing OTP field) */}
                        <div>
                           <label className='block text-[#553C26] mb-2'>Mã xác thực</label>
                           <input
                              type='text'
                              placeholder='Nhập mã xác thực từ email'
                              className='w-full px-4 py-2 border rounded-lg'
                              value={hash}
                              onChange={(e) => validateHash(e.target.value)}
                           />
                           {hashError && <p className='text-red-500 text-sm mt-1'>{hashError}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                           type='submit'
                           disabled={isResetting}
<<<<<<< HEAD
                           className={`w-full bg-[#553C26] text-white py-3 rounded-lg hover:bg-[#442f1e] transition-colors mt-6 ${isResetting ? 'opacity-70 cursor-not-allowed' : ''
                              }`}
=======
                           className={`w-full bg-[#553C26] text-white py-3 rounded-lg hover:bg-[#442f1e] transition-colors mt-6 ${
                              isResetting ? 'opacity-70 cursor-not-allowed' : ''
                           }`}
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                        >
                           {isResetting ? 'Đang xử lý...' : 'Xác Nhận'}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}
