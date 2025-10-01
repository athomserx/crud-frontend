// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '@/lib/api';

// export interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ProductQueryParams {
//   search?: string;
//   category?: string;
//   sortBy?: string;
//   order?: 'ASC' | 'DESC';
//   page?: number;
//   limit?: number;
// }

// export interface ProductsResponse {
//   totalItems: number;
//   currentPage: number;
//   totalPages: number;
//   products: Product[];
// }

// const fetchProducts = async (params: ProductQueryParams): Promise<ProductsResponse> => {
//   const { data } = await api.get('/products', { params });
//   return data;
// };

// const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
//   const { data } = await api.post('/products', productData);
//   return data;
// };

// const updateProduct = async (product: Partial<Product> & { id: number }): Promise<Product> => {
//   const { id, ...updateData } = product;
//   const { data } = await api.put(`/products/${id}`, updateData);
//   return data;
// };

// const deleteProduct = async (id: number): Promise<void> => {
//   await api.delete(`/products/${id}`);
// };

// export const useProducts = (params: ProductQueryParams = {}) => {
//   return useQuery<ProductsResponse, Error>(['products', params], () => fetchProducts(params), {
//     keepPreviousData: true,
//   });
// };

// export const useProductCreate = () => {
//   const queryClient = useQueryClient();
//   return useMutation(createProduct, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('products');
//     },
//   });
// };

// export const useProductUpdate = () => {
//   const queryClient = useQueryClient();
//   return useMutation(updateProduct, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('products');
//     },
//   });
// };

// export const useProductDelete = () => {
//   const queryClient = useQueryClient();
//   return useMutation(deleteProduct, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('products');
//     },
//   });
// };